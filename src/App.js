import { useEffect, useState } from "react";
import coldbg from "./assets/coldbg.jpg"
import Descriptions from "./components/Descriptions";
import { getWeatherData } from "./weatherAPI";

//  import hotBg from "../assets/hotbg.jpg"
//  import cloudyBg from "../assets/cloudyBg.jpb"




function App() {

  // states
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")


  // use effect to auto import 
  useEffect(() => {

    const fetchWeatherinfo = async () => {
      const data = await getWeatherData('cairns', units)

      setWeather(data)
      console.log(data);


    }
    fetchWeatherinfo()

  }, []);





  return ( // background
    <div className="app" style={{ backgroundImage: `url(${coldbg})` }}>
      <div className="overlay">

        { // only container comes visible when weather is fetched
          weather && <div className="container">
            <div className="section">

              <div className="section section_inputs">
                <input type="text" name="city" placeholder="Enter city name :" />
                <button>°F</button>

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
            <Descriptions weather={weather} units={units}/>

          </div>
        }

      </div>
    </div>
  );
}


export default App;



 
















