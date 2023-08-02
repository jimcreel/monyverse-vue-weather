<template>
  <NavView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavView from './views/NavView.vue';

export default defineComponent({
  components: {
    NavView
  },
});
</script>

<style> 
body {
  background-color: #03A9F4;
}
</style>

