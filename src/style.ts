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
    setPrice:(price:boolean)=>void,
    setPrices:(prices:string)=>void
}

export interface AreasType {
    areaTo: React.RefObject<HTMLInputElement>,
    areaFrom: React.RefObject<HTMLInputElement>,
    areaError:boolean,
    setAreaError:(areaError:boolean)=>void,
    area:boolean,
    setArea:(area:boolean)=>void,
    setAreas:(areas:string)=>void
}

export interface BedroomsType {
    bedrooms:boolean,
    setBedrooms:(bedrooms:boolean)=>void,
    bedroomsNum:string,
    setBedroomsNum:(bedrooms:string)=>void
}

export interface RealEstate {
    id: number;
    address: string;
    zip_code: string;
    price: number;
    area: number;
    bedrooms: number;
    image: string;
    is_rental: number;
    city_id: number;
    city: {
      id: number;
      name: string;
      region_id: number;
      region: {
        id: number;
        name: string;
      };
    };
  }