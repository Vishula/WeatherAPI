import { useEffect, useState } from "react"; // imports React hooks - managing state and side effects
import coldbg from "./assets/coldbg.jpg"; // import cold weather background
import hotbg from "./assets/hotbg.jpg" // import hot weahter background
import Descriptions from "./components/Descriptions"; // import a component for displaying weather 
import AboutPage from "./components/AboutPage"; // import a component for displaying About Page
import { getWeatherData } from "./weatherAPI"; // function to fetch weather data from an API 



//  import hotBg from "../assets/hotbg.jpg"
//  import cloudyBg from "../assets/cloudyBg.jpb"




function App() {

  // states
  const [city, setCity] = useState("Paris")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(hotbg)
  // Create a new state variable to keep track of the current page.
  const [currentPage, setCurrentPage] = useState("weather");


  // use effect to auto import 
  useEffect(() => {

    const fetchWeatherinfo = async () => {
      const data = await getWeatherData(city, units)

      setWeather(data)
      // background wallpaper change 
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) { setBg(coldbg) }
      else setBg(hotbg)

      console.log(threshold);


    }
    fetchWeatherinfo()

  }, [units, city]); //city: when city changes (like user input) it fetches new data from api
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCel = currentUnit === "C";
    button.innerText = isCel ? '°F' : '°C';
    setUnits(isCel ? "metric" : "imperial")
  }
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur() //getting rid of cursor after user insert city
    }

  }

  function handleNavigation(page) {
    setCurrentPage(page);
  }



  // 2 Pages - weather

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <nav>
          <ul>
            <li>
              <button className="nav-button" onClick={() => handleNavigation("weather")}>Weather</button>
            </li>
            <li>
              <button className="nav-button" onClick={() => handleNavigation("about")}>About</button>
            </li>
          </ul>
        </nav>

        {currentPage === 'weather' && weather && (
          <div className="container">
            <div className="section">
              <div className="section section_inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city name :" />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section_temp" >
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weather icon" style={{ width: "100px", height: "100px" }} />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temp">
                  <h1>{`${weather.temp.toFixed()} ${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
        {currentPage === "about" && <AboutPage/>}
      </div>
    </div>
  );

}


export default App;




















