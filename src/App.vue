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
$input-font-size: 0.9rem; //14px;
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

input,
output,
button,
select {
  font-size: $input-font-size;
}

input,
button {
  padding: 2px 4px;
}
select {
  // select seems to have about 2px of side padding built in already
  padding: 2px;
}

fieldset {
  margin: 0 0 1em;
  border: none;
}
legend {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="radio"],
input[type="checkbox"] {
  display: none;

  $base-colour: black;
  $selected-colour: crimson;

  + label {
    box-sizing: border-box;
    margin: 1px;
    padding: 2px 4px;
    border: 1px solid $base-colour;
    //background-color: $base-colour;
    color: $base-colour;
    text-align: center;
    font-size: $input-font-size;

    ul & {
      padding: 5px;
    }
  }
  &[selected] + label,
  &[checked] + label {
    border: 1px solid $selected-colour;
    background-color: $selected-colour;
    color: white;
  }
}

.form-control {
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  vertical-align: text-bottom;
}
fieldset > .form-control {
  margin: 5px 10px 5px 0;
}
</style>
