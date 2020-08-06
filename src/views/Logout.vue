<template>

    <div>

    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.logoutUser();
    console.log('in mounted, logout function is ', this.logoutUser);
    this.$router.push('/');
  },
  methods: {
    ...mapActions('user', ['logoutUser']),
  },
};
</script>
