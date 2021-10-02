<template>
    <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
              <div class="enclose headerbg">
                  <Header />
              </div>
              <form @submit.prevent="issue()">
                <div class="enclose sidebg">
                    <b-form-group
                    id="email"
                    description="Please enter a valid email"
                    label-for="email"
                    >
                    <label> Email <span style="color:red">*</span> </label>
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
                        label-cols-lg="4"
                        v-model.trim="$v.office.$model"
                        :class="{'is-invalid': validationStatus($v.office)}">
                        <option value="" disabled> Select Office </option>
                        <option :value="office.name" :key="office.name" v-for="office in offices"> {{ office.name }} </option>
                        <div v-if="!$v.office.required" class="invalid-feedback">This field is required.</div>
                    </b-form-select>
                    
                    </b-form-group><br>
                </div>

                <div class="enclose sidebg">
                    <b-form-group
                    id="client"
                    label-for="client"
                    >
                    <label> Client Name <span style="color:red">*</span> </label>
                    <b-form-input ref="nameInput" id="client" name="client" v-model="client" v-model.trim="$v.client.$model" :class="{'is-invalid': validationStatus($v.client)}"></b-form-input>
                    <div v-if="!$v.client.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>      
                </div>

                <div class="enclose sidebg">
                    <b-form-group
                    id="number"
                    description="Please enter a valid number"
                    label-for="number"
                    >
                    <label> Phone Number <span style="color:red">*</span> </label>
                    <b-form-input ref="numberInput" id="number" name="number" v-model="number" v-model.trim="$v.number.$model" :class="{'is-invalid': validationStatus($v.number)}"></b-form-input>
                    <div v-if="!$v.number.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>
                </div>

                <div class="enclose sidebg">
                    <b-form-group v-slot="{ ariaDescribedby }" id="problem" label-for="problem" v-model="selectProblem" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}">
                        <label> Problem Category <span style="color:red">*</span></label><br>
                        <p class="plabel">Please check from the boxes below the category of the problem.</p>
                        <b-form-radio id="problem" v-model="selectProblem" :aria-describedby="ariaDescribedby" :mandatory="false" name="Software" value="Software" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Software</b-form-radio><br>
                        <b-form-radio id="problem" v-model="selectProblem" :aria-describedby="ariaDescribedby" :mandatory="false" name="Hardware" value="Hardware" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Hardware</b-form-radio><br>
                        <b-form-radio id="problem" v-model="selectProblem" :aria-describedby="ariaDescribedby" :mandatory="false" name="Connectivity" value="Connectivity" v-model.trim="$v.selectProblem.$model" :class="{'is-invalid': validationStatus($v.selectProblem)}"> <span style="margin-left:10px"></span> Connectivity</b-form-radio><br>
                        <div v-if="!$v.selectProblem.required" class="invalid-feedback"> Please choose one</div>
                    </b-form-group>
                </div>
                <b-row>
                    <b-col>
                      <b-nav pills>
                        <b-button variant="primary" type="submit" active> Next </b-button>
                      </b-nav>
                    </b-col>
                    <b-col>
                        <b-progress height="10px" :value="value" class="mb-3 mt-3"></b-progress>
                    </b-col>
                    <b-col class="mt-2"> Page 1 of 4</b-col>
                    <b-col>
                      <b-button variant="outline-primary" @click="clearForm()"> <span style="font:x-small">Clear</span>  </b-button>
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
/* import { myIssue } from './ThisMethods' */
/* import { fetchIssues,  myIssue  } from './ThisMethods' */

export default {
    name: 'Home',
    components: {
        Header
    },
    data: function() {
      return {
        email: '',
        office: '',
        client: '',
        number: '',
        selectProblem: '',
        issues: [],
        offices: [],
        value: 25,
      }
    },
    validations: {
      email: { required },
      office: { required },
      client: { required },
      number: { required },
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

    },
    methods: {
      validationStatus: function(validation) {
          return typeof validation != "undefined" ? validation.$error : false;
      },
      
      onSelectRad() {
        if(this.selectProblem == 'Software'){
            this.$router.push({ path: '/software'})
        }
        else if (this.selectProblem == 'Hardware'){
            this.$router.push({ path: '/hardware'})
        }
        else if (this.selectProblem == 'Connectivity'){
            this.$router.push({ path: '/connectivity'})
        }
      },

      issue() {
          this.$v.$touch()
          if (this.$v.$pendding || this.$v.$error) return
          this.$v.$reset()
              
          //vuex interrupts
          const temp = {
            email: this.email,
            office: this.office,
            client: this.client, 
            number: this.number, 
            selectProblem: this.selectProblem
          }
          this.$store.commit('homeStore', temp)

          this.onSelectRad()
      },

 /*      async myIssue() {
          const newIssue = {
              id: Math.floor(Math.random() * 100000),
              email: this.email,
              office: this.office,
              client: this.client,
              number: this.number,
              selectProblem: this.selectProblem,
          }
          const issue = await myIssue(newIssue)
          console.log(issue)
      }, */

      clearForm(){
        this.$v.$touch()
        if (this.$v.$pendding || this.$v.$error) return
        alert('Clear Form')

        this.$v.$reset()
        this.email = null
        this.office = null
        this.client = null
        this.number = null
        this.selectProblem = null
      }
    },

/*    created: function() {
      this.issue()
    }
     created() {
      fetchIssues()
      .then ( value => {
          this.issues = value
      })
    } */
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

/* input:focus {
  border-color: violet;
} */

select {
  width: 50%;
}

.plabel {
  font-size: small;
}

form-radio {
    padding-left: 20px;
}

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

button {
  width: 50%;
}

</style>