import { CountryProp } from '@/lib/type'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import LabelSpan from './ui/LabelSpan'
import ValueSpan from './ui/ValueSpan'


export default function CountryCard(props: CountryProp) {
    return (
        <Link
            href={`/${props.name.common}`}
            className='w-[288px] md:w-[272px] h-fit cursor-pointer rounded overflow-hidden shadow-xl group border-[1px] dark:border-slate-600'
        >
            <CountryImage src={props.flags.svg} />
            <div className='pt-5 pl-5 pb-8'>
                <h2 className='text-2xl font-bold mb-4 w-[240px]'> {props?.name?.common} </h2>
                <CountryInfo
                    population={props.population}
                    region={props.region}
                    capital={props.capital}
                />

            </div>
        </Link>
    )
}



function CountryImage({ src }: { src: string }) {
    return (
        <div className="h-[168px]  overflow-hidden group-hover:scale-110  transition ease-in-out duration-300">
            <Image
                src={src}
                alt="country-img"
                width={288}
                height={168}
            // style={{ objectFit: "contain" }}
            />
        </div>
    );
}


function CountryInfo({
    population,
    region,
    capital
}: {
    population: number;
    region: string;
    capital?: string[];
}) {
    return (
        <div className='flex flex-col gap-1 text-xl px-1'>
            <div>
                <LabelSpan>Population</LabelSpan>
                <ValueSpan> {new Intl.NumberFormat().format(population)} </ValueSpan>
            </div>
            <div>
                <LabelSpan>Region: </LabelSpan>
                <ValueSpan> {region} </ValueSpan>
            </div>
            <div>
                <LabelSpan>Capital: </LabelSpan>
                <ValueSpan>
                    {
                        Array.isArray(capital) && capital.length > 0 ?
                            capital.map((d) => d).join(", ") : 'No capital'
                    }
                </ValueSpan>
            </div>
        </div>
    );
}