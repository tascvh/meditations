<template>
  <div class="verse-list" v-for="(cd,index) in chapter_data" :key="index">
    <!-- <nuxt-link :to="linkTo(cd.book,cd.chapter)"> -->
     <!-- {{ cd.book }} -->
      <ChapterView :p_data="cd"/>
    <!-- </nuxt-link> -->
  </div>
</template>

<script setup >
import ChapterView from '~/components/ChapterView.vue';

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
