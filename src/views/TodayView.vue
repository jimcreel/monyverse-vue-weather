html
Copy code
<template>
  <v-container>
    <v-card v-if="weather" class="mx-auto weather-card pa-10 my-10"  color="light-blue lighten-5">
      <v-card-title style="word-break: break-word" class="headline justify-center align-center text-center blue--text text-h4 text-md-h2 text-lg-h2 text-wrap pa-5">{{ weather.location.name }}</v-card-title>
      <v-card-text>
        <v-container v-if="weather">
        
          <v-row justify="center" class="blue--text">
            <v-col md="4" class="text-h3 text-md-h2 text-lg-h1 font-weight-bold">{{ fahrenheit ? Math.trunc(weather.current.temp_f) + '°F' : Math.trunc(weather.current.temp_c) + '°C' }}</v-col>
           
          </v-row>
          <v-row justify="center" align="center" class="blue--text">
            <v-col md="4" class="text-h5 text-md-h4">Feels Like: {{ fahrenheit ? Math.trunc(weather.current.feelslike_f) +'°F' : Math.trunc(weather.current.feelslike_c) + '°C' }}</v-col>
            </v-row>
          <v-row justify="center" align="center" class="blue--text">
            <v-img class="weather-icon" :src="weather.current.condition.icon" :alt="weather.current.condition.text" />
          </v-row>
          <v-row justify="center" align="center" class="blue--text">
            <v-col md="8" class="text-h4 text-md-h3 text-lg-h2 font-weight-bold">{{ weather.current.condition.text }}</v-col>
          </v-row>
          <v-row justify="center" align="center" class="blue--text ">
            
            <v-col md="8" class="text-h5 text-md-h4 text-lg-h4">Chance of Rain: {{ weather.forecast.forecastday[0].day.daily_chance_of_rain }}%
            </v-col>
            
          </v-row>
          <v-row justify="center" align="center" class="blue--text">
          
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Today's High: {{ fahrenheit ? Math.trunc(weather.forecast.forecastday[0].day.maxtemp_f) + '°F' : Math.trunc(weather.forecast.forecastday[0].day.maxtemp_c) + '°C'}}</v-col>
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Today's Low: {{ fahrenheit ? Math.trunc(weather.forecast.forecastday[0].day.mintemp_f) + '°F': Math.trunc(weather.forecast.forecastday[0].day.mintemp_c) + '°C' }}</v-col>
          </v-row>
          
          <v-row justify="center">
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Wind: {{ weather.current.wind_dir }} {{  weather.current.wind_mph }} mph </v-col>
            
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Humidity: {{ weather.current.humidity }}%</v-col>
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
  <v-row no-gutters class="justify-start">
    <v-col cols="12" md="8" lg="20" class="mx-auto">
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          
        </v-col>
        <v-col>
          <div v-if="hours" ref="scroller" class="d-flex flex-nowrap overflow-auto">
            <v-col  cols="auto" v-for="(hour, index) in hours" :key="index" class="px-2">
              <Hour v-show="weather.current.last_updated_epoch <= hour.time_epoch" :hour="hour"  />
            </v-col>
          </div>
          <div v-else>
            <v-progress-circular indeterminate color="blue"></v-progress-circular>
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
    const hours = computed(() => weatherStore.getHours)
    // console.log(weather)
    const celsius = computed(() => weatherStore.getCelsius)
    const fahrenheit = computed(() => weatherStore.getFahrenheit)
  
    // console.log(hours)
    watch(weather, (newVal) => {
      
    }, {
      deep: true,
      immediate: true
    })

    return {
      weather,
      celsius,
      fahrenheit, 
      hours
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
      },
    
}
}
</script>

<style scoped>

.headline {
  line-height: 3;
}
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
}
.overflow-auto {
  overflow-x: auto;
}
.scrollable-row {
  overflow-x: auto;
  width: 100%;
}
</style>
