<template> 

  <div v-if="isChapterView">
    <div class="card">
      <div class="add-collection-form">
        <input v-model="inputValue" type="text" class="add-collection-input" placeholder="New collection name...">
        <button @click="addString" class="add-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add
        </button>
      </div>

      <!-- Standalone Collections View -->
      <div v-if="isChapterView" class="collections-container">

        <div class="collections-row" v-for="(item, index) in collectionNames" :key="index">
          <!-- <div class="collections-row"> -->
          <!-- Collection 1 -->
          <div class="collection-card">
            <div class="flex items-center justify-between mb-2">
              <h4>{{item}}</h4>
              <!-- <span class="badge badge-primary">{{numChaptersInCollection(item)}}</span> -->
            </div>

            <div v-if="numChaptersInCollection(item)">
              <span class="item-count">{{numChaptersInCollection(item)}} Chapter(s)</span>

              <nuxt-link :to="linkTo(item)">
                <span href="#" class="collection-link">
                  View collection
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </nuxt-link>
            </div>
            <div v-else>
              <span class="item-count">Empty</span>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>

      <div class="card">
        <h3>
          Collections

        <div class="add-collection-form">
          <input v-model="inputValue" type="text" class="add-collection-input" placeholder="New collection name...">
          <button @click="addString" class="add-collection-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add
          </button>
        </div>
          </h3>
        <div>
          <div v-for="(item, index) in collectionNames" :key="index" 
               :class="['collection-pill', { active : collectionHasChapter(item) }]" 
               @click='toggleChapter(item)'
               >
               <span>{{item}}</span>
               <div v-if='!collectionHasChapter(item)' class="add-button">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                   <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                 </svg>
               </div>
               <div v-else class="remove-button">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                   <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                 </svg>
               </div>
          <!-- </div> -->
        </div>



        <!-- <div class="mt-6"> -->
        <!--   <a href="#" class="collection-link"> -->
        <!--     Manage collections -->
        <!--     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> -->
        <!--       <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /> -->
        <!--     </svg> -->
        <!--   </a> -->
        <!-- </div> -->
      </div>
      </div>
    </div>
    <div >
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


const isChapterView = computed( () => props.chapterLoc == null )

const linkTo = (coll) => {
  var l = getChapterListLink(JSON.parse(localStorage.getItem(coll)) || []);
  l += "?coll=" + coll
  return l;
  // return "/collections/" + coll
}

const book = computed( () => props.chapterLoc.book )
const chapter = computed(() =>  props.chapterLoc.chapter )
// Function to add a string to the list
const addString = () => {
  const trimmedValue = inputValue.value.trim();

  if (trimmedValue === '') {
    return
  } 

  if( collectionNames.value.includes(trimmedValue)) {
    toggleChapter(trimmedValue);
    inputValue.value = ''
    return; 
  }

  collectionNames.value.push(trimmedValue);
  saveToLocalStorage();
  toggleChapter(trimmedValue);
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

const toggleChapter = (coll) => {
  if (!props.chapterLoc) return;

  if (collectionHasChapter(coll)) {
    removeChapterLoc(coll)
  }
  else {
    addChapterLoc(coll)
  }
}

const numChaptersInCollection = (coll) => {
  const storedChapters = JSON.parse(localStorage.getItem(coll)) || [];
  return storedChapters.length;
}

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

/* Add collection form */
.add-collection-form {
  display: flex;
  gap: 0.5rem;
  margin-top: var(--spacing-medium);
  margin-bottom: var(--spacing-medium);
  max-width: 400px;
}

.add-collection-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.875rem;
}

.add-collection-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.add-collection-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: #000000;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-collection-button:hover {
  background-color: var(--primary-hover);
}

.add-collection-button svg {
  width: 14px;
  height: 14px;
  margin-right: 0.25rem;
}

/* Collections component */
.collections-container {
  margin-bottom: var(--spacing-large);
}

.collections-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-medium);
  margin-bottom: var(--spacing-medium);
}

.collection-card {
  background-color: var(--background-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  padding: var(--spacing-medium);
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  position: relative;
  transition: all 0.2s ease;
}

.collection-card:hover {
  /* transform: translateY(-3px); */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.collection-card h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.collection-card .item-count {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.collection-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
}

.collection-link:hover {
  text-decoration: underline;
}

.collection-link svg {
  margin-left: 0.25rem;
  width: 14px;
  height: 14px;
}

/* Collections shown under item */
.collections-under-item {
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-medium);
  margin-top: var(--spacing-large);
}

.collections-under-item h3 {
  margin-bottom: var(--spacing-medium);
  font-size: 1.2rem;
}

.collection-pill {
  display: inline-flex;
  align-items: center;
  background-color: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 0.35rem 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  cursor : pointer;
}

.collection-pill.active {
  border-color: var(--primary-color);
  background-color: rgba(16, 185, 129, 0.1);
}

.collection-pill .add-button,
.collection-pill .remove-button {
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.collection-pill .remove-button {
  color: var(--primary-color);
}

.collection-pill:hover .add-button {
  color: var(--primary-color);
}

.collection-pill:hover .remove-button {
  color: #ef4444;
}


/* Utility classes */
.text-center { text-align: center; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.text-secondary { color: var(--text-secondary); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }

.parent {
  /* background:red; */
  display: flex;  
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
  /* justify-content: flex-center;  */
  /* width: 100%;          */
}

</style>

