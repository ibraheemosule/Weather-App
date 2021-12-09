/* eslint @typescript-eslint/no-var-requires: "off" */

import axios from "axios";
import { ICities } from "../types/types";
const cities: ICities[] = require("cities.json");

export const getPosition: PositionCallback = async (
  position: GeolocationPosition
) => {
  try {
    const fetchLocation = await axios.get(
      `http://api.positionstack.com/v1/reverse?access_key=${process.env.VUE_APP_MAP_KEY}&query=${position.coords.latitude},${position.coords.longitude}`
    );

    return fetchLocation.data.data[0].locality;
  } catch (err) {
    console.error(err);
  }
};

export const fetchWeather = async (location: string) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=40&appid=${process.env.VUE_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const locations = async () => {
  const allCities: string[] = cities.map(val => val.name);
  try {
    const { data } = await axios.get(
      `https://countriesnow.space/api/v0.1/countries`
    );
    const places = data.data.reduce(
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
