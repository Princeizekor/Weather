"use client";
import styled from "styled-components";
import WeatherCardContainer, {
  ForcastCard,
  WeatherCards,
  WeatherForecast,
} from "../cards/WeatherCard";
import Image from "next/image";
import { Action, Actions, Drop } from "../Button";
import { useState, useRef, useEffect } from "react";
import { getWeatherForecast } from "../lib/OpenMeteo";

export default function Weather({ initialRegion }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [region, setRegion] = useState(
    initialRegion ?? {
      name: "Berlin, Germany",
      latitude: 52.52,
      longitude: 13.405,
    }
  );

  const handleDaySelect = (day, index) => {
    setSelectedDay(index);
    setIsOpen(false);
  };

  const getHourlyDataForDay = (index) => {
    if (!hourlyForecast?.time) return [];

    const startIdx = index * 24;
    const endIdx = startIdx + 24;

    return {
      time: hourlyForecast.time.slice(startIdx, endIdx),
      temperature_2m: hourlyForecast.temperature_2m.slice(startIdx, endIdx),
      precipitation_probability:
        hourlyForecast.precipitation_probability?.slice(startIdx, endIdx),
    };
  };

  useEffect(() => {
    if (initialRegion) setRegion(initialRegion);
  }, [initialRegion]);

  const [isOpen, setIsOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherForecast({
          latitude: region.latitude,
          longitude: region.longitude,
          timezone: "Europe/Berlin",
        });
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [region]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentWeather = weatherData?.current;
  const dailyForecast = weatherData?.daily;
  const hourlyForecast = weatherData?.hourly;
  return (
    <WeatherContainer>
      <WeatherDetails>
        <WeatherCardContainer>
          {loading ? (
            "Loading..."
          ) : (
            <div className="min">
              <div className="locale">
                <h1>{region?.name}</h1>
                <h3>
                  {loading
                    ? " "
                    : new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </h3>
              </div>
              <div className="rate">
                <Image
                  width={100}
                  height={100}
                  src="/assets/images/icon-sunny.webp"
                  alt="Weather Icon"
                />
                <h1>{currentWeather?.temperature_2m}°</h1>
              </div>
            </div>
          )}
        </WeatherCardContainer>
        <WeatherCardWrapper>
          <WeatherCards>
            <h5>Feels Like</h5>
            {loading ? "---" : <h3>{currentWeather?.temperature_2m}°</h3>}
          </WeatherCards>
          <WeatherCards>
            <h5>Humidity</h5>
            {loading ? "---" : <h3>{currentWeather?.relative_humidity_2m}%</h3>}
          </WeatherCards>
          <WeatherCards>
            <h5>Wind</h5>
            {loading ? "---" : "- km/h"}
          </WeatherCards>
          <WeatherCards>
            <h5>Precipitation</h5>
            {loading ? (
              "---"
            ) : (
              <h3>{hourlyForecast?.precipitation_probability[0]}%</h3>
            )}
          </WeatherCards>
        </WeatherCardWrapper>
        <h2>Daily Forcast</h2>
        <DailyForecast>
          {Array.from({ length: 7 }).map((_, index) => (
            <ForcastCard key={index}>
              <h5>
                {!loading && dailyForecast?.time
                  ? new Date(dailyForecast.time[index]).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )
                  : " "}
              </h5>
              {loading ? (
                " "
              ) : (
                <Image
                  width={50}
                  height={50}
                  src={"/assets/images/icon-partly-cloudy.webp"}
                  alt="Weather Icon"
                />
              )}
              <div>
                <h4>
                  {!loading && dailyForecast?.temperature_2m_max
                    ? `${dailyForecast.temperature_2m_max[index]}°`
                    : " "}
                </h4>
                <h4>
                  {!loading && dailyForecast?.temperature_2m_min
                    ? `${dailyForecast.temperature_2m_min[index]}°`
                    : " "}
                </h4>
              </div>
            </ForcastCard>
          ))}
        </DailyForecast>
      </WeatherDetails>
      <WeatherForecast>
        <div className="top-button">
          <h3>Hourly Forecast</h3>
          <Action ref={dropdownRef}>
            <Drop onClick={() => setIsOpen(!isOpen)}>
              {loading
                ? "-----"
                : new Date(dailyForecast?.time[selectedDay]).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                    }
                  )}
              <Image
                width={15}
                height={15}
                src="\assets\images\icon-dropdown.svg"
                alt="drop Icon"
              />
            </Drop>
            {isOpen && (
              <DropdownMenu>
                {dailyForecast?.time.slice(0, 7).map((time, index) => (
                  <DropdownItems
                    key={index}
                    onClick={() => handleDaySelect(time, index)}
                    selected={index === selectedDay}
                  >
                    {new Date(time).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </DropdownItems>
                ))}
              </DropdownMenu>
            )}
          </Action>
        </div>
        {(() => {
          const dayData = getHourlyDataForDay(selectedDay);
          return Array.from({ length: 24 }).map((_, index) => (
            <div className="time" key={index}>
              <div className="hint">
                {loading ? (
                  " "
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src="/assets/images/icon-partly-cloudy.webp"
                    alt="Weather Icon"
                  />
                )}
                <h5>
                  {!loading && dayData.time
                    ? new Date(dayData.time[index]).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          hour12: true,
                        }
                      )
                    : ""}
                </h5>
              </div>
              <h4>
                {!loading && dayData.temperature_2m
                  ? `${dayData.temperature_2m[index]}°`
                  : " "}
              </h4>
            </div>
          ));
        })()}
      </WeatherForecast>
    </WeatherContainer>
  );
}

const WeatherContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0rem 3rem 0rem;
  padding: 0rem 7.5rem 0rem 7.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0rem 1rem;
    margin: 2rem 0rem;
  }
`;

const WeatherDetails = styled.div`
  width: 69%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    margin-top: 2rem;
    font-size: 2rem;
  }
    @media (max-width: 768px) {
    width: 100%;
    h2 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
    }
`;

const WeatherCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  @media (max-width: 768px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;
const DailyForecast = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  @media (max-width: 768px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  right: 0;
  background: hsl(243, 23%, 20%);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  margin-top: 0.2rem;
  min-height: 300px;
  min-width: 220px;
  z-index: 10;
`;

const DropdownItems = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: white;

  &:hover {
    background: hsl(243, 23%, 24%);
  }
`;
