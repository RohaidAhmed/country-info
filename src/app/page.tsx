'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "./action";
import CountryCard from "@/components/CountryCard";
import { CountryProp } from "@/lib/type";


export default function Home() {

  const { isPending, error, data } = useQuery<CountryProp[], Error>({
    queryKey: ['countries'],
    queryFn: () => fetchCountries()
  })

  if (isPending) return "Loading..."
  if (error) return "An error has occured: " + error.message

  console.log("data:", data);


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <section className="flex flex-wrap gap-3 gap-y-9 md:justify-between">
        {
          data.map((d, i) => (
            <CountryCard key={i}
            name={d.name}
            currencies={d.currencies}

            flags={d.flags} 
            coatOfArms={d.coatOfArms} 
            capital={d.capital}
            region={d.region}
            subregion={d.subregion}
            languages={d.languages}
            maps={d.maps}
            population={d.population}/>
            
            
          ))
        }
      </section>
    </div>
  );
}
