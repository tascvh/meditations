<template>
  <div class="page">

    <div class="center-text">
      <router-link v-if="prev_link" :to="prev_link" >
        <div class="bordered-link">Prev</div>  
      </router-link>
      <router-link v-if="next_link" :to="next_link" >
        <div class="bordered-link">Next</div>  
      </router-link>
    </div>
    <div >
      <ChapterViewCmp :p_data="chapter_data" />
    </div>

    
    <div class="center-text">
      <div class="bordered-link" v-if="show_tags" @click="toggleTags">Hide Tags</div>
      <div class="bordered-link" v-else @click="toggleTags" >Show Tags</div>
      <div class="bordered-link" @click="toggleTags" >Show Collections</div>
    </div>

    <TagLinkCmp v-if="show_tags" :tags="chapter_data.tags" />
    <!-- <div class="" v-for="(tag,index) in chapter_data.tags" :key="index"> -->
    <!--   {{tag}} -->
    <!-- </div> -->
  </div>
</template>

<script>
import ChapterViewCmp from '@/components/ChapterViewCmp.vue'
import { fetchVerseMeta } from '../utils/data';
import { fetchChapters } from '../utils/data';
import TagLinkCmp from '@/components//TagLinkCmp.vue';
import { getChapterLink } from '../utils/chapter';
import { parseChapterString } from '../utils/chapter';

export default {
  name: 'ChapterViewPg',
  components: {
    ChapterViewCmp,
    TagLinkCmp
  },
  data() {
    return {
      chapter_data : {book : 0 , chapter : 0, text : "empty" },
      prev_link : null,
      next_link : null,
      show_tags : false,
    }
  },
  mounted () {
    this.fetchData();
  },
  watch: {
    // Watch for changes in the route parameters
    '$route.params': {
      immediate: false, // Run the handler immediately on component creation
      handler(params) {
        // this.show_tags = false;
        console.log(params);
        this.fetchData();
      }
    }
  },
  methods: {
    toggleTags () {
      this.show_tags = !this.show_tags ;
      // alert(this.show_tagccss);
    },
    async fetchData() {
      console.log("fd");
      try {
        {
          const response = await fetchChapters([{book:this.book, chapter:this.chapter}]); 
          const data = await response.data;
          if(data.length) {
            this.chapter_data = data[0];
          }
        }
        {
          const response = await fetchVerseMeta(parseInt(this.book),parseInt(this.chapter)); 
          const data = await response.data;
          this.prev_link = data.prev?getChapterLink(data.prev.book, data.prev.chapter):null;
          this.next_link = data.next?getChapterLink(data.next.book, data.next.chapter):null;

          console.log("fetched meta");
        }
      } catch (error) {
        console.error('XX Error fetching data:', error);
      }
    },
  },
  computed: {
    book() { return parseChapterString(this.$route.params.chapter).book},
    // book() { return parseInt(this.$route.params.chapter.split("-")[0]) },
    // chapter() { return parseInt(this.$route.params.chapter.split("-")[1]) }
    chapter() { return parseChapterString(this.$route.params.chapter).chapter},
  }
}
</script>

<style scoped>
.page {
  width:100%;
}

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

/* .bordered-link:hover { */
/*     background-color: var(--border-color);  */
/*     color: white;  */
/*   } */

/* .link-button { */
  /* border */
/* } */
</style >
