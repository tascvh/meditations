<template>
  <div>
    <!-- {{route.params.chapter_string}} -->
    <div v-if="chapter_data">
      <ChapterView :p_data="chapter_data"/>
            <nuxt-link :to="prev_link"> Prev </nuxt-link>
            <nuxt-link :to="next_link"> Next </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ChapterView from '~/components/ChapterView.vue';
import { parseChapterString } from "../utils/link"
import { getChapterLink } from "../utils/link"

// const fullName = computed(() => {
//   return `${firstName.value} ${lastName.value}`.trim();
// });

onMounted(async () => {
  await fetchData();
});


var chapter_data = ref(null);
var next_link = ref("next")
var prev_link = ref("prev")
// var data = ref({book:1,chapter:2});

var chapter_list = ref([]);

const fetchData = async ()=> {
  console.log("fd");

    // {{route.params.chapter_string}}
  const c = parseChapterString(route.params.chapter_string);
  // data.value = {book : c.book, chapter : c.chapter, text : "asdasdasd" };
  try {
    {
      const response = await fetchChapters([{book:c.book, chapter:c.chapter}]); 
      const xx = await response.data;
      if(xx.length) {
        chapter_data.value = xx[0];
      }
    }
    {
      const response = await fetchVerseMeta(parseInt(c.book),parseInt(c.chapter)); 
      const data = await response.data;
      prev_link.value = data.prev?getChapterLink(data.prev.book, data.prev.chapter):null;
      next_link.value = data.next?getChapterLink(data.next.book, data.next.chapter):null;

      console.log("fetched meta");
    }
  } catch (error) {
    console.error('XX Error fetching data:', error);
  }
}

const route = useRoute();

</script>
