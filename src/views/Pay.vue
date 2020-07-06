<template>
    <section>
        <navbar/>
        <section>
            <h1>Select Provider</h1>
            <div class="services">
                <div v-for="service in services" :key="service.id">
                    <div><img src=""/></div>
                    <div><p>{{service.name}}</p></div>
                </div>
            </div>
            <div class="services-input">
                <div>
                    <select v-model="selectedVariation">
                        <option v-for="variation in variations" v-bind:value="variation.name" :key="variation.id">
                            {{ variation.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <input v-model="variationAmount"/>
                </div>
                <div>
                    <input v-model="phoneNumber" placeholder="Phone Number"/>
                </div>
            </div>
            <div>
                <md-content class="md-elevation-10">10<button>Submit</button></md-content>
            </div>
        </section>
    </section>
</template>
<script>
import network from '@/network';
import routes from '@/network/routes';

export default {
  data() {
    return {
      services: [],
    };
  },
  mounted() {

  },
  methods: {
    loadPay() {
      network.get(routes.servicesByCategory(this.route.params.categoryID))
        .then((response) => {
          console.log('response is ', response);
        })
        .catch((error) => {
          console.log('error is ', error);
        });
    },
  },
};
</script>

<style scoped>
.services-input {
    display: flex;
}
</style>
