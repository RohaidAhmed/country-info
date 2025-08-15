'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "./action";
import CountryCard, { CountryCardSkeleton } from "@/components/CountryCard";
import { CountryProp } from "@/lib/type";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SearchBar from "@/components/SearchBar";


export default function Home() {

  const [animationParent] = useAutoAnimate();

  const { isPending, error, data } = useQuery<CountryProp[], Error>({
    queryKey: ['countries'],
    queryFn: () => fetchCountries()
  })

  if (isPending) return "Loading..."
  if (error) return "An error has occured: " + error.message

  console.log("data:", data);

  // CountryCardSkeleton
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      <section className="mb-8 w-full flec flex-col sm:flex-row">
        {/* search bar */}
        <SearchBar />
        {/* filter */}
      </section>

      <section className="flex flex-wrap gap-3 gap-y-9 md:justify-between" ref={animationParent}>
        {isPending &&
          Array(10)
            .fill(null)
            .map((d, i) =>
              <CountryCardSkeleton key={i} />
            )}
        {
          data.map((d, i) => (
            <CountryCard key={i} {...d} />
          ))
        }
      </section>
    </div>
  );
}


// name={d.name}
//             currencies={d.currencies}

//             flags={d.flags} 
//             coatOfArms={d.coatOfArms} 
//             capital={d.capital}
//             region={d.region}
//             subregion={d.subregion}
//             languages={d.languages}
//             maps={d.maps}
//             population={d.population}