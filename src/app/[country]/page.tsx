'use client';

import React from 'react'
// import Image from 'next/image'
import { CountryProp } from '@/lib/type'
import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../action'



export default async function page(countryName: string) {
    const response = await fetch(`https://restcountries.com/v3.1/${countryName}`);
    const data = await response.json();

    const country = Array.isArray(data) && data.length > 0 ? data[0] : null;

    return (
        <div>
            <div>
                <Image
                    alt=''
                    width={600}
                    height={40}
                    src={`${country.flags.png}`} />
                <div>
                    <span>No county for the name found</span>
                </div>
            </div>
        </div>
    )
}

function CountryImage(){
    return(
        <div>
            <Image
                    alt=''
                    width={600}
                    height={40}
                    src={`${}`} />

        </div>
    );
}

{/* <Image
                            key={i}
                            alt=''
                            width={600}
                            height={40}
                            src={data.flags.png} /> */}


                //             <Image
                //     alt=''
                //     width={600}
                //     height={40}
                //     src={`${country.flags.png}`} />
                // <div></div>