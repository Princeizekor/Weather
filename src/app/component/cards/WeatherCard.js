"use client";
import styled from "styled-components";

const WeatherCardContainer = styled.div`
  width: 100%;
  height: 300px;
  background: hsl(243, 23%, 20%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  font-size: 2.5rem;
  .min {
    background-image: url("/assets/images/bg-today-large.svg");
    background-size: cover;
    width: 100%;
    padding: 2rem 1rem;
    font-size: 1rem;
    border-radius: 16px;
    height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rate {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const WeatherCards = styled.div`
  width: 200px;
  height: 120px;
  background: hsl(243, 23%, 20%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  justify-content: space-between;
  padding: 1rem;
`;

const ForcastCard = styled.div`
  width: 115px;
  height: 150px;
  background: hsl(243, 23%, 20%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  font-size: 1.1rem;

  div {
    display: flex;
    // align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;

const WeatherForecast = styled.div`
  //   margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 29%;
  height: 700px;
  background: hsl(243, 23%, 20%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 1rem 1rem 1rem;
  overflow-y: auto;
  .time {
    width: 100%;
    height: 50px;
    background: hsl(243, 27%, 24%);
    border-radius: 8px;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
  }
  .hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  .top-button {
    width: 100%;
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    background: hsl(243, 23%, 20%);
  }
`;

export { WeatherForecast };
export { ForcastCard };
export { WeatherCards };
export default WeatherCardContainer;
