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
                    <label> Insert Picture <span style="color:red">*</span> </label> <br>
<!--                     <div class="filecon">
                        <img src="../assets/browse.png" alt="Upload" width="30px">
                        <label for="upload-photo" class="browselabel"> Browse </label>
                        <input type="file" name="photo" id="upload-photo" accept="image/jpeg, image/png, image/gif" />
                    </div> -->
                    <b-row>
                        <b-col cols="5">
                            <div class="fileContainer">
                                <img src="../assets/browse.png" alt="Upload" width="30px">
                                Select image
                                <input type="file" class="file-upload" id="file" name="file" @change="fileSelected" accept="image/jpeg, image/png, image/gif">
                            </div>
                        </b-col>
                        <b-col cols="4">
                            <p class="fileInfo" v-if="!files || !files.length">No image selected</p>
                            <p class="fileName" v-else v-for="file in files" :key="file.name">{{file.name}}</p>
                        </b-col>
                    </b-row>
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
            files: null,
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
                files: this.files,
                description: this.description
            }
            this.$store.commit('subStore', temp)

            setTimeout( () => this.$router.push({ path: '/finalpage'}),1000)

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
                case: this.$store.state.softwareSub || this.$store.state.hardwareSub || this.$store.state.connectivitySub,
                description: this.$store.state.description,
                files: this.$store.state.files
                
            }
            console.log(this.$store.state.email, 'Email')

            const issue = await myIssue(newIssue)
            console.log(issue)
        },
        store() {
            this.files = this.$store.state.files
            this.description = this.$store.state.file
        },

        clearForm(){
            alert('Clear Form')
            this.$refs.myForm.reset()
        },
        fileSelected(e) {
            this.files = e.target.files
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
  text-align: center;
}

.fileContainer {
  overflow: hidden;
  position: relative;
  border: 1px solid pink;
  color: #111;
  padding: 6px 18px;
  border-radius: 7px;
  line-height: 40px;
  text-align: center;
}

form input, textarea {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #d9dadc;
  border-radius: 7px;
  font-size: 16px;
  color: #393645;
  resize: none;
}

.fileContainer [type=file] {
  cursor: pointer;
  display: block;
  font-size: 13px;
  filter: alpha(opacity=0);
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  text-align: right;
  top: -8px;
} 

.fileInfo {
  font-size: 15px;
  color: #a9a7a9;
  line-height: 40px;
}

.fileName {
  font-size: 15px;
  color: black;
  line-height: 40px;
}
</style>