<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
            <Header /> 
            </div>
            <form @submit.prevent="onHardwareSelect(hardwareSub)" ref="myForm">
                <div class="enclose sidebg">
                    <b-form-group v-slot="{ ariaDescribedby }">
                        <label> Hardware </label><br>
                        <p class="plabel"> <span style="color:red">*</span> Choose multiple option if necessary </p>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Laptop" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Laptop </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Keyboard" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Keyboard </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Monitor" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Monitor </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Mouse" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Mouse </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Printer" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Printer </b-form-radio><br>
                        <b-form-radio @change="enableInputOthers()" :aria-describedby="ariaDescribedby" v-model="hardwareSub" name="some-radios" value="Others" v-model.trim="$v.hardwareSub.$model" :class="{'is-invalid': validationStatus($v.hardwareSub)}"> <span style="margin-left:10px"></span> Others: </b-form-radio>
                        <b-input id="inputOthers" name="inputOthers" ref="inputOthers" type="text"></b-input>
                        <div v-if="!$v.hardwareSub.required" class="invalid-feedback"> Please choose one</div>
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
    name: 'Hardware',
    components: {
        Header
    },
    data() {
        return {
            value: 66.66,
            hardwareSub:''
        }
    },
    validations: {
        hardwareSub: { required }
    },
    mounted:function() {
        this.store()
    },
    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        onHardwareSelect(hardwareSub) {
            if(hardwareSub) {
                this.$store.commit('hardwareStore', {hardwareSub: this.hardwareSub})
                setTimeout( () => this.$router.push({ path: '/subpage'}), 1000) 
            }
            console.log('No data')
            this.$v.$touch()
            if (this.$v.$pendding || this.$v.$error) return
            this.$v.$reset()
        },
        store() {
            this.hardwareSub = this.$store.state.hardwareSub
        },
        clearForm(){
            alert('Clear Form')
            this.$refs.myForm.reset()
        },
        enableInputOthers: function() {
            this.$refs.inputOthers.focus();
            console.log('Focus on me')
        }
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