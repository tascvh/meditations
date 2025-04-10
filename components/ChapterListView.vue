<template>
  <div class="verse-list" v-for="(cd,index) in chapter_data" :key="index">
    <!-- <nuxt-link :to="linkTo(cd.book,cd.chapter)"> -->
     <!-- {{ cd.book }} -->
     <ChapterView :p_data="cd"/>
     <div class="container" >
       <nuxt-link :to="getChapterLink(cd.book, cd.chapter)">
     <span href="#" class="collection-link">
       Go to Book {{cd.book}} Chapter {{ cd.chapter }}
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
       </svg>
     </span>
       </nuxt-link >
  </div>
    <!-- </nuxt-link> -->
  </div>
</template>

<script setup >
import ChapterView from '~/components/ChapterView.vue';
import { getChapterLink } from '../utils/link';

const props = defineProps({
  chapter_list: {
    type: Array,
    required: true, // This prop is required
  },
});

const load = async () => {
    {
      console.log("cl",props.chapter_list)
      const response = await fetchChapters(props.chapter_list); 
      const xx = await response.data;
      console.log(xx)
      chapter_data.value = xx;
      // if(xx.length) {
        // chapter_data.value = xx;
      // }
    }
}

const chapter_data = ref([])

watch(
  () => props.chapter_list,
  (old_list, new_list) => {
    load();
    // Update previousCount whenever count changes
    // previousCount.value = oldCount;
    // console.log(`Count changed from ${oldCount} to ${newCount}`);
  }
);

onMounted( load  )




</script>

<style scoped>

.container {
  display: flex;
  justify-content: flex-end; /* Aligns items to the right */
  padding : 5px;
  margin-bottom : 10px;
  cursor : pointer;
}
    .collection-link {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.875rem;
      display: inline-flex;
      align-items: center;
    }
    
    .collection-link:hover {
      text-decoration: underline;
    }
    
    .collection-link svg {
      margin-left: 0.25rem;
      width: 14px;
      height: 14px;
    }
   .centered-div {
            background-color: #e74c3c;
            width: 100%;
            padding: 20px;
            color: white;
  }

  .card-elegant a {
    display: none; /* This will hide all <a> tags within elements that have the class .hide-links */
    color: red; /* This will hide all <a> tags within elements that have the class .hide-links */
  }
/* .verse-component { */
/*   padding: 15px; */
/*   margin: 10px 0; */
/*   border: 1px solid #eee; */
/*   border-radius: 4px; */
/* } */
</style>
