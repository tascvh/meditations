<template>
  <div class="page">
    <ChapterViewListCmp :chapter_list="items"/>
  </div>
</template>

<script>
import ChapterViewListCmp from '@/components/ChapterViewListCmp.vue'
import { fetchByTag } from '../utils/data';
// import { fbt } from '../utils/data';

export default {
  name: 'TagViewPg',
  components: {
    ChapterViewListCmp
  },
  data() {
    return {
      // chapter_list : [{book:1,chapter:1}],
      bc_list : [],
      tag_text : '',
      items : [],
    }
  },
  async created () {
        // Get the tag_text from route params
        this.tagText = this.$route.params.tag_text;

        // Fetch the items based on the tag
        this.items = await fetchByTag(this.tagText);
        this.items = this.items.data;
    console.log("items" , this.items)
  },
  async mounted () {
    console.log("mounted");
    // this.fetchData();
        this.tagText = this.$route.params.tag_text;

        // Fetch the items based on the tag
        this.items = await fetchByTag(this.tagText);
        this.items = this.items.data;
    console.log("items" , this.items)
  },
  // watch: {
  // //   // Watch for changes in the route parameters
  //   '$route.params': {
  //     immediate: true, // Run the handler immediately on component creation
  //     handler(tag_text) {
  //       // this.show_tags = false;
  //       console.log(tag_text);
  //       this.fetchData();
  //     }
  //   }
  // },
  // computed : {
  //   xxx () {
  //       const response = await fetchByTag(this.$route.params.tag_text); 
  //       return response.data;
  //   }
  // }
  methods: {
    // async fetchData() {
    //   console.log("tt",this.$route.params.tag_text); 
    //   try {
    //     // this.bc_list = fbt(this.$route.params.tag_text); 
    //     const response = await fetchByTag(this.$route.params.tag_text); 
    //     this.bc_list = response.data;
    //     // const data = await response.data;
    //     // console.log("xx",data);
    //     // this.chapter_list = data;
    //     console.log("xx",this.bc_list);
    //   } catch (error) {
    //     console.error('XX Error fetching data :',this.name, error);
    //   }
    // },
  },
  computed: {
    xbc_list() {
      // return [];
      // console.log(this.$route.params.tag_text); 
        // return fbt(this.$route.params.tag_text).data; 
        // const response = await fetchByTag(this.$route.params.tag_text); 
      // return response.data;
      return this.bc_list;
    }
  }
  // computed: {
  //   // chapter_list() {
  //     // return this.$route.params.chapter_list
  //   // },
  //   bc_list() {
  //     console.log(this.$route.params.tag_text);
  //     return [];
  //     // return this.$route.params.chapter_list.split(',').map(verse => {
  //     //   const [book, chapter] = verse.split('_')
  //     //   return { book, chapter}
  //     // })
  //   }
  // }
}
</script>
<style scoped>
.page {
  width:100%;
}
</style >
