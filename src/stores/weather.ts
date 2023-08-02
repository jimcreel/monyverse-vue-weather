import axios from 'axios';
import { defineStore } from 'pinia';
import { WeatherData, WeatherState, HourData } from '../types/Types';

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    weather: null,
    city: '',
    celsius: false,
    fahrenheit: true,
    hours: [],
    error: ''
  }),
  getters: {
    getWeather: (state) => state.weather,
    getCity: (state) => state.city,
    getCelsius: (state) => state.celsius,
    getFahrenheit: (state) => state.fahrenheit,
    getHours: (state) => state.hours
  },
  actions: {
    async fetchWeather(city: string | null = null): Promise<void> {
      try {
        if (!city) {
          city = this.city || '92591';
        }
        // because the API returns current weather with the forecast.json call,
        // we can use the same call for both the current weather and the 5-day forecast and reduce calls to the API
        const response = await axios.get<WeatherData>(
          `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${process.env.VUE_APP_WEATHER_API_KEY}&days=5`
        );
    
        this.weather = response.data;
        
        if (
          this.weather?.forecast?.forecastday[0]?.hour 
          && this.weather?.forecast?.forecastday[1]?.hour 
          && this.weather?.current?.last_updated_epoch !== null
        ) {
          const day1: HourData[] = response.data.forecast.forecastday[0].hour.filter(
            (hour: HourData) => hour.time_epoch >= response.data.current.last_updated_epoch
          );
          const day2: HourData[] = response.data.forecast.forecastday[1].hour;
          const hours: HourData[] = day1.concat(day2);
    
          this.hours = hours;
        }
      } catch (error: any) {
        console.error("Error fetching weather data: ", error.message);
        this.error = "Error fetching weather data: " + error.message;
      }
    },
    
  
  
    setCelsius(value: boolean) {
      this.celsius = value;
      this.fahrenheit = !value;
    },
    setFahrenheit(value: boolean) {
      this.fahrenheit = value;
      this.celsius = !value;
    },
    setCity(value: string) {
      this.city = value;
      this.fetchWeather(this.city);
    }
  }
});
