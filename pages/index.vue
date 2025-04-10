<template>
  <div class="page">
  <!-- <div  class="card-elegant"> -->
  <!--   <h3>Book {{ index+1 }} </h3> -->
  <!--   <div class="verse-content"> -->
  <!--     &#60;&#33;&#45;&#45; <p >{{ p_data.text }}</p> &#45;&#45;&#62; -->
  <!--     <div v-html="p_data.text"></div> -->
  <!--   </div> -->
  <!-- </div> -->
    <!-- <div  v-for="(bmeta,index) in books_meta" :key="index"> -->
    <div class="card-elegant" v-for="(bmeta,index) in books_meta" :key="index">
        <h3>Book {{index+1}}</h3>
      <div class="grid-container">
        <div  v-for="number in createNumberArray(bmeta.len)" :key="number">
            <nuxt-link :to="linkTo(index+1,number)">
          <div class="grid-item">  {{ number }}</div>
          </nuxt-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchMeta } from '../utils/data';
import { getChapterLink } from '../utils/link';

export default {
  name: 'IndexPg',
  components: {
  },
  data() {
    return {
      books_meta : [],
    }
  },
  mounted () {
    this.fetchData();
  },
  // watch: {
  //   '$route.params': {
  //     immediate: false, 
  //     handler(params) {
  //       console.log(params);
  //       this.fetchData();
  //     }
  //   }
  // },
  methods: {
    linkTo(book,chapter)  {
      return getChapterLink(book,chapter)
      // return "/"
    },
    createNumberArray(n) {
      return Array.from({ length: n }, (_, i) => i + 1); // Create an array from 1 to n
    },
    async fetchData() {
      console.log("fd");
      try {
        const response = await fetchMeta(); 
        this.books_meta = await response.data.books;
        // this.books_meta = [ {len : 2}, {len:3} ]
        console.log("bm",this.books_meta);
      } catch (error) {
        console.error('XX Error fetching data:', error);
      }
    },
  }
}
</script>

<style scoped>
.page {
  width:100%;
}
/* .center-text { */
  /* text-align: center;  */
/* } */
    .card-elegant a{
      display:block !important;
    }

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px;
}
.grid-item {
  background-color: var(--background-secondary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.grid-item a {
  diplay:block;
}

</style >
<!-- pages/index.vue -->
<!-- <template> -->
<!--   <div> -->
<!--     <h1>Home Page</h1> -->
<!--     <nuxt-link to="/about">Go to About Page</nuxt-link> -->
<!--     <nuxt-link to="/contact">Go to Contact Page</nuxt-link> -->
<!--   </div> -->
<!-- </template> -->
<!--  -->
<!-- <script> -->
<!-- export default { -->
<!--   // name: 'HomePage', -->
<!-- } -->
<!-- </script> -->
