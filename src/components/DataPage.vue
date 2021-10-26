<template>
  <b-container>
      <b-row>
          <b-col></b-col>
          <b-col cols="8">
              <div class="enclose headerbg">
                  <Header />
              </div>
              <div class="enclose headerbg">
                  <h4>Collection of Tickets</h4><br>
                  <b-table
                  id="my-table"
                  :items="issues"
                  :fields="fields"
                  head-row-variant="danger"
                  >
                    <template #cell(details)="row">
                        <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="danger">
                            {{ row.detailsShowing ? 'Hide' : 'Show'}} Info
                        </b-button>
                    </template>
                    
                    <template #row-details="row">
                        <b-card class="tab">
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Office:</b></b-col>
                                <b-col>{{ row.item.office }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Phone Number:</b></b-col>
                                <b-col>{{ row.item.phone }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Subject:</b></b-col>
                                <b-col>{{ row.item.selectProblem }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Case:</b></b-col>
                                <b-col>{{ row.item.case }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                                <b-col>{{ row.item.description }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Picture:</b></b-col>
                                <b-col>{{ row.item.selectedFile }}</b-col>
                            </b-row>
                        </b-card>
                    </template>

                  </b-table>
              </div>
          </b-col>
          <b-col></b-col>
      </b-row>
  </b-container>
</template>

<script>
import Header from './Header.vue'
import { fetchIssues } from './ThisMethods'

export default {
    name: 'DataPage',
    components: {
        Header
    },
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID' },
                { key: 'client', label: 'Client Name' },
                 { key: 'email', label: 'Email' },
/*                { key: 'office', label: 'Office' },
                { key: 'selectProblem', label: 'Subject' },
                { key: 'case', label: 'Case'},
                { key: 'description', label: 'Description' }, */
                'details'
            ],
            issues: []
        }
    },
    created() {
      fetchIssues()
        .then ( value => {
        value.forEach(issue => {
          this.issues.push(issue)
        })
      })
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

.headerbg {
    border: solid pink;
    border-width: 15px 1px 1px;
}

.sidebg {
    border:1px solid pink;
}

h4 {
    text-align: center;
    font-family: sans-serif;
}

.tab {
    background-color: rgba(255, 192, 203, 0.308);
}
</style>