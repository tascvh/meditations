<template> 

  <div>
    <ul>
      <li v-for="(item, index) in stringList" :key="index">
        
        <nuxt-link :to="linkTo(item)">{{ item }} (5)</nuxt-link>
        <span v-if="chapterLoc">
          <span v-if="collectionHasChapter(item )"> 
            <button @click="removeChapterLoc(item)">Remove</button>
          </span>
          <span v-else>
            <button @click="addChapterLoc(item)">Add</button>
          </span>
        </span>
      </li>
    </ul>

    <div>
      <input v-model="inputValue" placeholder="Type a string..." />
      <button @click="addString">Add</button>
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
const stringList = ref([]);

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

  // Check if the input is empty or already exists in the list
  if (trimmedValue === '' || stringList.value.includes(trimmedValue)) {
    return; // Do nothing if the input is empty or already exists
  }

  // Add the new string to the list
  stringList.value.push(trimmedValue);

  // Save the updated list to local storage
  saveToLocalStorage();

  // Clear the input field
  inputValue.value = '';
};

// Function to save the list to local storage
const saveToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('stringList', JSON.stringify(stringList.value));
  }
};

// Function to load the list from local storage
const loadFromLocalStorage = () => {
  if (process.client) {
    const storedList = localStorage.getItem('stringList');
    stringList.value = storedList ? JSON.parse(storedList) : [];
  }
};

// Function to check if chapter_loc exists in local storage for a given item
const collectionHasChapter = (coll) => {
  console.log(coll, "has chapter", book.value , chapter.value)
  const storedChapters = JSON.parse(localStorage.getItem(coll)) || [];
  return storedChapters.some(item => 
    item.book == book.value && item.chapter == chapter.value
  );
};

const isChapterLocExists = (item) => {
  if (!props.chapterLoc) return false;

  const storedChapters = JSON.parse(localStorage.getItem(item)) || [];
  return storedChapters.some(chapter => 
    chapter.book === props.chapterLoc.book && chapter.chapter === props.chapterLoc.chapter
  );
};

// Function to add chapter_loc to local storage
const addChapterLoc = (item) => {
  if (!props.chapterLoc) return;

  const storedChapters = JSON.parse(localStorage.getItem(item)) || [];
  storedChapters.push(props.chapterLoc);
  localStorage.setItem(item, JSON.stringify(storedChapters));

  // Force reactivity by updating the list
  stringList.value = [...stringList.value]; // Trigger reactivity
};

// Function to remove chapter_loc from local storage
const removeChapterLoc = (item) => {
  if (!props.chapterLoc) return;

  let storedChapters = JSON.parse(localStorage.getItem(item)) || [];
  storedChapters = storedChapters.filter(chapter => 
    !(chapter.book === props.chapterLoc.book && chapter.chapter === props.chapterLoc.chapter)
  );
  localStorage.setItem(item, JSON.stringify(storedChapters));

  // Force reactivity by updating the list
  stringList.value = [...stringList.value]; // Trigger reactivity
};
</script>

<style scoped>
h1 {
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
input {
  margin-right: 5px;
}
button {
  margin-left: 10px;
}
</style>

