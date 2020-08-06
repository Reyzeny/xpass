<template>
  <div>
    <v-app>

      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userAuthenticated: true,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&amp;display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Nunito, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 800;
  line-height: 1.5;
  color: #212529;
}
.btn {
  font-size: 16px  !important;
  letter-spacing: 0.5px;
  font-weight: 600;
  padding: 8px 20px  !important;
  outline: none;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  border-radius: 6px;
}
.btn-primary {
  box-shadow: rgba(47, 85, 212, 0.3) 0px 3px 5px 0px;
  background-color: rgb(47, 85, 212);
  color: rgb(255, 255, 255) !important;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(47, 85, 212);
  border-image: initial;
}
.btn-secondary {
  background-color: transparent;
  color: rgb(47, 85, 212);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(47, 85, 212);
}
.btn-secondary:hover {
  background-color: rgb(47, 85, 212);
  border-color: rgb(255, 255, 255);
}
.bg-overlay-gradient {
  background-color: rgba(47, 85, 212, 0.6);
}
.bg-overlay-white {
  background-color: rgba(255, 255, 255, 0.5);
}
.bg-overlay-gradient2 {
  background-image: -webkit-gradient(linear, left top, right top, from(#2eca8b), color-stop(#2f55d4), to(#2eca8b));
  background-image: linear-gradient(90deg, #2eca8b, #2f55d4, #2eca8b);
  opacity: 0.5;
}
/* Animations */
.mover {
  animation: mover 1s infinite alternate;
}
@keyframes mover {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}
</style>
