<template>
  <!-- <li v-for="(c,index) in chapter_list" :key="index">{{ c.chapter }}</li> -->
  <div class="verse-list" v-for="(cd,index) in chapter_data" :key="index">
    <router-link :to="linkTo(cd.book,cd.chapter)">
      <ChapterViewCmp :p_data="cd" />
    </router-link>
  </div>
</template>

<script>
import ChapterViewCmp from './ChapterViewCmp.vue'
import { fetchChapters } from '../utils/data';
import { getChapterLink } from '../utils/chapter';

export default {
  name: 'ChapterViewListCmp',
  components: {
    ChapterViewCmp
  },
  props: {
    chapter_list: {
      type: [],
      required: true
    }
  },
  data() {
    return {
      chapter_data : [],
    }
  },
  async created () {
    this.fetchData();
  },
      watch: {
        // Watch for changes to the 'items' prop
        chapter_list: {
            immediate: true, // Call the handler immediately on component creation
            handler() {
              console.log("handler");
                this.fetchData();
            },
        },
    },
  // watch: {
  //   '$route.params': {
  //     immediate: false, 
  //     handler() {
  //       this.fetchData();
  //     }
  //   }
  // },
  methods: {
    linkTo(book,chapter) {
      return getChapterLink(book,chapter)
    },
    async fetchData() {
      console.log("list view fd", this.capter_list);
      try {
        const response = await fetchChapters(this.chapter_list); 
        // const data = await response.data;
        const data = response.data;
        this.chapter_data = data;
      } catch (error) {
        console.error('XX Error fetching data :',this.name, error);
      }
    },
  }
}
</script>

<style scoped>
.verse-list {
  /* width : 100%; */

  /* display: flex;  */
  /* flex-direction: column;  */
  /* max-width: 800px; */
  /* margin: 0 auto; */
  /* padding: 20px; */
}
</style>
