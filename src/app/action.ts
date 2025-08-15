// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/all?fields=name,flags


'use server';


export async function fetchCountries() {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,currencies,population,languages,region,maps,capital,subregion,coatOfArms`);
    const data = await response.json();
    return data;
}


