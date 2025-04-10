<template>
  <TagList :tag_list="all_tags" />
</template>

<script setup>
import  TagList from "~/components/TagList.vue";
import { fetchTags } from '../utils/data';

const all_tags = ref([])

onMounted( async () => {
  try {
    {
      const response = await fetchTags(); 
      const data = await response.data;
      if(data.length) {
        all_tags.value = data;
      }
    }
  } catch (error) {
    console.error('XX Error fetching data:', error);
  }
})

</script>
