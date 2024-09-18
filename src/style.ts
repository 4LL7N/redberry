/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegionsType {
    region:boolean,
    setRegion:(value:boolean)=>void
    regionsChecked:string[]
    setRegionsChecked:(value:any)=>void,
    filter:()=>void
}

export interface PricesType {
    priceTo: any,
    priceFrom: any,
    priceError:boolean,
    setPriceError:(priceError:boolean)=>void,
    price:boolean,
    setPrice:(price:boolean)=>void,
    setPrices:(prices:string)=>void,
    filter:()=>void
}

export interface AreasType {
    areaTo: any,
    areaFrom: any,
    areaError:boolean,
    setAreaError:(areaError:boolean)=>void,
    area:boolean,
    setArea:(area:boolean)=>void,
    setAreas:(areas:string)=>void,
    filter:()=>void
}

export interface BedroomsType {
    bedrooms:boolean,
    setBedrooms:(bedrooms:boolean)=>void,
    bedroomsNum:string,
    setBedroomsNum:(bedrooms:string)=>void,
    bedroomsRef:any
    filter:()=>void
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

  export interface ListingType{
    id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: {
    id: number;
    name: string;
    region_id: number;
    region: {
      id: number;
      name: string;
    };
  };
  agent: {
    id: number;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    phone: string;
  };
  }