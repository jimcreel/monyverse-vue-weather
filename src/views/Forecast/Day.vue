<template>
  <v-card outlined>
    <v-card-title>{{ dayName }}</v-card-title>
    <v-card-subtitle>{{ day.date }}</v-card-subtitle>
    <v-card-text>
      <div v-if="celsius">
        <div>High {{ Math.trunc(day.day.maxtemp_c) }}°C</div>
        <div>Low: {{ Math.trunc(day.day.mintemp_c) }}°C</div>
        
      </div>
      <div v-else>
        <div>High {{ Math.trunc(day.day.maxtemp_f) }}°F</div>
        <div>Low: {{ Math.trunc(day.day.mintemp_f) }}°F</div>
        
      </div>
      <div>Humidity: {{ day.day.avghumidity }}%</div>
      <v-img :src="day.day.condition.icon" :alt="day.day.condition.text" />
      <div>Chance of Rain: {{ day.day.daily_chance_of_rain }}%</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useWeatherStore } from '@/stores/weather.js'
import { BaseTransitionPropsValidators } from 'vue';
import { watch, computed, ref } from 'vue'

export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const weatherStore = useWeatherStore()
    const celsius = computed(() => weatherStore.getCelsius)
    const fahrenheit = computed(() => weatherStore.getFahrenheit)
    const dayName = computed(() => {
      if (props.day && props.day.date){
        let day = new Date(props.day.date).getDay();
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days[day];
      }
      return '';
    })

    // Watching celsius prop
    watch(celsius, (newVal, oldVal) => {
      
    })

    // Watching fahrenheit prop
    watch(fahrenheit, (newVal, oldVal) => {
      
    })

    return {
      dayName, celsius, fahrenheit
    }
  } 
}
</script>
