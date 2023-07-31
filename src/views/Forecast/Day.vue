<template>
  <v-card outlined :style="{ width: '150px', flexShrink: 0}">
    <v-card-title>{{ dayName }} <br> {{ dateString }}</v-card-title>
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
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
      }
      return '';
    })

    const dateString = computed(() => {
      const date = new Date(props.day.date);
      const options = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    })

    // Watching celsius prop
    watch(celsius, (newVal, oldVal) => {
      
    })

    // Watching fahrenheit prop
    watch(fahrenheit, (newVal, oldVal) => {
      
    })

    return {
      dayName, celsius, fahrenheit, dateString
    }
  } 
}
</script>

