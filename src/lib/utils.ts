import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currencies, NativeName } from "./type";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs));
}

export function getOfficialNames(nativeName: NativeName) {
    return Object.keys(nativeName).map((key) => nativeName[key]?.official);
}

export function getCurrencies(currencies: Currencies) {
    return Object.keys(currencies).map((key) => currencies[key]?.name)
}