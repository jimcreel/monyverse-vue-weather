<template>
  <v-card outlined :style="{ width: '150px', flexShrink: 0}">
    <v-card-title>{{ dayName }} <br> {{ dateString }}</v-card-title>
    <v-card-text>
        <div>High: {{ fahrenheit ? Math.trunc(day.day.maxtemp_f) + '°F' : Math.trunc(day.day.maxtemp_c) + '°C'}}</div>
        <div>Low: {{ fahrenheit ? Math.trunc(day.day.mintemp_f) + '°F' : Math.trunc(day.day.mintemp_c) + '°C'}}</div>
      <div>Humidity: {{ day.day.avghumidity }}%</div>
      <v-img :src="day.day.condition.icon" :alt="day.day.condition.text" />
      <div>Chance of Rain: {{ day.day.daily_chance_of_rain }}%</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { defineComponent, computed, watch } from 'vue'
import { ForecastDay } from "@/types/Types";

export default defineComponent({
  name: 'DayView',
  props: {
    day: {
      type: Object as () => ForecastDay,
      required: true
    }
  },
  setup(props) {
    const weatherStore = useWeatherStore()
    const celsius = computed(() => weatherStore.getCelsius)
    const fahrenheit = computed(() => weatherStore.getFahrenheit)
    
    // converts Date getDay to day of the week
    const dayName = computed(() => {
      if (props.day && props.day.date) {
        let parts = props.day.date.split("-");
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let day = parseInt(parts[2], 10);
        let date = new Date(year, month, day);

        // Get the day of the week
        let dayOfWeek = date.getDay();
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return days[dayOfWeek];
      }
      return '';
    });



    const dateString = computed(() => {
      //return the short month and day
      if (props.day && props.day.date) {
        let parts = props.day.date.split("-");
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let day = parseInt(parts[2], 10);
        let date = new Date(year, month, day);
        // Get the short month and day
        let shortMonth = date.toLocaleString('default', { month: 'short' });
        let dateDay = date.getDate();

        return `${shortMonth} ${dateDay}`;
      }
    });


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
})
</script>
