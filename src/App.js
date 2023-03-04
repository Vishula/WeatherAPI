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
  const [city, setCity] = useState("Paris") // initial city when loading page
  const [weather, setWeather] = useState(null) // variable with the current weather data
  const [units, setUnits] = useState("metric") // units to display temprature 
  const [bg, setBg] = useState(hotbg) // bg - current background image displaying  
  // Create a new state variable to keep track of the current page.
  const [currentPage, setCurrentPage] = useState("weather"); // currentPage variable - name of the currently displaying page


  // use effect to auto import 
  useEffect(() => { // runs a function whenever the component given or the (units, city) change

    const fetchWeatherinfo = async () => { //async function that will fetch weather data
      const data = await getWeatherData(city, units) //passing city and units variables to getWeatherData function

      setWeather(data) // update weather state var with fetched data
      // background wallpaper change. If its above 20c or 60f
      const piece = units === 'metric' ? 20 : 60; // piece is value of units variable
      if (data.temp <= piece) { setBg(coldbg) }
      else setBg(hotbg)

      console.log(piece); // log 


    }
    fetchWeatherinfo() // call fetchWeatherinfo function

  }, [units, city]); // when city or units changes (user input or °C or °F btn) it fetches new data from api
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCel = currentUnit === "C";
    button.innerText = isCel ? '°F' : '°C';
    setUnits(isCel ? "metric" : "imperial")
  }
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) { // check if enter key pressed 
      setCity(e.currentTarget.value) // value in input field - changes city variable to it. 
      e.currentTarget.blur() //getting rid of cursor after user insert city 
    }

  }

  function handleNavigation(page) {
    setCurrentPage(page); // changes current state of the page 
  }



  // This code block defines a navigation bar with two buttons - "weather" and "about". 
  // When the user clicks on the "about" button, they are taken to a separate page that 
  // provides a guide on what the website offe
  // background image 
  // About page will only render if currentpage equals to string about. 
  // The expression before the && operator is evaluated first.


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
                <input onKeyDown={enterKeyPressed} type="text" className="red-placeholder" name="city" placeholder="Enter city name :" />
                <button className="button-black" onClick={(e) => handleUnitsClick(e)}>°F</button>
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
        {currentPage === "about" && <AboutPage />} 
      </div>
    </div>
  );

}


export default App;




















