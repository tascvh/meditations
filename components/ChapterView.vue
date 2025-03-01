<template>
  <div class="card-elegant">
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

<script setup >
const props = defineProps({
  p_data: {
    type: Object,
    required: true, // This prop is required
  },
});
// export default {
//   // name: 'SectionViewCmp',
//   props: {
//     p_data: {
//       type: Object,
//       required: true
//     }
//   },
//   data() {
//     return {
//       loading: false,
//     };
//   },
// }
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
