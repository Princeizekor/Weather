import axios from "axios";

const openMeteo = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
  timeout: 10000,
});

export const getWeatherForecast = async (params = {}) => {
  try {
    const response = await openMeteo.get("/forecast", {
      params: {
        latitude: params.latitude || 52.52,
        longitude: params.longitude || 13.41,
        timezone: params.timezone || "auto",
        current: ["temperature_2m", "relative_humidity_2m", "weather_code", "wind_speed_10m"],
        hourly: ["temperature_2m", "precipitation_probability", "wind_speed_10m"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
        ...params,
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Open-Meteo API error:", error);
    throw error;
  }
};

export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await openMeteo.get("/forecast", {
      params: {
        latitude: latitude || 52.52,
        longitude: longitude || 13.41,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "weather_code",
          "wind_speed_10m",
        ],
        timezone: "auto",
      },
    });
    console.log("Current Weather:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export default openMeteo;
