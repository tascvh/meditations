<!-- pages/index.vue -->
<template>
  <div>
    <h1>Home Page</h1>
    <nuxt-link to="/about">Go to About Page</nuxt-link>
    <nuxt-link to="/contact">Go to Contact Page</nuxt-link>
    {{route.params.chapter_list}}
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// const params = route.params.chapter; // Access the dynamic parameter
// const parsedParams = params.split(',').map(Number); // Split and convert to numbers
// export default {
  // name: 'HomePage',
// }
</script>
