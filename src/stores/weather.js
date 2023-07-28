import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null,
    location: null,
  }),
  getters: {
    getWeather: (state) => state.weather,
    getLocation: (state) => state.location,
  },
  actions: {
    async fetchWeather(location = 'London') {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${location}&key=${process.env.VUE_APP_WEATHER_API_KEY}&days=5`
      )
      this.weather = response.data
      this.location = location
    },
  },
})
