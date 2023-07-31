import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null,
    city: 92591,
    celsius: false,
    fahrenheit: true,
  }),
  getters: {
    getWeather: (state) => state.weather,
    getCity: (state) => state.city,
    getCelsius: (state) => state.celsius,
    getFahrenheit: (state) => state.fahrenheit,
  },

actions: {
  async fetchWeather(city=this.city) {
    
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${this.city}&key=${process.env.VUE_APP_WEATHER_API_KEY}&days=5`
    )
    // console.log(response)
    this.weather = response.data
  },

    setCelsius(value) {
      // console.log('celsius')
      this.celsius = value
      this.fahrenheit = !value
    },
    setFahrenheit(value) {
      // console.log('fahrenheit')
      this.fahrenheit = value
      this.celsius = !value
    },
    setCity(value){
      // console.log('set city')
      // console.log(value)
      this.city = value
      this.fetchWeather(this.city)
    }
  }
})
