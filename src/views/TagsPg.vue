<template>
  <div class="page">
    <TagLinkCmp :tags="all_tags" />
  </div>
</template>

<script>
import { fetchTags } from '../utils/data';
import TagLinkCmp from '@/components//TagLinkCmp.vue';

export default {
  name: 'TagsPg',
  components: {
    TagLinkCmp
  },
  data() {
    return {
      all_tags : [],
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
    async fetchData() {
      console.log("fd");
      try {
        {
          const response = await fetchTags(); 
          const data = await response.data;
          if(data.length) {
            this.all_tags = data;
          }
        }
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

.next-prev {
}
.center-text {
  text-align: center; /* Center text within the block */
  display:flex;
    flex-direction: row; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
    width: 100%; /* Full width */
}
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
}

/* .bordered-link:hover { */
/*     background-color: var(--border-color);  */
/*     color: white;  */
/*   } */

/* .link-button { */
  /* border */
/* } */
</style>
