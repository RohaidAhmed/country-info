'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "./action";
import CountryCard, { CountryCardSkeleton } from "@/components/CountryCard";
import { CountryProp } from "@/lib/type";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SearchBar from "@/components/SearchBar";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function Home() {

  const [animationParent] = useAutoAnimate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<CountryProp[] | undefined>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { isPending, error, data: countryData } = useQuery<CountryProp[], Error>({
    queryKey: ['countries'],
    queryFn: () => fetchCountries()
  })

  const regions = [...new Set(countryData?.map((d) => d.region))];


  function handleOnChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleOnChangeFilter(e: string){
    setSelectedCategory(e);
  }

  useEffect(() => {
    let data = countryData
    if (searchTerm) {
      data = data?.filter((item) => item.name.common.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    }

    if (selectedCategory || selectedCategory == "all"){
      data = data?.filter((item)=>{
        if (selectedCategory == "all"){
          return item;
        }
        return item.region === selectedCategory;
      });
    }
    setFilteredData(data);

  }, [searchTerm, countryData, selectedCategory]);


  if (isPending) return "Loading..."
  if (error) return "An error has occured: " + error.message

  return (
    <div className="font-sans  ">

      <section className="mb-8 w-full flex flex-col sm:flex-row justify-between ">
        {/* search bar */}
        <SearchBar value={searchTerm} onChange={handleOnChangeSearch} />
        {/* filter */}
        <Select onValueChange={handleOnChangeFilter} value={selectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {
              regions.map((d, i) => (
                <SelectItem key={i} value={d}>
                  {d}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </section>

      <section className="flex flex-wrap gap-3 gap-y-9 " ref={animationParent}>
        {isPending &&
          Array(10)
            .fill(null)
            .map((d, i) =>
              <CountryCardSkeleton key={i} />
            )}
        {
          filteredData?.map((d, i) => (
            <CountryCard key={i} {...d} />
          ))
        }
        {Array.isArray(filteredData) && filteredData.length < 1 && <NoSearchResults /> }
      </section>
    </div>
  );
}

function NoSearchResults(){
  return (
    <div className="text-center text-gray-600 dark:text-gray-400 mt-8 w-full text-3xl font-semibold">
      <p>Your search did not match any results :( </p>
    </div>
  )
}
