"use client";
import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [unitSystem, setUnitSystem] = useState("metric");

  return (
    <WeatherContext.Provider value={{ unitSystem, setUnitSystem }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);