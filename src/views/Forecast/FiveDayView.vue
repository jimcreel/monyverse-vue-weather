<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Five Day Forecast</h1>
        <h2 
          v-if="weather">
          {{ weather.location.name }}, {{ weather.location.region }}
        </h2>
        <v-card v-else>
          <v-card-text>
            <p>Loading weather data...</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>  

    <v-row
      class="d-flex justify-center align-center"
    >
      <v-col 
        v-if="weather"
        v-for="day in weather.forecast.forecastday" 
        :key="day.date" 
        cols="12" xs ="6" sm="3" md="2" lg="2" xl="2"
        class="d-flex justify-center align-center"
      >
        <DayView :day="day" />
      </v-col>
      <v-col v-else>
        <v-card-text>
          <p>Loading weather data...</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import DayView from './DayView.vue'
import { WeatherData } from '@/types/Types' 
export default defineComponent({
    name: 'TodayView',
    components: {
        DayView
    },
    setup() {
        const weatherStore = useWeatherStore()
        const weather = computed<WeatherData | null>(() => weatherStore.getWeather)

        watch(weather, (newVal: WeatherData | null) => {
            
        }, {
            deep: true,
            immediate: true
        })

        return {
            weather
        }
    },
})
</script>
