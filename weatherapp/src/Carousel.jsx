import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carousel = () => {
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
        <div id="carouselExampleFade" style={{marginTop:'100px'}} className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                {forecastData && forecastData.hourly && forecastData.hourly.time && forecastData.hourly.time.map((time, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="col-md-3 mb-4" style={{ width: '80%' }}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{new Date(time).toLocaleTimeString()}</h5>
                                        <p className="card-text">Temperature: {forecastData.hourly.temperature_2m[index]} °C</p>
                                        <p className="card-text">Humidity: {forecastData.hourly.relative_humidity_2m[index]}%</p>
                                        <p className="card-text">Wind Speed: {forecastData.hourly.wind_speed_10m[index]} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" style={{position: 'absolute', top: '50%', left: '10px',background:"red"}}>
                <i className="fas fa-chevron-left"></i>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" style={{position: 'absolute', top: '50%', right: '10px', }}>
                <i className="fas fa-chevron-right"></i>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
