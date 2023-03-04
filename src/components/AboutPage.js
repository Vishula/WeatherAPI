import React, { useState, useEffect } from "react";

function AboutPage() {
    const [weatherData, setWeatherData] = useState(null);

    const [refreshKey, setRefreshKey] = useState(0);
    
    useEffect(() => {
        const apiKey = "dc5f408b20fff12ee86d687132e4733a";
        const URL = "https://api.openweathermap.org/data/2.5/weather";
        const randomCityIds = [
            2147714, 2158177, 2174003, 2063523, 2078025, 2165087, 2172517, 2073124, 2163355, 2172797
        ];

        const randomCityId = randomCityIds[Math.floor(Math.random() * randomCityIds.length)];
        const url = `${URL}?id=${randomCityId}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { name, sys, weather, main, wind } = data;
                const weatherData = {
                    name,
                    country: sys.country,
                    description: weather[0].description,
                    iconURL: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
                    temp: main.temp,
                    feels_like: main.feels_like,
                    temp_min: main.temp_min,
                    temp_max: main.temp_max,
                    pressure: main.pressure,
                    humidity: main.humidity,
                    speed: wind.speed,
                };
                setWeatherData(weatherData);
            })
            .catch(error => console.error(error));
    }, [refreshKey]);
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }


     

    return (
        <div>
            <h2>Each time you visit, a random city of Australia will be displayed.</h2>
            <br />
            {weatherData && (
                <div style={{ textAlign: "center", backgroundColor: "rgba(85, 26, 139, 0.4)", color: "white" }}>
                    <h2>{weatherData.name}, {weatherData.country}</h2>
                    <img src={weatherData.iconURL} alt={weatherData.description} />
                    <p>{weatherData.description}</p>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Feels like: {weatherData.feels_like}°C</p>
                    <p>Min temperature: {weatherData.temp_min}°C</p>
                    <p>Max temperature: {weatherData.temp_max}°C</p>
                    <p>Pressure: {weatherData.pressure} hPa</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Wind speed: {weatherData.speed} m/s</p>
                </div>
            )}

            <div style={{ textAlign: "left-aligned", backgroundColor: "rgba(85, 26, 139, 0.4)", color: "white" }}>
                <h2>What Each Icon Means</h2>
                <h1>User's Guide to read</h1>
                <h3>Description: A brief description of the weather conditions (e.g. "clear sky", "few clouds", "scattered clouds", etc.).</h3>
                <h3>iconURL: The URL of an icon representing the current weather conditions.</h3>
                <h3>temp: The current temperature in degrees Celsius.</h3>
                <h3>feels_like: The "feels like" temperature, which takes into account both the actual temperature and the wind chill.</h3>
                <h3>temp_min: The minimum temperature for the day in degrees Celsius.</h3>
                <h3>temp_max: The maximum temperature for the day in degrees Celsius.</h3>
                <h3>pressure: The atmospheric pressure in hPa (hectopascals).</h3>
                <h3>humidity: The relative humidity as a percentage.</h3>
                <h3>speed: The wind speed in meters per second.</h3>
                <h3>country: The two-letter country code where the weather data was measured.</h3>
                <h3>name: The name of the location where the weather data was measured.</h3>
            </div>


        </div>
    );
}

export default AboutPage;
