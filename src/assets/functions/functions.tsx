/* eslint @typescript-eslint/no-var-requires: "off" */

import axios from "axios";
import { ICities, IWeatherData, ICountryCity } from "../types/types";
const cities: ICities[] = require("cities.json");

export const getPosition: PositionCallback = async (
  position: GeolocationPosition
) => {
  try {
    const { data } = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.VUE_APP_MAP_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );

    const location = (
      data.address.suburb ||
      data.address.county ||
      data.address.city
    ).split("/");
    return location[location.length - 1];
  } catch (err) {
    console.error(err);
  }
};

export const fetchWeather = async (
  location: string
): Promise<IWeatherData | undefined> => {
  try {
    const { data }: { data: IWeatherData } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=40&appid=${process.env.VUE_APP_API_KEY}`
    );

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const locations = async () => {
  const allCities: string[] = cities.map((val: ICities) => val.name);
  try {
    const { data }: { data: ICountryCity } = await axios.get(
      `https://countriesnow.space/api/v0.1/countries`
    );
    const places: string[] = data.data.reduce(
      (prev: any, val: any) => {
        const value: any = val.cities.map((city: string | any[]) => city);
        return [...prev, val.country, ...value];
      },
      [...allCities]
    );
    return [...new Set(places)];
  } catch (err) {
    console.error(err);
  }
};
