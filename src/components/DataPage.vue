<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="8">
              <div class="enclose headerbg">
                  <Header />
              </div>
              <div class="enclose sidebg">
                  <h4>Collection of Tickets</h4><br>
              </div>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import Header from './Header.vue'
/* import { fetchIssues } from './ThisMethods' */

export default {
    name: 'DataPage',
    components: {
        Header
    }
}
</script>

<style scoped>
.enclose {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 25px 25px;
}

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

h4 {
    text-align: center;
    font-family: sans-serif;
}
</style>