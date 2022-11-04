import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");

  const [allData, setAllData] = useState({
    city: "",
    country: "",
    temperature: "",
    humidity: "",
    temp_min: "",
    weather_icon: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (city) => {
    try {
      const APIKEY = "YOUR_API_KEY";
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        temp_min: result.data.main.temp_min,
        weather_icon: result.data.weather[0]["icon"]
      });
    } catch (e) {
      console.log("API not loaded correctly or loaded the first time");
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  }

  const handleSubmit = (event) => {
    console.log(search);
    event.preventDefault();
    fetchData(search);
  }

  return (
    <main>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="city" placeholder="Location" value={search} onChange={handleChange} />
          <button for="city">Search</button>
        </form>
        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
                <img src={`http://openweathermap.org/img/w/${allData.weather_icon}.png`} alt="weather icon" />
                <h1 className='title'>{allData.city}</h1>
                <h2 className='location'>{allData.country}</h2>
                <div className='weather-description'>
                  <div>
                    <h3>TEMPERATURE:</h3>
                    <p>{allData.temperature}°C</p>
                  </div>
                  <div>
                    <h3>HUMIDITY:</h3>
                    <p>{allData.humidity}%</p>
                  </div>
                  <div>
                    <h3>MINIMUM TEMPERATURE:</h3>
                    <p>{allData.temp_min}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
