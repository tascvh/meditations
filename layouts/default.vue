<!-- layouts/default.vue -->
<template>
  <div class="app-container">
    <header class="app-content-header">
      <nav class="right-aligned">
        <!-- <nuxt-link to="/">Home</nuxt-link> -->
        <!-- <nuxt-link to="/tags">Tags</nuxt-link> -->
        <nuxt-link to="/collections">Collections</nuxt-link>
        <nuxt-link to="/">Index</nuxt-link>
      </nav>
    </header>
    <main class="app-content">
      <NuxtPage /> 
    </main>
    <footer>
      <p>© 2025</p>
    </footer>
  </div>


  <!-- <div class="app-container"> -->
  <!--   <div class="app-content-header"> -->
  <!--     <nav class="right-aligned"> -->
  <!--       <router-link to="/tags">Tags</router-link> -->
  <!--       <router-link to="/meditations/1-1,2-3,3-4">My Collections</router-link> -->
  <!--       <router-link to="/meditations/1-1,2-3,3-4">About</router-link> -->
  <!--       <router-link to="/index">Index</router-link> -->
  <!--     </nav> -->
  <!--   </div> -->
  <!--   <div class="app-content"> -->
  <!--     <router-view></router-view> -->
  <!--   </div> -->
  <!--   <div class="app-content-header"> -->
  <!--     Copytight (c) -->
  <!--   </div> -->
  <!--   &#60;&#33;&#45;&#45; <div class="app-content"> &#45;&#45;&#62; -->
  <!--   &#60;&#33;&#45;&#45; </div> &#45;&#45;&#62; -->
  <!-- </div> -->


</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
@import '../styles/dark.css'; 
/* Add your styles here */

.app-container {
  display: flex; /* Use Flexbox for layout */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  width: 100%; /* Full width of the parent */
  height: 100vh; /* Full height of the viewport (optional) */
  padding: 20px; 
  box-sizing: border-box; /* Include padding in width calculation */
  margin : 0;
  /* background:red; */
}

.app-content-header {
  width: 100%; /* Full width on small screens */
  max-width: 1200px; /* Optional: maximum width for larger screens */
  /* padding: 20px;  */
  box-sizing: border-box; /* Include padding in width calculation */
  margin-bottom: 20px; /* Space between divs */
  /* background-color: #f0f0f0;  */
  /* border: 1px solid #ccc;  */
}

.app-content {
  width: 100%; 
  /* display: flex;  */
  /* flex: 1;  */
  /* justify-content: center;  */
  /* align-items: center;  */
  /* background-color: #f0f0f0;  */
  /* max-width: 1200px;  */
  padding: 0px; 
  box-sizing: border-box; /* Include padding in width calculation */
  margin-bottom: 20px; /* Space between divs */
  /* background-color: #f0f0f0;  */
  /* border: 1px solid #ccc;  */
}

/* Media query for large screens */
@media (min-width: 768px) {
  .app-content-header {
    width: 50%; /* Occupy 50% of the space on large screens */
  }
}
@media (min-width: 768px) {
  .app-content {
    width: 50%; /* Occupy 50% of the space on large screens */
  }
}


.right-aligned {
    display: flex; /* Use flexbox for alignment */
    justify-content: flex-end; /* Align items to the right */
    align-items: center; /* Align items vertically centered */
}

.right-aligned > * {
    margin-left: 20px; /* Set horizontal margin between items */
}

.right-aligned > *:first-child {
    margin-left: 0; /* Remove margin from the first item */
  }
</style>
