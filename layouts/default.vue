<!-- layouts/default.vue -->
<template>
  <div>
    <header>
      <h1>My Nuxt App</h1>
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt-link to="/contact">Contact</nuxt-link>
      </nav>
    </header>
    <main>
      <NuxtPage /> 
    </main>
    <footer>
      <p>© 2023 My Nuxt App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
/* Add your styles here */
</style>
