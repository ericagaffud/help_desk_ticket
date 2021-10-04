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
                <p>These are your submitted data.</p>
                <h5>Email: <strong> {{ this.$store.state.email }} </strong></h5>
                <h5>Office: <strong> {{ this.$store.state.office }} </strong></h5>
                <h5>Name: <strong> {{ this.$store.state.name }} </strong></h5>
                <h5>Number: <strong> {{ this.$store.state.number }} </strong></h5>
                <h5>Problem Category </h5>
                <h5><span style="margin-left:15px"></span>Issue: </h5>
                <h5><span style="margin-left:15px"></span>Description: <strong> {{ this.$store.state.description }} </strong></h5>
                <h5><span style="margin-left:15px"></span>Picture: </h5>
            </div>
            <div>
                <b-row>
                    <b-col></b-col>
                    <b-col cols="11">
                        <br>
                        <b-button variant="primary" to="/">
                            Submit Another Response
                        </b-button>
                        <br><br>
                        <b-button variant="primary" to="/">
                            See All Data
                        </b-button>
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

<style>
.enclose {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 25px 25px;
}

.progress {
  background-color: gray;
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
    padding: 12px 16px;
}
</style>