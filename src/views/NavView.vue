<template>
    <nav>
        <router-link to="/today">Today's Weather</router-link> |
        <router-link to="/fiveDay">Five Day Forecast</router-link>
        <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
  >
    <v-card-text>
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
    </v-card-text>
  </v-card>

        <!-- Add the Celsius and Fahrenheit links here -->
        <div class="temperature-switch">
        <a @click="setCelsius" href="#" :class="{ 'temp-active': celsius }">Celsius</a> |
        <a @click="setFahrenheit" href="#" :class="{ 'temp-active': fahrenheit }">Fahrenheit</a>
        </div>
    </nav>
    <router-view />
</template>

<script>
    import { useWeatherStore } from '@/stores/weather.js'
    import { ref, onMounted, watch, computed} from 'vue'
    export default {
        name: 'Nav',
        setup () {
            const celsius = computed(() => weatherStore.getCelsius);
            const fahrenheit = computed(() => weatherStore.getFahrenheit);
            const weatherStore = useWeatherStore()
            const city = ref('')
            const fetchWeather = () => {
            weatherStore.fetchWeather(weatherStore.city)
            }
            
            const setCity = () => {
            // console.log('store city', weatherStore.city)
            weatherStore.setCity(city.value)
            }
            const setCelsius = () => {
            weatherStore.setCelsius(true);
            weatherStore.setFahrenheit(false);
            }
            const setFahrenheit = () => {
            weatherStore.setCelsius(false);
            weatherStore.setFahrenheit(true);
            }
            fetchWeather()

            return {
            city,
            setCelsius,
            setFahrenheit,
            setCity,
            celsius,
            fahrenheit
            }
        }
    }
</script>

<style>
    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    }

    nav {
    padding: 30px;
    }

    nav a {
    font-weight: bold;
    color: #2c3e50;
    }

    nav a.router-link-exact-active {
    color: #42b983;
    }

    
    .temperature-switch a {
    margin-left: 10px;
    margin-right: 10px;
    }

    .temperature-switch a.temp-active {
        color: #42b983;
    }
</style>

