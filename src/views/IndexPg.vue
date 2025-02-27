<template>
  <div class="page">
    <div class="center-text" v-for="(bmeta,index) in books_meta" :key="index">
        <h3>Book {{index+1}}</h3>
      <div class="grid-container">
        <div  v-for="number in createNumberArray(bmeta.len)" :key="number">
            <router-link :to="linkTo(index+1,number)">
          <div class="grid-item">  {{ number }}</div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchMeta } from '../utils/data';
import { getChapterLink } from '../utils/chapter';

export default {
  name: 'IndexPg',
  components: {
    // ChapterViewCmp
  },
  data() {
    return {
      books_meta : [],
    }
  },
  mounted () {
    this.fetchData();
  },
  watch: {
    '$route.params': {
      immediate: false, 
      handler(params) {
        console.log(params);
        this.fetchData();
      }
    }
  },
  methods: {
    linkTo(book,chapter)  {
      return getChapterLink(book,chapter)
    },
    createNumberArray(n) {
      return Array.from({ length: n }, (_, i) => i + 1); // Create an array from 1 to n
    },
    async fetchData() {
      console.log("fd");
      try {
        const response = await fetchMeta(); 
        this.books_meta = await response.data.books;
        console.log(this.books_meta);
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
.center-text {
  text-align: center; /* Center text within the block */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px;
}
.grid-item {
  background-color: var(--background-primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

</style >
