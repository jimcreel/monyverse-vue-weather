<template>
  <nav>
    <router-link to="/today">Today's Weather</router-link> |
    <router-link to="/fiveDay">Five Day Forecast</router-link>
      <form @submit.prevent="setCity">
        <input type="text" v-model="city" placeholder="Enter Zip Code or City Name" />
        <button>Submit</button>
      </form>
      <p> {{ city }} </p>

    <!-- Add the Celsius and Fahrenheit links here -->
    <div class="temperature-switch">
      <a @click="setCelsius" href="#">Celsius</a> |
      <a @click="setFahrenheit" href="#">Fahrenheit</a>
    </div>
  </nav>
  <router-view/>
</template>

<script>
  import { useWeatherStore } from '@/stores/weather.js'
import { ref, onMounted, watch} from 'vue'


export default {
  setup () {
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
      setCity
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
</style>
