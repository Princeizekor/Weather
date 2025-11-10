export const getWeatherIcon = (code) => {
  const map = {
    0: "/assets/images/icon-sunny.webp",
    1: "/assets/images/icon-partly-cloudy.webp",
    2: "/assets/images/icon-partly-cloudy.webp",
    3: "/assets/images/icon-overcast.webp",
    45: "/assets/images/icon-fog.webp",
    48: "/assets/images/icon-fog.webp",
    51: "/assets/images/icon-drizzle.webp",
    53: "/assets/images/icon-drizzle.webp",
    55: "/assets/images/icon-drizzle.webp",
    61: "/assets/images/icon-rain.webp",
    63: "/assets/images/icon-rain.webp",
    65: "/assets/images/icon-heavy-rain.webp",
    66: "/assets/images/icon-freezing-rain.webp",
    67: "/assets/images/icon-freezing-rain.webp",
    71: "/assets/images/icon-snow.webp",
    73: "/assets/images/icon-snow.webp",
    75: "/assets/images/icon-heavy-snow.webp",
    80: "/assets/images/icon-showers.webp",
    81: "/assets/images/icon-showers.webp",
    82: "/assets/images/icon-showers.webp",
    95: "/assets/images/icon-storm.webp",
    96: "/assets/images/icon-thunder-hail.webp",
    99: "/assets/images/icon-thunder-hail.webp",
  };

  return map[code] || "/assets/images/icon-unknown.webp";
};
