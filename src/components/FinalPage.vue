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
                <h6>Email:</h6>
                <h6>Office:</h6>
                <h6>Name:</h6>
                <h6>Number:</h6>
                <h6>Problem Category:</h6>
                <h6><span style="margin-left:15px"></span>Issue:</h6>
                <h6><span style="margin-left:15px"></span>Description:</h6>
                <h6><span style="margin-left:15px"></span>Picute:</h6>
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
import { myIssue } from './ThisMethods'

export default {
    name: 'FinalPage',
    components: {
        Header
    },
    methods: {
        async issue() {
            const newIssue = {
                id: Math.floor(Math.random() * 100000),
                email: this.email,
                office: this.office,
                client: this.client,
                number: this.number,
                selectProblem: this.selectProblem
            }
            const issue = await myIssue(newIssue)
            console.log(issue)
        },
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