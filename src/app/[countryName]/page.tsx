"use client";

import React, { useState, useEffect } from "react";
import { CountryProp, Currencies, Maps, NativeName } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryByName } from "../action";
import Link from "next/link";
import ValueSpan from "@/components/ui/ValueSpan";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import LabelSpan from "@/components/ui/LabelSpan";
import { getOfficialNames, getCurrencies } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
  params: Promise<{ countryName: string }>;
};

export default function CountryDetailPage({ params }: Props) {
  const [countryName, setCountryName] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setCountryName(resolved.countryName);
    };
    resolveParams();
  }, [params]);

  const { isPending, error, data } = useQuery<CountryProp[], Error>({
    queryKey: ["countries", countryName],
    queryFn: () =>
      countryName ? fetchCountryByName(countryName) : Promise.resolve([]),
    enabled: !!countryName,
  });

  const country = Array.isArray(data) && data.length > 0 ? data[0] : null;
  // const country = data[0];

  if (isPending) return <div> <SkeletonLoading /> </div>;
  if (error) return "An error has occured: " + error.message;
  if (!country) return <div> Country not found... </div>;

  return (
    <div>
      <BackButton />
      <section className="mt-8 flex flex-col items-center lg:flex-row gap-4 lg:gap-12 overflow-hidden">
        <CountryImage {...country} />
        <div>
          <h1 className="font-bold text-3xl"> {country.name.common} </h1>
          <section className="grid grid-cols-1 md:grid-cols-2 md:mt-5 md:gap-4 md:text-xl md:flex">
            {/* Left side  */}
            <LeftSideData {...country} />
            {/* right side */}
            <RightSideData {...country} />
          </section>
        </div>

      </section>
    </div>
  );
}




function BackButton() {
  return (
    <Link
      href={`/`}
      className="mt-8 py-2 inline-block rounded shadow font-semibold hover:shadow-2xl cursor-pointer hover:opacity-75 border"
    >
      <ArrowLeftIcon className='w-4 h-4 inline-block mr-2' />
      <ValueSpan> Back </ValueSpan>
    </Link>
  )
}

function CountryImage(country: CountryProp) {
  return (
    <div className="md:mb-8 mb-2 overflow-hidden w-[320px] md:w-[640px] md:h-[480px] drop-shadow-md shadow-md">
      <Image
        height={480}
        width={640}
        alt="Country Flag"
        src={country.flags.svg}
        className="size-[100%] object-cover"
      />
    </div>
  );
}

function LeftSideData(country: CountryProp) {
  return (
    <div className="flex flex-col gap-2 max-w-80 mt-8 md:mt-0">
      <div >
        <LabelSpan>Native name</LabelSpan>
        <ValueSpan> : {getOfficialNames(country.name.nativeName).join(", ")} </ValueSpan>
      </div>

      <div >
        <LabelSpan>Population</LabelSpan>
        <ValueSpan> : {new Intl.NumberFormat().format(country.population)} </ValueSpan>
      </div>

      <div >
        <LabelSpan>Region</LabelSpan>
        <ValueSpan> : {country.region} </ValueSpan>
      </div>

      <div >
        <LabelSpan> Subregion </LabelSpan>
        <ValueSpan> : {country.subregion ? country.subregion : "No Subregion"} </ValueSpan>
      </div>

      <div>
        <LabelSpan>Capital: </LabelSpan>
        <ValueSpan>
          {
            Array.isArray(country.capital) && country.capital.length > 0 ?
              country.capital.map((d) => d).join(", ") : 'No capital'
          }
        </ValueSpan>
      </div>
    </div>
  );
}



function RightSideData(country: CountryProp) {
  return (
    <div className="flex mt-2 md:mt-0 flex-col gap-2 max-w-80">
      <div>
        <LabelSpan>Top Level Domain</LabelSpan>
        <ValueSpan>: {country.tld} </ValueSpan>
      </div>

      <div>
        <LabelSpan> Currencies </LabelSpan>
        <ValueSpan> :
          {" "}
          {
            country.currencies ?
              getCurrencies(country.currencies).join(", ") :
              // country.currencies[Object.keys(country.currencies)[0]].name :
              "No Currency"
          }
        </ValueSpan>
      </div>

      <div>
        <LabelSpan>Languages</LabelSpan>
        <ValueSpan>
          :{" "}
          {Object.keys(country.languages)
            .map(function (key, index) {
              return country.languages[key];
            })
            .join(", ")}
        </ValueSpan>
      </div>
      <CountryMap maps={country.maps} />

    </div>
  );
}



function CountryMap({
  maps
}: {
  maps: Maps;
}) {
  return (
    <div className="flex gap-1">
      <LabelSpan>Maps </LabelSpan>
      <ValueSpan className="flex gap-3">
        :
        <Link
          href={maps.googleMaps}
          target="_blank"
          className="underline text-blue-400 font-semibold"
        > Google maps</Link>

        <Link
          href={maps.openStreetMaps}
          target="_blank"
          className="underline text-blue-400 font-semibold"
        > Open Street Maps</Link>
      </ValueSpan>
    </div>
  );
}


function SkeletonLoading() {
  return (
    <div>
      <BackButton />
      <div className="mt-8 flex flex-col items-center lg:flex-row md:flex gap-4 lg:gap-12 overflow-hidden">
        <>
          <Skeleton
            className="md:mb-8 mb-2 overflow-hidden w-80 h-60 md:w-160 md:h-120"
          />
          <div>
            <Skeleton className="mb-2" />
            <Skeleton className=""/>
            <div className="grid grid-cols-1 md:grid-cols-2 md:flex md:mt-5 md:gap-4 md:text-xl">
              <Skeleton className="h-80 w-75" />
              <Skeleton className="h-80 w-75" />
            </div>
          </div>
        </>
      </div>
    </div>
  );
}