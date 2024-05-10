import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useSelector } from 'react-redux';

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const user = useSelector(state => state.user);

    if (!user.isLogin && !user.isFetching) {
        window.location.href = '/';
    }
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="container mt-5">
            <Navbar />
            <h2 className="text-center mb-4">Weather Forecast</h2>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    {isLoading ? ( // Render loading spinner if isLoading is true
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div id="weatherCarousel" className="carousel slide" data-bs-ride="carousel" >
                            <div className="carousel-inner">
                                {forecastData && forecastData.hourly && (
                                    forecastData.hourly.time.map((time, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <div className="card"  style={{ backgroundColor: 'rgb(202, 244, 255)' }}>
                                                <div className="card-body text-center"
                                                
                                                 style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
                                                    <h2 className="card-title">{new Date(time).toLocaleTimeString()}</h2>
                                                    <div className='d-flex' style={{marginTop:'10px'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
  <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/>
</svg>
                                                    <p className="card-text" style={{ color: '#6c757d',marginLeft:'15px'  }}>Temperature: {forecastData.hourly.temperature_2m[index]} °C</p>

                                                        </div>
                                                        <div className='d-flex'  style={{marginTop:'10px'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"/>
</svg>
                                                          <p className="card-text" style={{ color: '#6c757d',marginLeft:'15px' }}>Humidity: {forecastData.hourly.relative_humidity_2m[index]}%</p>

                                                        </div>
                                                    <div className='d-flex'  style={{marginTop:'10px'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>  <p className="card-text" style={{ color: '#6c757d' ,marginLeft:'15px' }}>Wind Speed: {forecastData.hourly.wind_speed_10m[index]} km/h</p>
</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#weatherCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#weatherCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;
