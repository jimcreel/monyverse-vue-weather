<template>
    <h1>Five Day Forecast</h1>
    <div v-if="weather">
      <h2>{{ weather.location.name }}, {{ weather.location.region }}</h2>
      <div v-for="day in weather.forecast.forecastday" :key="day.date">
        <Day :day="day" />
      </div>
      <!-- Add more fields as per your weather object -->
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </template>
  
  <script>
  import { useWeatherStore } from '@/stores/weather.js'
  import { watch, computed } from 'vue'
  import Day from './Day.vue'
  
  export default {
    name: 'TodayView',
    components: {
      Day
    },
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
  