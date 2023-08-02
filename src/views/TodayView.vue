<template>
  <!-- establishes the main current weather card-->
  <v-container>
    <DayCurrentView v-if="weather" :weather="weather" :fahrenheit="fahrenheit"/>
    <FiveDayView />
    <HourlyView v-if="weather" :weather="weather" :hours="hours" :fahrenheit="fahrenheit" :celsius="celsius" :scroll="scroll" :scroller="scroller"/>

  </v-container>
</template>


<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import Hour from './Forecast/Hour.vue';
import DayCurrentView from './Current/DayCurrentView.vue';
import { WeatherData, HourData } from '@/types/Types';
import HourlyView from './Forecast/HourlyView.vue';
import FiveDayView from './Forecast/FiveDayView.vue';

export default defineComponent({
  name: 'TodayView',
  components: {
    Hour,
    DayCurrentView,
    HourlyView, 
    FiveDayView
},
  setup() {
    // retrieve weatherstore and relevant states
    const weatherStore = useWeatherStore();
    const weather = computed<WeatherData | null>(() => weatherStore.getWeather);
    const hours = computed<HourData[]>(() => weatherStore.getHours);
    const celsius = computed<boolean>(() => weatherStore.getCelsius);
    const fahrenheit = computed<boolean>(() => weatherStore.getFahrenheit);
    const scroller = ref<HTMLElement | null>(null);


    watch(weather, (newVal) => {
      // remounts the component when the weather data changes
    }, {
      deep: true,
      immediate: true,
    });

    // controls the hourly forecast scroll
    const scroll = (direction: number) => {
      if (scroller.value){
        let container = scroller.value;
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

    return {
      weather,
      celsius,
      fahrenheit, 
      hours,
      scroller,
      scroll,
    }
  },
});
</script>

<style scoped>
.hourly {
  color: #FFFFFF;
}
body{
  background-color: #f7f8fa;
}
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


.overflow-auto {
  overflow-x: auto;
}
.scrollable-row {
  overflow-x: auto;
  width: 100%;
}
</style>
