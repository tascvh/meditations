<template>
  <div v-if="p_data" class="card-elegant">
    <h3>
      Book {{ p_data.book }} Chapter {{ p_data.chapter }}
      <!-- <button @click="toggle" class="header-button">{{ buttonText}}</button> -->
    </h3>
    <div class="verse-content">
      <!-- <div v-html="show_original"/> -->
      <div v-html="text_version"/>
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
const show_original = ref(false)

const text_version = computed( () => {


  // show_original.value?0:1 
  return props.p_data.versions[show_original.value==true?1:0].text

})

const toggle = () => {
  console.log("togg")
  show_original.value=!show_original.value
  console.log(show_original.value)
}

const buttonText = computed(() => {
  return !show_original.value ? 'Show Original' : 'Contemporary';
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

<style>
  .iisec {
    display: none !important ;
}
  .card-elegant a {
    display: none !important ;
}
</style>
<style scoped>

   .centered-div {
            background-color: #e74c3c;
            width: 100%;
            padding: 20px;
            color: white;
  }

  /* .card-elegant  { */
  /*   margin : 0px; */
  /* } */
/* .iisec { */
/* .verse-component { */
/*   padding: 15px; */
/*   margin: 10px 0; */
/*   border: 1px solid #eee; */
/*   border-radius: 4px; */
/* } */
</style>
