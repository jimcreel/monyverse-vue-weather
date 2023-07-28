<template>
  <nav>
    <router-link to="/today">Today's Weather</router-link> |
    <router-link to="/fiveDay">Five Day Forecast</router-link>
    <div class="home">
      <input type="text" v-model="location" placeholder="Enter Zip Code or City Name" @input="search" />
    </div>
  </nav>
  <router-view/>
</template>

<script>
  import { useWeatherStore } from '@/stores/weather.js'
  import { ref } from 'vue'
  import debounce from 'lodash/debounce'
  export default {
    setup () {
      const weatherStore = useWeatherStore()
      const location = ref('')
      
      const search = debounce(async () => {
        if (location.value.length < 5) return
        let data = await weatherStore.fetchWeather(location.value)
        .then((data) => {
          console.log(data)
        })
      }, 500)
      
      return {
        location,
        search
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
</style>
