"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getWeatherForecast } from '../lib/OpenMeteo'; 

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherForecast();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <LoadingText>Loading weather data...</LoadingText>;
  if (error) return <ErrorText>Error: {error}</ErrorText>;
  if (!weatherData) return <ErrorText>No weather data available</ErrorText>;

  return (
    <Container>
      <Title>Weather Data</Title>
      <DataGrid>
        {weatherData.current && (
          <DataCard>
            <h3>Current Weather</h3>
            <p>Temperature: {weatherData.current.temperature_2m}°C</p>
            <p>Humidity: {weatherData.current.relative_humidity_2m}%</p>
          </DataCard>
        )}
        
        {weatherData.hourly && (
          <DataCard>
            <h3>Hourly Forecast</h3>
            <ScrollableContent>
              {weatherData.hourly.time.slice(0, 24).map((time, index) => (
                <p key={time}>
                  {new Date(time).toLocaleTimeString()}: {' '}
                  {weatherData.hourly.temperature_2m[index]}°C
                </p>
              ))}
            </ScrollableContent>
          </DataCard>
        )}
      </DataGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const DataCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    margin-bottom: 15px;
    color: #444;
  }
`;

const ScrollableContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #666;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
`;