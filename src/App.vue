<template>
  <div id="app">
    <header>
      <h1>5e Monster Builder</h1>
      
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
$base-font-size: 16px;
$line-height: 1.2;

* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  font-size: $base-font-size;
  line-height: $line-height;
}

body {
  box-sizing: border-box;
  padding: 30px;
  height: 100%;
}

p,
dl {
  margin: 0.5em 0;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  font-family: "Estrangelo Edessa", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: left;
  margin-top: 40px;
}

li {
  list-style-type: none;
}

input {
  padding: 2px 4px;
}
select {
  // select seems to have about 2px of side padding built in already
  padding: 2px;
}

input[type="radio"] {
  display: none;

  + label {
    box-sizing: border-box;
    margin: 1px;
    padding: 5px;
    background-color: lightgrey;
    text-align: center;
  }
  &[selected] + label {
    background-color: crimson;
    color: white;
  }
}

.form-control {
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  vertical-align: text-bottom;
  margin: 5px 10px 5px 0;
}

.form-group {
  margin: 0 0 1em;
}
</style>
