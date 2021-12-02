import axios from "axios";

export const getPosition: PositionCallback = async (
  position: GeolocationPosition
) => {
  try {
    const fetchLocation = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${process.env.VUE_APP_MAP_KEY}`
    );
    return fetchLocation.data.results[0].components.village;
  } catch (err) {
    console.log(err);
  }
};

export const fetchWeather = async (location: string) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=40&appid=${process.env.VUE_APP_API_KEY}`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
