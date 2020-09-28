<template>
  <div class="hello">
    <pre style="word-wrap: break-word; white-space: pre-wrap;">

     _                  ____  _             
    | |_   _ _ __   ___| __ )| | ___   __ _ 
 _  | | | | | '_ \ / _ \  _ \| |/ _ \ / _` |
| |_| | |_| | | | |  __/ |_) | | (_) | (_| |
 \___/ \__,_|_| |_|\___|____/|_|\___/ \__, |
                                      |___/</pre>

  
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
