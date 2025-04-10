<template>
  <!-- <div class="tag-link-cmp"> -->
  <div class="grid-container">
    <div
      class="grid-item" 
      v-for="tag in tag_list"
      :key="tag"
      >
      <nuxt-link :to="linkTo(tag)">
        <span  > {{ tag }} </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  tag_list: {
    type: Array,
    required: true, // This prop is required
  },
});

const linkTo = (tag) =>  {
  return "/tags/" + tag
}

</script>

<style scoped>
.grid-container {
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
  /* gap: 10px; */
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Space between pills */
}
.grid-item {
  background-color: var(--background-primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor:pointer;
}

.tag-link-cmp {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Space between pills */
}

.tag-pill {
  background-color: #e0e0e0; /* Light gray background */
  color: #333; /* Dark text color */
  padding: 8px 12px; /* Padding for the pill */
  border-radius: 20px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth background transition */
}

.tag-pill:hover {
  background-color: #bdbdbd; /* Darker gray on hover */
}
</style>
