<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>
<script>
import { InitData } from '@/utils/data';

export default {
  name: 'App',
  components: {
  },
   async created() {
     console.log("created app");
    try {
      await InitData();
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  },
}
</script>
