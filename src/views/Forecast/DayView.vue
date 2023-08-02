<template>
  
      
    <v-card outlined color="light-blue lighten-5" class="pa-5 m d-flex flex-column fill-height">
    
    <v-card-title class="text-h5 text-md-h4">
      <div class="pb-2">{{ dateString }}</div>
      <div>{{ dayName }}</div>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="6" med="12" class="text-h6 text-md-h5">High: {{ fahrenheit ? Math.trunc(day.day.maxtemp_f) + '°F' : Math.trunc(day.day.maxtemp_c) + '°C' }}</v-col>
        <v-col cols="6" class="text-h6 text-md-h5">Low: {{ fahrenheit ? Math.trunc(day.day.mintemp_f) + '°F' : Math.trunc(day.day.mintemp_c) + '°C'}}</v-col>
      </v-row>
      <v-row>
        <v-col class="text-h6 text-md-h5">Humidity: {{ day.day.avghumidity }}%</v-col>
        <v-col class="text-h6 text-md-h5">Chance of Rain: {{ day.day.daily_chance_of_rain }}%</v-col>
      </v-row>
      
      <div class="d-flex justify-center align-center">
        <v-img class="weather-icon" :src="day.day.condition.icon" :alt="day.day.condition.text" />
      </div>
      <v-row>
        <v-col class="text-h6 text-md-h5">{{ day.day.condition.text }}</v-col>
      </v-row>
      
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
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
