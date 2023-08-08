import { useWeatherStore } from '@/stores/weather'
import axios from 'axios'
import { WeatherData, HourData } from '@/types/Types';
import { ComputedRef } from 'vue'



export async function fetchWeather(weather: ReturnType<typeof useWeatherStore>, city: string | null = null): Promise<void> {
      
    try {
      if (!city) {
        city = '92591'
      }
      const response = await axios.get<WeatherData>(
        `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${process.env.VUE_APP_WEATHER_API_KEY}&days=5`
      );
        
      weather.setWeather(response.data)
     
      
      if (
        response.data?.forecast?.forecastday[0]?.hour &&
        response.data?.forecast?.forecastday[1]?.hour &&
        response.data?.current?.last_updated_epoch !== null
      ) {
        const day1: HourData[] = response.data.forecast.forecastday[0].hour.filter(
          (hour: HourData) => hour.time_epoch >= response.data.current.last_updated_epoch
        );
        const day2: HourData[] = response.data.forecast.forecastday[1].hour;
        const hours: HourData[] = day1.concat(day2);
            
        weather.setHours(hours);
      }
      
    } catch (error: any) {
      console.error("Error fetching weather data: ", error.message);
      weather.error = "Error fetching weather data: " + error.message;
    }
  }