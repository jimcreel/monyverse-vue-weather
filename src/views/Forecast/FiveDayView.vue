<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Five Day Forecast</h1>
        <v-card v-if="weather">
          <v-card-title>
            <h2>{{ weather.location.name }}, {{ weather.location.region }}</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col 
                v-for="day in weather.forecast.forecastday" 
                :key="day.date" 
                cols="12" xs ="6" sm="2" 
                class="d-flex justify-center"
              >
                <Day :day="day" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-text>
            <p>Loading weather data...</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    setup() {
        const weatherStore = useWeatherStore()

        const weather = computed(() => weatherStore.getWeather)

        watch(weather, (newVal) => {
            
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
