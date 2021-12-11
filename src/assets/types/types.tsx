//WEATHER TYPES
export interface IWeatherCity {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface IWeatherList {
  cloud: { all: number };
  dt: number;
  dt_txt: string;
  main: {};
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: [{ description: string; icon: string; main: string; id: number }];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
export interface IWeatherData {
  city: IWeatherCity;
  cnd: number;
  cod: string;
  message: number;
  list: IWeatherList[];
}
//------------------------------------

//LOCATION TYPES
export interface ICities {
  country: string;
  name: string;
  lat: number;
  lng: number;
}
export interface ICountryCityData {
  country: string;
  cities: string[];
}
export interface ICountryCity {
  error: boolean;
  message: string;
  data: ICountryCityData[];
}
//------------------------------------

//LOCATION TYPES
export interface ILocationData {
  continent: string;
  country: string;
  country_code: string;
  county: string;
  locality: string;
  longitude: number;
  latitude: number;
  name: string;
  [key: string]: any;
}
export interface ILocation {
  [key: string]: any;
  data: {
    data: ILocationData[];
  };
}
