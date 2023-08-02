<template>
    <nav>
        
        <v-card
            class="mx-auto"
            color="blue-lighten-5"
            max-width="400"
        >
            
            <!-- a vuetify library search component -->
            <v-text-field
                density="compact"
                variant="solo"
                label="Enter City or ZIP"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @keyup.enter="setCity"
                v-model="city"
            ></v-text-field>
            
        </v-card>

        <div class="temperature-switch">
            <a @click="setCelsius" href="#" :class="{ 'temp-active': celsius }">Celsius</a> |
            <a @click="setFahrenheit" href="#" :class="{ 'temp-active': fahrenheit }">Fahrenheit</a>
        </div>
    </nav>
    <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useWeatherStore } from '@/stores/weather';

export default defineComponent({
  name: 'Nav',
  setup () {
    // retrieve weatherstore and relevant states
    const weatherStore = useWeatherStore();
    const city = ref('');
    const celsius = computed(() => weatherStore.getCelsius);
    const fahrenheit = computed(() => weatherStore.getFahrenheit);


    const fetchWeather = async () => {
      await weatherStore.fetchWeather(weatherStore.city);
    }

    // on submit of the search bar, set the city
    // on submit of the search bar, set the city
    const setCity = () => {
      let cleanCity = city.value.replace(/[^a-zA-Z0-9 ]/g, ""); // This regex pattern matches non-alphanumeric characters and replace them with an empty string
      weatherStore.setCity(cleanCity.trim()); 
    }


    // toggle for C/F
    const setCelsius = () => {
      weatherStore.setCelsius(true);
      weatherStore.setFahrenheit(false);
    }

    const setFahrenheit = () => {
      weatherStore.setCelsius(false);
      weatherStore.setFahrenheit(true);
    }

    // immediately fetch weather data on mount
    onMounted(() => {
      fetchWeather();
    });

    return {
      city,
      setCelsius,
      setFahrenheit,
      setCity,
      celsius,
      fahrenheit
    }
  }
});
</script>

<style>
    
    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    
    }

    nav {
    padding: 30px;
    }

    nav a {
    font-weight: bold;
    
    }

    
    .temperature-switch a {
    margin-left: 10px;
    margin-right: 10px;
    }

    .temperature-switch a.temp-active {
        color: #fff
    }
</style>

