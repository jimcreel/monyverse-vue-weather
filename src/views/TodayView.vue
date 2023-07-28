<template>
    <h1>Weather</h1>
  
    <div v-if="weather">
      <h2>{{ weather.location.name }}, {{ weather.location.region }}</h2>
      <p>Current Temperature: {{ weather.current.temp_f }} °F</p>
      <img :src="weather.current.condition.icon" :alt="weather.current.condition.text" />
      <p> Today's High: {{ weather.forecast.forecastday[0].day.maxtemp_f }}</p>
      <p>Humidity: {{ weather.current.humidity }}%</p>
      <!-- Add more fields as per your weather object -->
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </template>
  
  <script>
  import { useWeatherStore } from '@/stores/weather.js'
  import { watch, computed } from 'vue'
  
  export default {
    name: 'TodayView',
    setup () {
      const weatherStore = useWeatherStore()
  
      const weather = computed(() => weatherStore.getWeather)
  
      watch(weather, (newVal) => {
        console.log(newVal) // logs the new weather data whenever it changes
      }, {
        deep: true,
        immediate: true
      })
  
      return {
        weather
      }
    },
  }
  </script>
  