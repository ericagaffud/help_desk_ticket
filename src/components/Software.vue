<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
            <Header /> 
            </div>
            <form @submit.prevent="onSoftwareSelect(softwareSub)" ref="myForm">
                <div class="enclose sidebg">
                    <b-form-group v-slot="{ ariaDescribedby }" >
                        <label> <strong> Software </strong></label><br>
                        <p class="plabel"> <span style="color:red">*</span> Choose multiple option if necessary </p>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Operating System" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Operating System </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Microsoft Office" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Microsoft Office </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Anti-Virus" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Anti-Virus </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Software Installation" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Software installation </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Upgrade OS or Software" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Upgrade OS or Software </b-form-radio><br>
                        <b-form-radio @change="enableInputOthers()" type="button" :aria-describedby="ariaDescribedby" v-model="softwareSub" name="some-radios" value="Others" v-model.trim="$v.softwareSub.$model" :class="{'is-invalid': validationStatus($v.softwareSub)}"> <span style="margin-left:10px"></span> Others: </b-form-radio>
                        <b-input id="inputOthers" name="inputOthers" ref="inputOthers" type="text"></b-input>
                        <div v-if="!$v.softwareSub.required" class="invalid-feedback"> Please choose one </div>
                    </b-form-group>
                </div>
                <b-row>
                    <b-col cols="4">
                        <b-nav pills fill>
                            <b-button variant="danger" @click="$router.go(-1)" active class="drivebutton"> Back </b-button>
                            <b-nav-item disabled></b-nav-item>
                            <b-button variant="danger" type="submit" active class="drivebutton"> Next </b-button>
                        </b-nav>
                    </b-col>
                    <b-col cols="3">
                        <b-progress height="10px" variant="danger" :value="value" class="mb-3 mt-3"></b-progress>
                    </b-col>
                    <b-col cols="2" class="mt-2"> <span style="font-size:small">Page 2 of 3</span> </b-col>
                    <b-col cols="3"> 
                        <b-button @click="clearForm" variant="outline-danger"> Clear Form  </b-button>
                    </b-col>
                </b-row>
            </form>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import Header from './Header.vue'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Software',
    components: {
        Header
    },
    data: function() {
        return {
            value: 66.66,
            softwareSub: '',
            disabledInput: true,
            selected: '',
            inputOthers: ''
        }
    },
    validations:{
        softwareSub: { required }
    },
    mounted: function() {
        this.store()
    },
    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        onSoftwareSelect(softwareSub) {
            if(softwareSub) {
                this.$store.commit('softwareStore', {softwareSub: this.softwareSub})
                setTimeout( () => this.$router.push({ path: '/subpage'}), 1000) 
            }
            console.log('No data')

            this.$v.$touch()
            if (this.$v.$pendding || this.$v.$error) return
            this.$v.$reset()
        },
        store() {
            this.softwareSub = this.$store.state.softwareSub
        },
        clearForm(){
            alert('Clear Form')
            this.$refs.myForm.reset()
        },
        enableInputOthers: function() {
            this.$refs.inputOthers.focus();
            console.log('Focus on me')
        }
 /*       enableInputOthers() {
            setTimeout(function() {
                this.$refs.inputOthers.focus()
                console.log(this.$refs.inputOthers, 'Focus')
            }, 100)
        }
         enableInputOthers() {
            if(this.softwareSub == 'Others') {
                this.disabledInput.disabled = false
            }
        } */
        
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

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

.drivebutton {
  width: 40%;
}
</style>