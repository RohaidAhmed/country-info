export type Flags = {
    png: string;
    svg: string;
    alt: string;
};

// type CoatOfArms = {
//     png: string;
//     svg: string;
// };

export type NativeName = {
    [key: string]: {
        official: string;
        common: string;
    };
};

type Name = {
    common: string;
    official: string;
    nativeName: NativeName;
};

export type Currency = {
    name: string;
    symbol: string;
};

export type Currencies = {
    [key: string]: Currency;
};

type Languages = {
    [key: string]: string;
};


export type Maps = {
    googleMaps: string;
    openStreetMaps: string;
};

export type CountryProp = {
    flags: Flags;
    // coatOfArms: CoatOfArms;
    tld: string;
    name: Name;
    capital: string[];
    currencies: Currencies;
    region: string;
    subregion: string
    languages: Languages;
    maps: Maps;
    population: number;
};
