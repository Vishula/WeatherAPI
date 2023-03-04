// fetch data 

const API_KEY = 'dc5f408b20fff12ee86d687132e4733a'
const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png` //declare it as a function that takes icondId and returns an icon image that is fetched via this url 
const getWeatherData = async (city, units = 'metric') => { // async function takes city and units as params and returns a promise that gives an object with weather data
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`; // fetching data from openweahtermapapi using city name and api key
    
    try {
      const data = await fetch(URL).then((res) => res.json()); // parse fetched weather data to json
  
      if (!data.main) {
        throw new Error('Unable to fetch weather data. Please check the city name.');
      }
  
      const { weather, main, wind, sys, name } = data;
      const { temp, feels_like, temp_min, temp_max, pressure, humidity } = main;
      const { description, icon } = weather[0];
      const iconURL = makeIconURL(icon);
      const { speed } = wind;
      const { country } = sys;
  
      return {
        description,
        iconURL,
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name
      };
    } catch (error) {
      console.error(error); //if error log it. 
    }
  };
  




export { getWeatherData }; // export this function to other parts of the code. 