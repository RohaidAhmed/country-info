type Flags = {
    png: string;
    svg: string;
    alt: string;
};

type CoatOfArms = {
    png: string;
    svg: string;
};

type NativeName = {
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

type Currency = {
    name: string;
    symbol: string;
};

type Currencies = {
    [key: string]: Currency;
};

type Languages = {
    [key: string]: string;
};

type Maps = {
    googleMaps: string;
    openStreetMaps: string;
};

export type CountryProp = {
    flags: Flags;
    coatOfArms: CoatOfArms;
    name: Name;
    capital: string[];
    currencies: Currencies;
    region: string;
    subregion: string
    languages: Languages;
    maps: Maps;
    population: number;
};

// export type CountryProp = {
//     name: Name;
//     tld: string[]; // Property for top-level domain
//     topLevelDomain: string[];
//     population: number;
//     currencies: {
//         [key: string]: Currency;
//     };
//     languages: {
//         [key: string]: string;
//     };
//     region: string;
//     subregion: string;
//     maps: Maps;
//     capital?: string[];
//     flags: Flags; // Property for country flag image
//     coatOfArms: CoatOfArms; // Property for country coat of arms image
// }