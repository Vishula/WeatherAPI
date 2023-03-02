import coldbg from "./assets/coldbg.jpg"
import Descriptions from "./components/Descriptions";

//  import hotBg from "../assets/hotbg.jpg"
//  import cloudyBg from "../assets/cloudyBg.jpb"




function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${coldbg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section">

            <div className="section section_inputs">
              <input type="text" name="city" placeholder="Enter city name :" />
              <button>°F</button> 

            </div>
            <div className="section section_temp" >

              <div className="icon">
                <h3>London GB</h3>
                <img src="https://www.nicepng.com/png/detail/15-155040_weather-icon-weather.png" alt="weather icon" style={{ width: "100px", height: "50px" }} />
                <h3>Cloudy</h3>
              </div>

              <div className="temp">
                <h1>34 °C</h1>
              </div>
            </div>
          </div>
          <Descriptions />

        </div>
      </div>
    </div>
  );
}


export default App;




















