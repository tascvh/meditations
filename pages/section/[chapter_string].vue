<template>
  <div class="text-center">
    <h1>{{ route.query.coll }}</h1>
  </div>
  <div v-if="chapter_data">

    <div class="center-text">
      <router-link v-if="prev_link" :to="prev_link" >
        <div class="bordered-link">Prev</div>  
      </router-link>
      <router-link v-if="next_link" :to="next_link" >
        <div class="bordered-link">Next</div>  
      </router-link>
    </div>
    <ChapterView :p_data="chapter_data"/>
    <div class="center-text">
      <!-- <div class="bordered-link" v-if="show_tags" @click="show_tags=!show_tags">Hide Tags</div> -->
      <!-- <div class="bordered-link" v-else @click="show_tags=!show_tags" >Show Tags</div> -->

      <div class="bordered-link" v-if="show_coll" @click="show_coll=!show_coll">Hide Collections</div>
      <div class="bordered-link" v-else @click="show_coll=!show_coll" >Add to Collection</div>
    </div>
    <!-- <TagList v-if="show_tags" :tag_list="chapter_data.tags" /> -->
    <Collections v-if="show_coll" :chapterLoc="xx"/>

  </div>

  <ChapterListView :chapter_list="chapter_list" />
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ChapterView from '~/components/ChapterView.vue';
import ChapterListView from '~/components/ChapterListView.vue';
import { parseChapterString } from "../utils/link"
import { parseChapterListString } from "../utils/link"
import { getChapterLink } from "../utils/link"
import  TagList from "~/components/TagList.vue";
import  Collections from "~/components/Collections.vue";

const route = useRoute();

const fetchData = async ()=> {
  console.log("fd");

  const c = parseChapterListString(route.params.chapter_string);
    xx.value = parseChapterListString(route.params.chapter_string)[0];
    console.log("xx", xx)

  if (c.length != 1) { 
    chapter_list.value = c;
    return
  }

  try {
    {
      const response = await fetchChapters(c); 
      const xx = await response.data;
      if(xx.length) {
        chapter_data.value = xx[0];
        // console.log(chapter_data.tags)
      }
    }
    {
      const response = await fetchChapterMeta(parseInt(c[0].book),parseInt(c[0].chapter)); 
      const data = await response.data;
      prev_link.value = data.prev?getChapterLink(data.prev.book, data.prev.chapter):null;
      next_link.value = data.next?getChapterLink(data.next.book, data.next.chapter):null;

      console.log("fetched meta");
    }
  } catch (error) {
    console.error('XX Error fetching data:', error);
  }
}

const xy = ref({book :1 , chapter:1})
const xx = ref({book :1 , chapter:1})
onMounted(async () => {
  await fetchData();
});


const chapter_obj = ref({book:1,chapter:1});
// const chapter_obj = ref(null);
// computed(() => {
// });

watch(
  // () => route.params.chapter_string,
  () => route.params.chapter_string,
  async (old_val, new_val) => {
    console.log("co", chapter_obj)
    await fetchData();
  }
);

const chapter_data = ref(null);
const next_link = ref("next")
const prev_link = ref("prev")
const chapter_list = ref([]);
// conest show_tags = ref(false);
const show_tags = useState('show_tags', () => false);
const show_coll = useState('show_coll', () => false);

</script>


<style scoped>

.next-prev {
}
.center-text {
  text-align: right; /* Center text within the block */
  display:flex;
    flex-direction: row; /* Stack items vertically */
    align-items: right; /* Center items horizontally */
    justify-content: right; /* Center items vertically */
    width: 100%; /* Full width */
    margin :10px;
}
/* .center-text { */
/*   text-align: center;  */
/*   display:flex; */
/*     flex-direction: row;  */
/*     align-items: center;  */
/*     justify-content: center;  */
/*     width: 100%;  */
/* } */
</style>
