"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Search from "./component/Search";
import Weather from "./component/display/Weather";

export default function Home() {

  const [region, setRegion] = useState({
    name: "Berlin, Germany",
    latitude: 52.52,
    longitude: 13.4050,
  });

  return (
    <>
    <Search onSelect={(place) => setRegion(place)} />
    <Weather initialRegion={region}/>
    </>
  );
}
