<template>
    <section>
        <v-dialog v-model="dialog" scrollable max-width="70%">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">Edit Profile</v-btn>
            </template>
            <v-card>
                <v-card-title>Edit Profile</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <div class="row">
                        <v-text-field :label="'Name'" :value="profiledata.name" readonly=""/>
                    </div>
                    <div class="row">
                        <v-text-field :label="'Email'" :value="profiledata.email" readonly=""/>
                    </div>
                    <div class="row">
                        <v-text-field v-if="profiledata.bvn_status==='none'" :label="'BVN'" v-model="bvn"/>
                        <v-text-field v-else :label="'BVN'" :value="profiledata.bvn" readonly/>
                    </div>
                    <div class="row" v-if="profiledata.bvn_status==='none'">
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Date Of Birth" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </div>
                    <div class="row">
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="validateBVN">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>
<script>
import network from '@/network';
import routes from '@/network/routes';

export default {
  name: 'ProfileEdit',
  props: ['profiledata'],
  data: () => ({
    dialog: false,
    bvn: '',
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
  }),
  methods: {
    validateBVN() {
      console.log('date is ', this.date);
      const bvnData = {
        bvn: this.bvn,
        date_of_birth: this.date,
      };
      network.post(routes.validateBVN, bvnData)
        .then((response) => {
          console.log('bvn response is ', response);
        })
        .catch((error) => {
          console.log('bvn error is ', error.response);
        });
    },
  },
};
</script>
