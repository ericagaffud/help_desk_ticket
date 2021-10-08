<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
                <Header />
            </div>
            <div class="enclose sidebg">
                <h4>Your response was being submitted.</h4>
                <p>These are your submitted data.</p><br>
                <b-row>
                    <b-col>
                        <h6> Email: </h6>
                        <h6> Office: </h6>
                        <h6> Name: </h6>
                        <h6> Phone Number: </h6>
                        <h6> Problem Category </h6>
                        <h6><span style="margin-left:20px"></span> Issue:</h6>
                        <h6><span style="margin-left:20px"></span> Description:</h6>
                        <h6><span style="margin-left:20px"></span> Picture:</h6>
                    </b-col>
                    <b-col cols="8">
                        <input disabled type="text" :value="this.$store.state.email"><br>
                        <input disabled type="text" :value="this.$store.state.office"><br>
                        <input disabled type="text" :value="this.$store.state.client"><br>
                        <input disabled type="text" :value="this.$store.state.number"><br>
                        <br><br>
                        <input disabled type="text" :value="this.$store.state.softwareSub || this.$store.state.hardwareSub || this.$store.state.connectivitySub"><br>
                        <input disabled type="text" :value="this.$store.state.description"><br>
                        <input disabled type="text" :value="this.$store.statepicture">
                    </b-col>
                </b-row>
            </div>
            <div>
                <b-row>
                    <b-col></b-col>
                    <b-col cols="11">
                        <br>
                        <b-button variant="danger" to="/">
                            Submit Another Response
                        </b-button>
                        <br><br>
                        <b-button variant="danger" to="/data">
                            See All Data
                        </b-button>
                        <br><br><br>
                    </b-col>
                    <b-col></b-col>
                </b-row>
            </div>
          </b-col>
          <b-col></b-col>
      </b-row>
      
  </b-container>
</template>

<script>
import Header from './Header.vue'

export default {
    name: 'FinalPage',
    components: {
        Header
    },
    methods: {
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

.btn {
    align-items: center;
    width: 100%;
}

input {
    margin: 6px;
    width: 90%;
    cursor: text;
}

h6 {
    margin-bottom: 25px;
}

</style>