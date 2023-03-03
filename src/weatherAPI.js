// fetch data 

const API_KEY = 'dc5f408b20fff12ee86d687132e4733a'
const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`
const getWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    
    try {
      const data = await fetch(URL).then((res) => res.json());
  
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
      console.error(error);
    }
  };
  




export { getWeatherData };