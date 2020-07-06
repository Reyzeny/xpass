<template>
    <section>

    </section>
</template>

<script>
import network from '@/network';
import routes from '@/network/routes';

export default {
  data() {
    return {

    };
  },
  beforeRouteEnter(to, from, next) {
    network.get(routes.customerInstance)
      .then((response) => {
        next((vm) => vm.setData(response.data));
      })
      .catch((error) => {
        console.log('error is ', error);
      });
  },
  beforeRouteUpdate(to, from, next) {
    network.get()
      .then((response) => {
        this.setData(response.data);
        next();
      })
      .catch((error) => {
        console.log('error is ', error);
      });
  },
  methods: {
    setData(data) {
      console.log('data in set data is ', data);
    },
  },
};
</script>
