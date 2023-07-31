<template>
  <v-card>
    <v-card-title class="headline">Weather</v-card-title>
    <v-card-text>
      <div v-if="weather">
        <h2>{{ weather.location.name }}, {{ weather.location.region }}</h2>
        <div v-if="celsius">
          <p>Current Temperature: {{ Math.trunc(weather.current.temp_c) }} °C</p>
          <p>Feels Like: {{ Math.trunc(weather.current.feelslike_c)}}°C </p>
          <p>Today's High: {{ Math.trunc(weather.forecast.forecastday[0].day.maxtemp_c) }} °C</p>
          <p>Today's Low: {{ Math.trunc(weather.forecast.forecastday[0].day.mintemp_c) }} °C</p>
          
        </div>
        <div v-else>
          <p>Current Temperature: {{ Math.trunc(weather.current.temp_f) }} °F</p>
          <p>Feels Like: {{ Math.trunc(weather.current.feelslike_f)}}°F </p>
          <p>Today's High: {{ Math.trunc(weather.forecast.forecastday[0].day.maxtemp_f) }} °F</p>
          <p>Today's Low: {{ Math.trunc(weather.forecast.forecastday[0].day.mintemp_f) }} °F</p>
          
        </div>
        <v-img class="small-image" :src="weather.current.condition.icon" :alt="weather.current.condition.text" />
        <p>Humidity: {{ weather.current.humidity }}%</p>
      </div>
      <div v-else>
        <p>Loading weather data...</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useWeatherStore } from '@/stores/weather.js'
import { watch, computed } from 'vue'

export default {
  name: 'TodayView',
  setup () {
    const weatherStore = useWeatherStore()

    const weather = computed(() => weatherStore.getWeather)
    // console.log(weather.value)
    const celsius = computed(() => weatherStore.getCelsius)

    watch(weather, (newVal) => {
      
    }, {
      deep: true,
      immediate: true
    })

    return {
      weather,
      celsius
    }
  },
}
</script>

<style scoped>
.small-image {
  width: 50px !important;
  height: 50px !important;
}
</style>
