<template>
    <v-card outlined>
        <v-card-title class="text-center">
            {{ time }}
        </v-card-title>
        <v-card-text v-if="!celsius" class="text-h6">
            {{ Math.trunc(hour.temp_f) }}°F
        </v-card-text>
        <v-card-text v-else class="text-h6">
            {{ Math.trunc(hour.temp_c) }}°C
        </v-card-text>
        <v-img :src="hour.condition.icon" :alt="hour.condition.text" />
        <v-card-text>
            {{ hour.condition.text }}
        </v-card-text>
        <!-- renders snowChance only if <0, but if no snow chance, renders rain chance including 0%-->
        <v-card-text v-if="!snowChance">
            Chance of Rain: {{ rainChance }}%
        </v-card-text>
        <v-card-text v-if="snowChance">
            Chance of Snow: {{ snowChance }}%
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { Hour as HourType } from '@/types/Types'

export default defineComponent({
    name: 'Hour',
    props: {
        hour: {
            type: Object as PropType<HourType>,
            required: true
        }
    },
    setup (props) {
        const weatherStore = useWeatherStore()
        const snowChance = computed(() => props.hour.will_it_snow)
        const rainChance = computed(() => props.hour.chance_of_rain)
        const celsius = computed(() => weatherStore.getCelsius)
        const fahrenheit = computed(() => weatherStore.getFahrenheit)
        const time = computed(() => {
            // formats time in a 12 hour format
            // console.log(props.hour.time)
            let [dateStr, timeStr] = props.hour.time.split(" ");
            let [hourStr, minuteStr] = timeStr.split(":");
            let hourNum = parseInt(hourStr);
            let period = hourNum >= 12 ? "PM" : "AM";
            if (hourNum > 12) hourNum -= 12;
            else if (hourNum === 0) hourNum = 12;
            let formattedTime = `${hourNum}:${minuteStr} ${period}`;
            return formattedTime;
        })
        return {
            celsius, fahrenheit, time, snowChance, rainChance
        }
    }
})
</script>
