
import { defineStore } from 'pinia';
import { WeatherData, WeatherState, HourData } from '../types/Types';

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    weather: null,
    city: '92591',
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
    
    setHours( hours: HourData[] ) {
      this.hours = hours
    },
    setWeather( value: WeatherData ) {
      this.weather = value
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
    }
  }
});
