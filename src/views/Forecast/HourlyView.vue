<template>

    <v-card color="blue lighten-5">
        <v-card-text class="d-flex flex-row align-center justify-center hourly">
        
        <v-btn icon @click="scroll(-1)">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-col cols="auto">
            <v-card-text class="text-h4 text-center">Hourly Forecast</v-card-text>
        </v-col>
        <v-btn icon @click="scroll(1)">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        </v-card-text>
    <!-- container for hourly forecast -->
        <v-container class="pa-0" fluid>
        <v-row no-gutters class="justify-start">
            <v-col cols="12" md="8" lg="20" class="mx-auto">
            <v-row align="center" no-gutters>
                <v-col cols="auto">
                
                </v-col>
                <v-col>
                <!-- allows the hours cards to overflow and prevents them from wrapping -->
                <div v-if="hours && weather" ref="scroller" class="d-flex flex-nowrap overflow-auto">
                    <v-col  cols="auto" v-for="(hour, index) in hours" :key="index" class="px-2">
                    <!-- -->
                    <Hour :hour="hour"  />
                    </v-col>
                </div>
                <div v-else>
                    <v-progress-circular indeterminate color="blue"></v-progress-circular>
                </div>
                </v-col>
                <v-col cols="auto">
                
                </v-col>
            </v-row>
            </v-col>
        </v-row>
    </v-container>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Hour from "./Hour.vue";
import { WeatherData, HourData } from "@/types/Types";
import { PropType } from "vue";

export default defineComponent({
    name: "HourlyView",
    components: {
        Hour,
    },
    props: {
        weather: {
            type: Object as PropType<WeatherData | null>,
            required: false,
        },
        hours: {
            type: Array as () => HourData[],
            required: false,
        },
    }, 
    setup() {
        const scroller = ref<HTMLElement | null>(null);
        
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
        scroller,
        scroll,
    }
    },
})
</script>


