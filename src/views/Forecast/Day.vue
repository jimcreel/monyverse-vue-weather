<template>
    <h1>{{ dayName }}</h1>
    <h1>{{ day.date }}</h1>
    <p>High: {{ day.day.maxtemp_f }} °F</p>
    <p>Low: {{ day.day.mintemp_f }} °F</p>
    <p>Humidity: {{ day.day.avghumidity }}%</p>
    <img :src="day.day.condition.icon" :alt="day.day.condition.text" />
    <p>Chance of Rain: {{ day.day.daily_chance_of_rain }}%</p>

  </template>
  
  <script>
  import { useWeatherStore } from '@/stores/weather.js'
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
      const dayName = computed(() => {
        if (props.day && props.day.date){
          let day = new Date(props.day.date).getDay();
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return days[day];
        }
        return '';
      })
  
      return {
        dayName
      }
    } 
  }
  </script>
  