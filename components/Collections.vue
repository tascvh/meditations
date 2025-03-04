<template> 

  <div >
    <div v-for="(item, index) in collectionNames" :key="index">
              <div v-if="chapterLoc">
                <span v-if="collectionHasChapter(item )" class="badge badge-primary">Added</span>
              </div>
        <span v-if="chapterLoc">
          <span v-if="collectionHasChapter(item )"> 
            <button class="button button-secondary" @click="removeChapterLoc(item)">-</button>
          </span>
          <span v-else>
            <button class="button button-secondary" @click="addChapterLoc(item)">+</button>
          </span>
        </span>
      <nuxt-link :to="linkTo(item)"> <span class="bordered-link">{{item}}</span> </nuxt-link>
    </div>

    <ul>
      <!-- <li v-for="(item, index) in collectionNames" :key="index"> -->
      <!--    -->
      <!--   &#60;&#33;&#45;&#45; <nuxt-link :to="linkTo(item)">{{ item }} (5)</nuxt-link> &#45;&#45;&#62; -->
      <!--   <span v-if="chapterLoc"> -->
      <!--     <span v-if="collectionHasChapter(item )">  -->
      <!--       Already in collection  -->
      <!--       <button @click="removeChapterLoc(item)">Remove</button> -->
      <!--     </span> -->
      <!--     <span v-else> -->
      <!--       <button @click="addChapterLoc(item)">Add</button> -->
      <!--     </span> -->
      <!--   </span> -->
      <!-- </li> -->
    </ul>

    <div class="xx"  v-if="inputValue.length">
      <input class="input" v-model="inputValue" placeholder="Type a string..." />
      <button class="button button-primary" @click="addString">Add</button>
    </div>
    <div v-else>
      <span class="bordered-link" @click="inputValue='new-collection'">Add new collection </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  chapterLoc: {
    type: Object,
    default: null
  }
});

const inputValue = ref('');
const collectionNames = ref([]);

// Load the list from local storage when the component is mounted
onMounted(() => {
  loadFromLocalStorage();
});


const linkTo = (coll) => {
  return "/collections/" + coll
}

const book = computed( () => props.chapterLoc.book )
const chapter = computed(() =>  props.chapterLoc.chapter )
// Function to add a string to the list
const addString = () => {
  const trimmedValue = inputValue.value.trim();

  if (trimmedValue === '' || collectionNames.value.includes(trimmedValue)) {
    inputValue.value = ''
    return; 
  }

  collectionNames.value.push(trimmedValue);
  saveToLocalStorage();
  inputValue.value = '';
};

// Function to save the list to local storage
const saveToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('collectionNames', JSON.stringify(collectionNames.value));
  }
};

// Function to load the list from local storage
const loadFromLocalStorage = () => {
  if (process.client) {
    const storedList = localStorage.getItem('collectionNames');
    collectionNames.value = storedList ? JSON.parse(storedList) : [];
  }

  // storedList.forEach( (coll) => {
  //
  // })
};

// Function to check if chapter_loc exists in local storage for a given item
const collectionHasChapter = (coll) => {
  console.log(coll, "has chapter", book.value , chapter.value)
  const storedChapters = JSON.parse(localStorage.getItem(coll)) || [];
  return storedChapters.some(item => 
    item.book == book.value && item.chapter == chapter.value
  );
};


const addChapterLoc = (item) => {
  if (!props.chapterLoc) return;

  const storedChapters = JSON.parse(localStorage.getItem(item)) || [];
  storedChapters.push(props.chapterLoc);
  localStorage.setItem(item, JSON.stringify(storedChapters));

  // Force reactivity by updating the list
  collectionNames.value = [...collectionNames.value]; // Trigger reactivity
};

const removeChapterLoc = (item) => {
  if (!props.chapterLoc) return;

  let storedChapters = JSON.parse(localStorage.getItem(item)) || [];
  storedChapters = storedChapters.filter(chapter => 
    !(chapter.book === props.chapterLoc.book && chapter.chapter === props.chapterLoc.chapter)
  );
  localStorage.setItem(item, JSON.stringify(storedChapters));

  // Force reactivity by updating the list
  collectionNames.value = [...collectionNames.value]; // Trigger reactivity
};
</script>

<style scoped>

.xx {
  display:flex;
}
/* h1 { */
/*   margin-bottom: 10px; */
/* } */
/* ul { */
/*   list-style-type: none; */
/*   padding: 0; */
/* } */
/* li { */
/*   margin: 5px 0; */
/* } */
/* input { */
/*   margin-right: 5px; */
/* } */
/* button { */
/*   margin-left: 10px; */
/* } */
</style>

