<template>
    <v-card v-if="weather" class="mx-auto weather-card pa-10 my-10"  color="blue lighten-5">
        <v-card-title style="word-break: break-word" class="headline justify-center align-center text-center blue--text text-h4 text-md-h2 text-lg-h2 text-wrap pa-5">{{ weather.location.name }}</v-card-title>
        <v-card-text>
        <v-container v-if="weather">
        
            <v-row justify="center" class="blue--text">
            <!-- conditionally renders the temp based on the state of fahrenheit-->
            <v-col md="4" class="text-h3 text-md-h2 text-lg-h1 font-weight-bold">{{ fahrenheit ? Math.trunc(weather.current.temp_f) + '°F' : Math.trunc(weather.current.temp_c) + '°C' }}</v-col>
            
            </v-row>
            <v-row justify="center" align="center" class="blue--text">
            <v-col md="4" class="text-h5 text-md-h4">Feels Like: {{ fahrenheit ? Math.trunc(weather.current.feelslike_f) +'°F' : Math.trunc(weather.current.feelslike_c) + '°C' }}</v-col>
            </v-row>
            <v-row justify="center" align="center" class="blue--text">
            <v-img class="weather-icon" :src="weather.current.condition.icon" :alt="weather.current.condition.text" />
            </v-row>
            <v-row justify="center" align="center" class="blue--text">
            <v-col md="8" class="text-h4 text-md-h3 text-lg-h2 font-weight-bold">{{ weather.current.condition.text }}</v-col>
            </v-row>
            <v-row justify="center" align="center" class="blue--text ">
            
            <v-col md="8" class="text-h5 text-md-h4 text-lg-h4">Chance of Rain: {{ weather.forecast.forecastday[0].day.daily_chance_of_rain }}%
            </v-col>
            
            </v-row>
            <v-row justify="center" align="center" class="blue--text">
            
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Today's High: {{ fahrenheit ? Math.trunc(weather.forecast.forecastday[0].day.maxtemp_f) + '°F' : Math.trunc(weather.forecast.forecastday[0].day.maxtemp_c) + '°C'}}</v-col>
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Today's Low: {{ fahrenheit ? Math.trunc(weather.forecast.forecastday[0].day.mintemp_f) + '°F': Math.trunc(weather.forecast.forecastday[0].day.mintemp_c) + '°C' }}</v-col>
            </v-row>
            
            <v-row justify="center">
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Wind: {{ weather.current.wind_dir }} {{  weather.current.wind_mph }} mph </v-col>
            
            <v-col md="6" class="text-h5 text-md-h4 text-lg-h4">Humidity: {{ weather.current.humidity }}%</v-col>
            </v-row>
        </v-container>
        <v-progress-circular v-else indeterminate color="blue"></v-progress-circular>
        </v-card-text>
    </v-card>
  </template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { WeatherData } from '@/types/Types';

    export default defineComponent({
    name: 'DayCurrentView',
    props: {
        weather: {
        type: Object as PropType<WeatherData | null>,
        required: true,
        },
        fahrenheit: {
        type: Boolean,
        required: true,
        },
    },
    });
</script>

