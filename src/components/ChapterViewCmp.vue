<template>
  <div v-if="loading"></div>
  <div v-else class="card-elegant">
    <h3>Book {{ p_data.book }} Chapter {{ p_data.chapter }}</h3>
    <div class="verse-content">
      <!-- <p >{{ p_data.text }}</p> -->
      <div v-html="p_data.text"></div>
    </div>
  </div>
     <!-- <div class="centered-div"> -->
     <!--        This div is vertically centered and takes full width of its parent -->
     <!--    </div> -->
</template>

<script>
// import { fetchChapters } from '../utils/data';
export default {
  name: 'ChapterViewCmp',
  props: {
    p_data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  // watch: {
  //   // Watch for changes in the itemId prop
  //   verse: {
  //     immediate: false, // Run the handler immediately on component creation
  //     handler(newId) {
  //       this.fetchData(newId);
  //     }
  //   },
  //   chapter: {
  //     immediate: false, // Run the handler immediately on component creation
  //     handler(newId) {
  //       this.fetchData(newId);
  //     }
  //   }
  // },
  async created() {
    // this.fetchData();
  },
  methods : {
    // async fetchData() {
    //   const result = await fetchVerse(this.chapter,this.verse);
    //   this.item = result.data;
    //   if (this.item)
    //     this.loading = false;
    // }
  },
}
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
