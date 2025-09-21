<template>
  <div id="app">
    <nav style="display:flex; gap:12px; padding:12px;">
      <router-link to="/">Home</router-link>
      <router-link to="/levels">Levels</router-link>
      <router-link to="/admin">Admin</router-link>
    </nav>
    <router-view/>
  </div>
</template>