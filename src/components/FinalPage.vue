<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="7">
            <div class="enclose headerbg">
                <Header />
            </div>
            <div class="enclose sidebg">
                <h4>Your response has been submitted.</h4>
                <p>These are your submitted data.</p><br>
                <b-row>
                    <b-col>
                        <h6> Email: </h6>
                        <h6> Office: </h6>
                        <h6> Name: </h6>
                        <h6> Phone Number: </h6>
                        <h6> Problem Category </h6>
                        <h6><span style="margin-left:20px"></span> Subject:</h6>
                        <h6><span style="margin-left:20px"></span> Issue:</h6>
                        <h6><span style="margin-left:20px"></span> Description:</h6><br>
                        <h6><span style="margin-left:20px"></span> Picture:</h6>
                    </b-col>
                    <b-col cols="9">
                        <input disabled type="text" :value="this.$store.state.email"><br>
                        <input disabled type="text" :value="this.$store.state.office"><br>
                        <input disabled type="text" :value="this.$store.state.client"><br>
                        <input disabled type="text" :value="this.$store.state.phone"><br>
                        <br><br>
                        <input disabled type="text" :value="this.$store.state.selectProblem">
                        <input disabled type="text" :value="this.$store.state.softwareSub || this.$store.state.hardwareSub || this.$store.state.connectivitySub"><br>
                        <b-form-textarea plaintext disabled :value="this.$store.state.description"></b-form-textarea><br>
                        <input disabled type="text" :value="this.$store.state.picture">
                    </b-col>
                </b-row>
            </div>
            <div>
                <b-row>
                    <b-col></b-col>
                    <b-col cols="11">
                        <br>
                        <b-button variant="danger" to="/" @click="reloadPage">
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
        reloadPage() {
            window.location.reload();
        }
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
    width: 95%;
    cursor: text;
    background-color: rgba(255, 192, 203, 0.253);
    border:1px solid pink;
}

textarea {
    width: 95%;
    cursor: text;
    margin: 5px;
    background-color: rgba(255, 192, 203, 0.253);
    border:1px solid pink;
}

h6 {
    margin-bottom: 25px;
}

</style>