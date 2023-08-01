<template>
    <v-card v-if="currentEpoch <= hour.time_epoch" outlined>
        <v-card-title class="text-center">
            {{ hour.time }}
        </v-card-title>
        <v-card-text class="text-h6">
            {{ Math.trunc(hour.temp_f) }}°F
        </v-card-text>
        <v-img :src="hour.condition.icon" :alt="hour.condition.text" />
        <v-card-text v-if="!chance_of_snow">
            Chance of Rain: {{ hour.chance_of_rain }}%
        </v-card-text>
        <v-card-text v-if="hour.will_it_snow">
            Chance of Snow: {{ hour.chance_of_snow }}%
        </v-card-text>
    </v-card>
</template>


<script>
import { useWeatherStore } from '@/stores/weather';
import { computed } from 'vue';



export default {
    name: 'Hour',
    props: {
        hour: {
            type: Object,
            required: true
        },
        currentEpoch: {
            type: Number,
            required: true
        }
    }
}
</script>
