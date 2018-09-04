<template>
  <div id="app">
    <header>
      <h1>5e Monster Builder</h1> <!--XXX this takes up a lot of space, maybe make smaller -->
      
      <nav><!--fill in--></nav>
    </header>
    
     <!--suppress CheckEmptyScriptTag, HtmlUnknownTag -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "styles/index.scss"; // this is the only place this file should be imported
</style>
