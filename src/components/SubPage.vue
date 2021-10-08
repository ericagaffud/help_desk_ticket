<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <div class="enclose headerbg">
            <Header /> 
            </div>
            <form @submit.prevent="onFinal" ref="myForm">
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
                    <b-col cols="4">
                        <b-nav pills fill>
                            <b-button variant="danger" @click="$router.go(-1)" active class="drivebutton"> Back </b-button>
                            <b-nav-item disabled></b-nav-item>
                            <b-button variant="danger" type="submit" active class="drivebutton"> Submit </b-button>
                        </b-nav>
                    </b-col>
                    <b-col cols="3">
                        <b-progress height="10px" variant="danger" :value="value" class="mb-3 mt-3"></b-progress>
                    </b-col>
                    <b-col cols="2" class="mt-2"> <span style="font-size:small">Page 3 of 3</span> </b-col>
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
import { myIssue } from './ThisMethods'

export default {
    name: 'SubPage',
    components: {
        Header
    },
    data() {
        return {
            value: 100,
            file: null,
            description: ''
        }
    },
    validations: {
        description: { required }
    },

    mounted: function() {
        this.store()
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

            this.$v.$touch()
            if (this.$v.$pendding || this.$v.$error) return
            this.$v.$reset()
            alert('Submit')
            
            this.submitIssue()
        },
        async submitIssue() {
            const newIssue = {
                email: this.$store.state.email,
                office: this.$store.state.office,
                client: this.$store.state.client,
                number: this.$store.state.number,
                selectProblem: this.$store.state.selectProblem,
                issue: this.$store.state.softwareSub || this.$store.state.hardwareSub || this.$store.state.connectivitySub,
                description: this.$store.state.description,
                file1: this.$store.state.file1
                
            }
            console.log(this.$store.state.email, 'Email')

            const issue = await myIssue(newIssue)
            console.log(issue)
        },
        store() {
            this.file = this.$store.state.file
            this.description = this.$store.state.file
        },

        clearForm(){
            alert('Clear Form')
            this.$refs.myForm.reset()
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

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

form-file {
    align-items: center;
}

.drivebutton {
  width: 40%;
}
</style>