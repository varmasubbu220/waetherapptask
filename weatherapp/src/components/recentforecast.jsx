import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from './navbar';

const RecentForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=mIT5xRyNshFNhYE46Fqjrg9M3dzotvry');
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForecastData();
    }, []);

    useEffect(() => {
        if (forecastData) {
            renderGraph();
        }
    }, [forecastData]);

    const renderGraph = () => {
        const timeLabels = forecastData.timelines.minutely.map(item => {
            const dateTime = new Date(item.time);
            return new Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric' }).format(dateTime);
        });
        const temperatureData = forecastData.timelines.minutely.map(item => item.values.temperature);
    
        const ctx = document.getElementById('forecastChart');
    
        // Destroy existing chart instance if it exists
        if (Chart.getChart(ctx)) {
            Chart.getChart(ctx).destroy();
        }
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    };
    

    

    return (
        <div className="container mt-5">
            <Navbar/>
            <h2 className="text-center mb-4">Recent Forecast</h2>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <canvas id="forecastChart"></canvas>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentForecast;
