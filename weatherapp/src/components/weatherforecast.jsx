import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    return (

        <div className="container mt-5">
            <Navbar/>
            <h2 className="text-center mb-4">Weather Forecast</h2>
            <div className="row">
                {forecastData && forecastData.hourly && forecastData.hourly.time.map((time, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{new Date(time).toLocaleTimeString()}</h5>
                                <p className="card-text">Temperature: {forecastData.hourly.temperature_2m[index]} °C</p>
                                <p className="card-text">Humidity: {forecastData.hourly.relative_humidity_2m[index]}%</p>
                                <p className="card-text">Wind Speed: {forecastData.hourly.wind_speed_10m[index]} km/h</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
