<template>
  <div>
    <h2>{{arraySize}} chapter<span v-if="arraySize>1">s</span> tagged with {{ route.params.tag }} </h2>
    <ChapterListView :chapter_list="chapter_list" />
  </div>
</template>

<script setup>
import ChapterListView from '~/components/ChapterListView.vue';
import { fetchByTag } from '../utils/data';

const route = useRoute();
const chapter_list = ref([]);
const arraySize = computed(() => chapter_list.value.length);

const fetchData = async (newValue) => {
  const res  = await fetchByTag(newValue);
  chapter_list.value = res.data
  // console.log("clv", chapter_list.value)
}

onMounted( async () => await fetchData(route.params.tag) )
watch(route.params.tag, fetchData );

</script>


<style scoped> 
h2 {
  margin-bottom: 30px ;
}
</style> 
