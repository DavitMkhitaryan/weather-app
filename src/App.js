import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [allData, setAllData] = useState({
    city: "",
    country: "",
    temperature: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (city) => {
    try {
      const APIKEY = "YOUR_API_KEY";
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${"milan"}&appid=${APIKEY}&units=metric`);
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp
      });
    } catch (e) {
      console.log("API not loaded correctly or loaded the first time");
    }
  }

  return (
    <main>
      <div className="App">
        {console.log("1. test for: successful deployment", 
        "2. test for: fetching weather data API (country, city, weather)", 
        allData.country, allData.city, allData.temperature)}

        <section>
          <h1>{allData.city}</h1>
          <h2>{allData.country}</h2>
          <h3>TEMPERATURE:</h3>
          <p>{allData.temperature}°</p>
        </section>
      </div>
    </main>
  );
}

export default App;
