<template>
    <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
              <div class="enclose headerbg">
                <Header />
              </div>
              <form @submit.prevent="issue()" ref="myForm" autocomplete="off">
                <div class="enclose sidebg">
                    <b-form-group
                    id="email"
                    label-for="email"
                    >
                      <label> Email <span style="color:red">*</span> </label>
                      <p class="plabel">Please enter a valid email</p>
                      <b-form-input id="email" name="email" v-model="email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}"></b-form-input>
                      <div v-if="!$v.email.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>
                </div>

                <div class="enclose sidebg">
                    <b-form-group 
                    id="office"
                    label-for="office">
                    <label> Office <span style="color:red">*</span> </label><br><br>
                    <b-form-select
                        id="office"
                        name="office"
                        class="w-75 p-2"
                        v-model="office"
                        v-model.trim="$v.office.$model"
                        :class="{'is-invalid': validationStatus($v.office)}">
                        <option value=""> Select Office </option>
                        <option :value="office.name" :key="office.name" v-for="office in offices"> {{ office.name }} </option>
                    </b-form-select>
                    <div v-if="!$v.office.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group><br>
                </div>

                <div class="enclose sidebg">
                    <b-form-group
                    id="client"
                    label-for="client"
                    >
                    <label> Client Name <span style="color:red">*</span> </label>
                    <b-form-input id="client" name="client" v-model="client" v-model.trim="$v.client.$model" :class="{'is-invalid': validationStatus($v.client)}"></b-form-input>
                    <div v-if="!$v.client.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>      
                </div>

<!--                 <div class="enclose sidebg">
                    <b-form-group
                    id="number"
                    description="Please enter a valid number"
                    label-for="number"
                    >
                    <label> Phone Number <span style="color:red">*</span> </label>
                    <b-input id="number" name="number" v-model="number" v-model.trim="$v.number.$model" :class="{'is-invalid': validationStatus($v.number)}"></b-input>
                    <div v-if="!$v.number.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>
                </div> -->

                <div class="enclose sidebg">
                  <label> Phone Number <span style="color:red">*</span> </label>
                  <p class="plabel">Please enter a valid number</p>
                  <input type="text" maxlength="11" v-model="phone" @keypress="acceptNumber($event)">
                  
                  <p v-if="errors.length">
                    <span v-for="error in errors" :key="error in errors" class="phoneinvalid"> {{error}} </span>
                  </p> 
                </div>

                <div class="enclose sidebg">
                    <b-form-radio-group v-slot="{ ariaDescribedby }" v-model="selectProblem">
                        <label> Problem Category <span style="color:red">*</span></label><br>
                        <p class="plabel">Please check from the boxes below the category of the problem.</p>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="selectProblem" name="Software" value="Software" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Software </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="selectProblem" name="Hardware" value="Hardware" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Hardware </b-form-radio><br>
                        <b-form-radio :aria-describedby="ariaDescribedby" v-model="selectProblem" name="Connectivity" value="Connectivity" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Connectivity </b-form-radio><br>
                        <div v-if="!$v.selectProblem.required" class="invalid-feedback"> Please choose one</div>
                    </b-form-radio-group>
                </div>

                <b-row>
                    <b-col cols="4">
                      <b-nav pills>
                        <b-button variant="danger" type="submit" active :disabled="clicked"> Next </b-button>
                      </b-nav>
                    </b-col>
                    <b-col cols="3">
                        <b-progress height="10px" variant="danger" :value="value" class="mb-3 mt-3"></b-progress>
                    </b-col>
                    <b-col cols="2" class="mt-2"> <span style="font-size:small">Page 1 of 3</span> </b-col>
                    <b-col cols="3">
                      <b-button @click="clearForm" variant="outline-danger"> Clear Form </b-button>
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
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        Header
    },
    computed: {
      ...mapState(["phone"])
    },
    data: function() {
      return {
        email: '',
        office: '',
        client: '',
        phone: this.phone,
        selectProblem: '',
        issues: [],
        offices: [],
        value: 33.33,
        clicked: false,
        errors: []
      }
    },
    validations: {
      email: { required },
      office: { required },
      client: { required },
      selectProblem: { required }
    },
    mounted: function() {
        var v = this;
        v.$http.get(`http://localhost:5000/offices`)
        .then(function(resp) {
            v.offices = resp.data
        })
        .catch(function(err) {
            console.log(err)
        });

        this.store()
    },
    methods: {
      validationStatus: function(validation) {
          return typeof validation != "undefined" ? validation.$error : false;
      },
      onSelectRad() {
        if(this.selectProblem == 'Software'){
            setTimeout( () => this.$router.push({ path: '/software'}), 1000) 
        }
        else if (this.selectProblem == 'Hardware'){
            setTimeout ( () => this.$router.push({ path: '/hardware'}), 1000) 
        }
        else if (this.selectProblem == 'Connectivity'){
            setTimeout( () => this.$router.push({ path: '/connectivity'}), 1000)
        }
      },
      issue() {
        this.formValidation()

          const temp = {
            email: this.email,
            office: this.office,
            client: this.client, 
            phone: this.phone, 
            selectProblem: this.selectProblem
          }
          this.$store.commit('homeStore', temp)

          this.onSelectRad()
      },

      formValidation(e) {
        this.errors = []
        if(this.office == "") {
          this.errors.push('Please Select')
        }
        if (this.phone == '09' || this.phone.length != 11) {
          this.errors.push('Invalid Phone Number. Please enter 11 numbers.')
        }

        if (!this.errors.length) {
          return true
        }
        this.$v.$touch()
        if (this.$v.$pendding || this.$v.$error) return
        this.$v.$reset()    

        e.preventDefault()
    
      },
       acceptNumber: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
          } else {
            return true;
          }
        },
      clearForm(){
        alert('Clear Form')
        this.$refs.myForm.reset()
      },
      store() {
        this.email = this.$store.state.email
        this.office = this.$store.state.office
        this.client = this.$store.state.client
        this.phone = this.$store.state.phone
        this.selectProblem = this.$store.state.selectProblem
      },
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

.progress {
  background-color: gray;
}

.row {
  margin: 10px;
}

input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: gainsboro;
  width: 75%;
}

select {
  width: 50%;
}

.plabel {
  font-size: small;
}

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

button {
  width: 100%;
}

.phoneinvalid {
  color: #dc3545;
  font-size: 80%;
  margin-top: .25rem;
}
</style>