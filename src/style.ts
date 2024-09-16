/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegionsType {
    region:boolean,
    setRegion:(value:boolean)=>void
    regionsChecked:string[]
    setRegionsChecked:(value:any)=>void
}

export interface PricesType {
    priceTo: React.RefObject<HTMLInputElement>,
    priceFrom: React.RefObject<HTMLInputElement>,
    priceError:boolean,
    setPriceError:(priceError:boolean)=>void,
    price:boolean,
    setPrice:(price:boolean)=>void
}