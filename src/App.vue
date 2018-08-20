<template>
  <div id="app">
    <header>
      <h1>5e Monster Builder</h1> <!--XXX this takes up a lot of space, -->
      
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

$spacing: 30px;
$header-height: 2rem * $line-height; // need to have this set so <main> can have a well-defined height

$crimson: #a11111;

// TODO make more SASSy and SOCSSy

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
  height: 100%;
  padding: 0;
}

p,
dl {
  margin: 0.5em 0;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: $spacing;
  box-sizing: border-box;
  height: 100vh;
  padding: $spacing;
  font-family: "Estrangelo Edessa", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  display: grid;
  grid-gap: $spacing;
  height: calc(
    100vh - #{$header-height} - #{$spacing * 3}
  ); // This is key for keeping the layout all on one page
  text-align: left;

  // additional styles on this in Builder.vue
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

select {
  // select seems to have about 2px of side padding built in already
  padding: 2px;
}

button {
  &:active {
    background-color: $crimson;
    color: white;
  }
}

:invalid {
  border-color: red; // FIXME make it better
}

%focus {
  //box-shadow: 0 0 2px 2px $crimson;
  //outline: none; //2px solid blue;
  outline: $crimson auto 5px; // XXX could maybe be made better?
}

:focus {
  @extend %focus;
}

fieldset {
  margin: 0 0 1em;
  border: none;
}
legend {
  font-weight: bold;
  margin-bottom: 5px;
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

h1 {
  height: $header-height;
}
</style>
