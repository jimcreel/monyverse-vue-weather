import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null,
    city: 92591,
    celsius: false,
    fahrenheit: true,
    hours: []
  }),
  getters: {
    getWeather: (state) => state.weather,
    getCity: (state) => state.city,
    getCelsius: (state) => state.celsius,
    getFahrenheit: (state) => state.fahrenheit,
    getHours: (state) => state.hours
  },

actions: {
  async fetchWeather(city=this.city) {
    
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${this.city}&key=${process.env.VUE_APP_WEATHER_API_KEY}&days=5`
    )
    // console.log(response)
    this.weather = response.data
    // const day1 = this.weather.forecast.forecastday[0].hour
    const day1 = this.weather.forecast.forecastday[0].hour.filter(hour => hour.time_epoch >= this.weather.current.last_updated_epoch)
    // console.log(day1.time_epoch)
    // console.log(this.weather)
    const day2 = this.weather.forecast.forecastday[1].hour
    const hours = day1.concat(day2)
    this.hours = hours
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
