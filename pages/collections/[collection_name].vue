<template>
  <div>
    <h1>{{ route.query.coll }}</h1>
    <template v-if="chapters.length > 0">
      <ChapterListView :chapter_list="chapters" />
    </template>
    <template v-else>
      <p>No chapters found for this collection.</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ChapterListView from '@/components/ChapterListView.vue'; // Adjust the path as necessary

const route = useRoute();
const collectionName = route.params.collection_name;
const chapters = ref([]);

onMounted(() => {
  // Load the list from local storage using the collection name
  const storedChapters = localStorage.getItem(collectionName);
  if (storedChapters) {
    chapters.value = JSON.parse(storedChapters);
  } else {
    chapters.value = []; // Handle case where no data is found
  }
});
</script>

<style scoped>
/* Add any styles you need here */
</style>

