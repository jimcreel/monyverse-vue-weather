html
Copy code
<template>
  <v-container>
    <v-card v-if="weather" class="mx-auto weather-card pa-4 my-10"  color="light-blue lighten-5">
      <v-card-title class="headline justify-center text-center blue--text text-h4 text-md-h2 text-wrap">{{ weather.location.name }}, {{ weather.location.region }}</v-card-title>
      <v-card-text>
        <v-container v-if="weather">
          <v-row v-if="celsius" class="blue--text">
            <v-col class="text-h3 text-md-h2 text-lg-h1">{{ Math.trunc(weather.current.temp_c) }}°C</v-col>
            <v-col class="text-h5 text-md-h4 text-lg-h3">Feels Like: {{ Math.trunc(weather.current.feelslike_c)}}°C </v-col>
            <v-col class="text-h5 text-md-h3 text-lg-h2">Today's High: {{ Math.trunc(weather.forecast.forecastday[0].day.maxtemp_c) }} °C</v-col>
            <v-col class="text-h5 text-md-h3 text-lg-h2">Today's Low: {{ Math.trunc(weather.forecast.forecastday[0].day.mintemp_c) }} °C</v-col>
          </v-row>
          <v-row v-else class="blue--text">
            <v-col class="text-h3 text-md-h2 text-lg-h1">{{ Math.trunc(weather.current.temp_f) }}°F</v-col>
            <v-col class="text-h4 text-md-3">Feels Like: {{ Math.trunc(weather.current.feelslike_f)}}°F </v-col>
            <v-col class="text-h5 text-md-h4 text-lg-h4">Today's High: {{ Math.trunc(weather.forecast.forecastday[0].day.maxtemp_f) }} °F</v-col>
            <v-col class="text-h5 text-md-h4 text-lg-h4">Today's Low: {{ Math.trunc(weather.forecast.forecastday[0].day.mintemp_f) }} °F</v-col>
          </v-row>
          <v-row align="center" justify="center" class="blue--text">
            <v-img class="weather-icon" :src="weather.current.condition.icon" :alt="weather.current.condition.text" />
            <v-col class="text-h5 text-md-h4 text-lg-h4">{{ weather.current.condition.text }}</v-col>
            <v-col class="text-h5 text-md-h4 text-lg-h4">Humidity: {{ weather.current.humidity }}%</v-col>
          </v-row>
        </v-container>
        <v-progress-circular v-else indeterminate color="blue"></v-progress-circular>
      </v-card-text>
    </v-card>
    <v-card-text class="d-flex flex-row align-center justify-center">
      <v-btn icon @click="scroll(-1)">
          <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="auto">
        <v-card-text class="text-h4 text-center">Hourly Forecast</v-card-text>
      </v-col>
      <v-btn icon @click="scroll(1)">
          <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-text>

    <v-container class="pa-0" fluid>
      <v-row no-gutters>
        <v-col cols="12" md="8" lg="20" class="mx-auto">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              
            </v-col>
            <v-col>
              <div v-if="weather" ref="scroller" class="d-flex flex-nowrap overflow-auto">
                <v-col cols="auto" v-for="(hour, index) in weather.forecast.forecastday[0].hour" :key="index" class="px-2">
                  <Hour :hour="hour" :currentEpoch="weather.current.last_updated_epoch" />
                </v-col>
              </div>
            </v-col>
            <v-col cols="auto">
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>


<script>
import { useWeatherStore } from '@/stores/weather.js'
import { watch, computed } from 'vue'
import Hour from './Forecast/Hour.vue'

export default {
  name: 'TodayView',
  setup () {
    const weatherStore = useWeatherStore()

    const weather = computed(() => weatherStore.getWeather)
    // console.log(weather)
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
  components: {
    Hour
  }, 
  methods: {
    scroll(direction) {
        let container = this.$refs.scroller;
        let scrollAmount = 0;
        let slideTimer = setInterval(function(){
            if(direction == 1){
                container.scrollLeft += 10;
            } else {
                container.scrollLeft -= 10;
            }
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 25);
      }
}
}
</script>

<style scoped>
.weather-card {
  background-color: #f7f8fa;
  border-radius: 10px;
}

.text-center {
  text-align: center;
}

.temperature-section {
  text-align: center;
  margin-top: 15px;
}

.weather-icon {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.overflow-auto {
  overflow-x: auto;
}
.scrollable-row {
  overflow-x: auto;
  width: 100%;
}
</style>
