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

$crimson: #a11111;

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
  grid-gap: 40px;
  height: 100%;
  font-family: "Estrangelo Edessa", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  height: 100%;
  text-align: left;
}

li {
  list-style-type: none;
}

input,
output,
button,
select {
  background-color: transparent;
  font-family: inherit;
  font-size: $input-font-size;
}

// TODO visually distinguish between buttons, checkboxes, etc. At the moment they look identical.

input,
button,
select {
  border: 1px solid black;
}

input,
button {
  padding: 2px 4px;
}

button {
  &:active {
    background-color: $crimson;
    color: white;
  }
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
  $selected-colour: $crimson;

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

  // &:active, &:focus, //FIXME flickers a bit when you release a click
  &[selected],
  &[checked] {
    + label {
      //border: 1px solid $selected-colour;
      background-color: $selected-colour;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4); //XXX not certain about this
      color: white;
    }
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
