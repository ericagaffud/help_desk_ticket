<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
            <Header /> 
            </div>
            <form @submit.prevent="onConnectSelect(connectivitySub)">
                <div class="enclose sidebg">
                    <b-form-group v-slot="{ ariaDescribedby }" v-model="connectivitySub">
                        <label> Connectivity </label><br>
                        <p class="plabel"> <span style="color:red">*</span> Choose multiple option if necessary </p>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="connectivitySub" name="some-radios" value="A" v-model.trim="$v.connectivitySub.$model" :class="{'is-invalid': validationStatus($v.connectivitySub)}"> <span style="margin-left:10px"></span> No Internet Connection </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="connectivitySub" name="some-radios" value="B" v-model.trim="$v.connectivitySub.$model" :class="{'is-invalid': validationStatus($v.connectivitySub)}"> <span style="margin-left:10px"></span> Forgot WiFi Password </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="connectivitySub" name="some-radios" value="C" v-model.trim="$v.connectivitySub.$model" :class="{'is-invalid': validationStatus($v.connectivitySub)}"> <span style="margin-left:10px"></span> Unstable Internet Connectivity </b-form-radio>
                        <b-input id="other" name="other"></b-input>
                        <div v-if="!$v.connectivitySub.required" class="invalid-feedback"> Please choose one</div>
                    </b-form-group>
                </div>
                <div>
                    <b-row>
                        <b-col cols="4">
                            <b-nav pills fill>
                                <b-button variant="primary" @click="$router.go(-1)" active> Back </b-button>
                                <b-nav-item disabled></b-nav-item>
                                <b-button variant="primary" type="submit" active> Next </b-button>
                            </b-nav>
                            <b-nav>
                                
                            </b-nav>
                        </b-col>
                        <b-col>
                            <b-progress height="10px" :value="value" class="mb-3 mt-3"></b-progress>
                        </b-col>
                        <b-col class="mt-2"> Page 2 of 4</b-col>
                        <b-col class="mt-2"> <p>Clear Form</p> </b-col>
                    </b-row>
                </div>
            </form>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import Header from './Header.vue'
import { required } from 'vuelidate/lib/validators'
/* import {  myIssue } from './ThisMethods' */

export default {
    name: 'Connectivity',
    components: {
        Header
    },
    data() {
        return {
            value: 50,
            connectivitySub:''
        }
    },
    validations: {
        connectivitySub: { required }
    },
    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        onConnectSelect(connectivitySub) {
            if(connectivitySub) {
                this.$store.commit('connectivityStore', {connectivitySub: this.connectivitySub}) 
                this.$router.push({ path: '/subpage'})
            }
            console.log('No data')
            this.$v.$touch()
            if (this.$v.$pendding || this.$v.$error) return
            this.$v.$reset()
            
            this.issue()
        },

/*         async issue() {
            const newIssue = {
                id: Math.floor(Math.random() * 100000),
                connectivitySub: this.connectivitySub,
            }
            const issue = await myIssue(newIssue)
            console.log(issue)
        }, */
    },
}
</script>

<style scoped>
.enclose {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 25px 25px;
}

.plabel {
  font-size: small;
}

.progress {
  background-color: gray;
}

.row {
  margin: 10px;
}

input {
    width: 50%;
    outline: 0;
    border-width: 0 0 2px;
    border-color: gainsboro;
}

.form-radio {
    padding-left: 20px;
}

.headerbg {
    border: solid pink;
    border-width: 15px 0 0;
}

.sidebg {
    border:1px solid pink;
}

button {
  width: 40%;
}
</style>