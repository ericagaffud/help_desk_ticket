<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
            <Header /> 
            </div>
            <form @submit.prevent="onFinal">
                <div class="enclose sidebg">
                    <b-form-group
                        id="name"
                        label-for="name"
                        v-model="description"
                        >
                    <label> Problem Description <span style="color:red">*</span> </label>
                    <p class="plabel">Describe your problem</p>
                    <b-form-input id="description" name="description" v-model="description" v-model.trim="$v.description.$model" :class="{'is-invalid': validationStatus($v.description)}"></b-form-input>
                    <div v-if="!$v.description.required" class="invalid-feedback">This field is required.</div>
                    </b-form-group>  
                </div>
               <div class="enclose sidebg">
<!--                     <label> Insert Picture <span style="color:red">*</span> </label>
                     <b-form-group label-for="form-image" label-cols-lg="2">
                        <b-input-group>
                            <b-input-group-prepend is-text>
                                <b-icon icon="image-fill"></b-icon>
                            </b-input-group-prepend>
                            <b-form-file id="form-image" accept="image/*"></b-form-file>
                        </b-input-group>
                    </b-form-group> -->
                <label> Insert Picture <span style="color:red">*</span> </label><br><br>
                <input id="f_file" type="file" />
                <input id="f_hidden" type="hidden" value="hidden-field-value" />
                </div>
                <b-row>
                    <b-col cols="5">
                        <b-nav pills fill>
                            <b-button variant="primary" @click="$router.go(-1)" active> Back </b-button>
                            <b-nav-item disabled></b-nav-item>
                            <b-button variant="primary" type="submit" active> Submit </b-button>
                        </b-nav>
                    </b-col>
                    <b-col>
                        <b-progress height="10px" :value="value" class="mb-3 mt-3"></b-progress>
                    </b-col>
                    <b-col class="mt-2"> Page 3 of 4</b-col>
                    <b-col class="mt-2"> <p>Clear Form</p> </b-col>
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
import { myIssue } from './ThisMethods'

export default {
    name: 'SubPage',
    components: {
        Header
    },
    data() {
        return {
            value: 75,
            file1: null,
            description: ''
        }
    },
    validations: {
        description: { required }
    },
    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        onFinal() {
           /*  let formData = new FormData() 
            formData.append("photo", this.$refs.fileStore.files[0])
            this.file1 =  formData */

            const temp = {
                file1: this.file1,
                description: this.description
            }
            this.$store.commit('subStore', temp)
            
            this.$router.push({ path: '/finalpage'})
            this.submitIssue()
        },
        
        async submitIssue() {
            const newIssue = {
                id: Math.floor(Math.random() * 100000),
              /*   email: this.email,
                office: this.office,
                client: this.client,
                number: this.number,
                selectProblem: this.selectProblem, */
                file1: this.file1,
                description: this.description
            }
            console.log(this.$store.state.email, 'Email')

            const issue = await myIssue(newIssue)
            console.log(issue)

            this.$v.$touch()
            if (this.$v.$pendding || this.$v.$error) return
            this.$v.$reset()
            
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

form-file {
    align-items: center;
}

button {
  width: 40%;
}
</style>