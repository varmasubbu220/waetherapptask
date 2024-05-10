import React, { useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CityForecast = () => {
    const [cityName, setCityName] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');
    const user = useSelector(state => state.user)
    if (!user.isLogin && !user.isFetching) {
        window.location.href = '/';
    }

    function GetWeatherIcon({temp}) {
        if (temp > 34) {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          );
        } else if (temp >= 30 && temp <= 34) {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-brightness-alt-high-fill" viewBox="0 0 16 16">
              <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4"/>
            </svg>
          );
        } else if (temp >= 27 && temp < 30) {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-brightness-low" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8m.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"/>
            </svg>
          );
        } else {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-cloud-sun" viewBox="0 0 16 16">
              <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.5 3.5 0 0 1 7 8m4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
              <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
            </svg>
          );
        }
      }
      
    const handleSearch = async () => {
        if(!cityName){
            return
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=a07d994fd17aca45e6f5f6a87675a1df&lang=en&units=metric&/&q=${cityName}`);
            const data = await response.json();
            if (data.cod === '404') {
                setError('City not found');
                setForecastData(null);
            } else {
                setError('');
                setForecastData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data');
            setForecastData(null);
        }
    };

    return (
        <>
               <Navbar />
            <div style={{marginTop:"100px" ,width:"100%",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <div className="col-md-9">
                
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={cityName}
                                    onChange={(e) => setCityName(e.target.value)}
                                    className="form-control"
                                    placeholder="Search By City"
                                    style={{ borderTopLeftRadius:'12px',borderBottomLeftRadius:'12px' }}
                                />
                                <button type="submit" className="btn btn-success">Search</button>
                            </div>
                        </form>
                    </div>
                {error && <p>{error}</p>}
                {forecastData && (
                    <div className='col-md-9 col-11'>
                          <div className="card " style={{borderRadius:"12px"}}>
                        <div className="card-body d-flex flex-column flex-sm-row flex-md-row flex-lg-row justify-content-between">
                            <div className='d-flex flex-column'>
                            <div className='d-flex' >
                            <svg xmlns="http://www.w3.org/2000/svg"  width="100" height="100" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
  <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.5 3.5 0 0 1 7 8m4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
  <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
</svg> <div className='d-flex flex-column' style={{marginLeft:'15px'}}>
                            <p style={{fontSize:"16px"}} className="card-text">Average Daily Temperature</p>
                            <p style={{fontSize:'50px'}}> {forecastData.list[0].main.temp} °C</p>
                            </div>
                            
                            </div>
                            <p className="card-text">Humidity: {forecastData.list[0].main.humidity}%</p>
                            <p className="card-text">Wind Speed: {forecastData.list[0].wind.speed} m/s</p>
                            </div>
                          
                             <div>
                            <h3 className="card-title">{forecastData.city.name}, {forecastData.city.country}</h3>
                             </div>
                            </div>
                            </div>
                       
                     
                        <h4 style={{margin:"20px 0px"}}>Five Days Forecast</h4>
                        <div className='d-flex flex-column flex-md-row flex-sm-row flex-lg-row' style={{marginBottom:'20px',gap:'10px'}}>
                            {forecastData.list.slice(0, 5).map((item, index) => (
                                <div key={index} className="card " style={{borderRadius:"10px", padding:'8px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                    <GetWeatherIcon temp={item.main.temp}/>                                
                                    <p>Date: {item.dt_txt}</p>
                                    <p>Temperature: {item.main.temp} °C</p>
                                    <p style={{fontSize:'14px'}} className='fw-medium'>Clouds: {item.weather[0].description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CityForecast;
