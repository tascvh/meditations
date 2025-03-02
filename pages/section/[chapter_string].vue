<template>
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
      <div class="bordered-link" v-if="show_tags" @click="show_tags=!show_tags">Hide Tags</div>
      <div class="bordered-link" v-else @click="show_tags=!show_tags" >Show Tags</div>
      <div class="bordered-link"  >Show Collections</div>
    </div>
    <TagList v-if="show_tags" :tag_list="chapter_data.tags" />
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

const route = useRoute();

const fetchData = async ()=> {
  console.log("fd");

  const c = parseChapterListString(route.params.chapter_string);

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
        console.log(chapter_data.tags)
      }
    }
    {
      const response = await fetchVerseMeta(parseInt(c[0].book),parseInt(c[0].chapter)); 
      const data = await response.data;
      prev_link.value = data.prev?getChapterLink(data.prev.book, data.prev.chapter):null;
      next_link.value = data.next?getChapterLink(data.next.book, data.next.chapter):null;

      console.log("fetched meta");
    }
  } catch (error) {
    console.error('XX Error fetching data:', error);
  }
}

onMounted(async () => {
  await fetchData();
});


watch(
  () => route.params.chapter_string,
  async (old_val, new_val) => {
    await fetchData();
  }
);

const chapter_data = ref(null);
const next_link = ref("next")
const prev_link = ref("prev")
const chapter_list = ref([]);
// conest show_tags = ref(false);
const show_tags = useState('show_tags', () => false);

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
.bordered-link {
    text-decoration: none; /* Remove underline */
    /* color: #007BFF;  */
    padding: 5px 15px; /* Padding around the link */
    border: 2px solid #007BFF; /* Border color and thickness */
    border-radius: 5px; /* Rounded corners */
    border-color : var(--border-color) ;
    display: block; 
        width: fit-content; /* Make the link only as wide as its content */
    transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effect */
    margin-right:10px;
    cursor: pointer;
}
</style>
