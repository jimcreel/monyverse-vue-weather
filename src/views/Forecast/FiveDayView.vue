<template>
  <v-card v-if="weather" class="mx-auto weather-card pa-10 my-10"  color="blue lighten-5">
  
    <v-row>
      <v-col class="text-center">
        <h1>Five Day Forecast</h1>
        <h2 
          v-if="weather">
          {{ weather.location.name }}{{ weather.location.region.length ? ', ' + weather.location.region : '' }}
        </h2>
        <v-card v-else>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-card>
      </v-col>
    </v-row>  

    <v-row
      class="d-flex justify-center align-stretch"
    >
      <v-col 
        v-if="weather"
        v-for="day in weather.forecast.forecastday" 
        :key="day.date" 
        cols="12" xs ="8" sm="8" md="8" lg="8" xl="2"
        
        
      >
        <DayView :day="day" />
      </v-col>
      <v-col v-else>
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </v-col>
    </v-row>
  
</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DayView from './DayView.vue'
import { WeatherData } from '@/types/Types' 
export default defineComponent({
    name: 'TodayView',
    components: {
        DayView
    },
    props: {
        weather: {
            type: Object as () => WeatherData | null,
            required: false
        }
    },
})
</script>

<style scoped>
h1, h2 { 
  color: #fff;
}
</style>