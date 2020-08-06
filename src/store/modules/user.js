import constant from '@/constant';

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
  },
  mutations: {
    SET_AUTHENTICATED_STATE(state, data) {
      console.log('executing set authenticated');
      state.isAuthenticated = data.authState;

      if (data.authState) {
        console.log('data.authState is true');
        const user = {
          token: data.token,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          bvn_status: data.bvn_status,
        };
        console.log('setting on localStorage');
        console.log('user data to save is ', user);
        localStorage.setItem(constant.userData, JSON.stringify(user));
        console.log('local storage set');
      }
    },
  },
  actions: {
    changeAuthenticationState({ commit }, data) {
      console.log('commiting in store and data is ', data);
      commit('SET_AUTHENTICATED_STATE', data);
      console.log('commited successfully');
    },
    logoutUser() {
      console.log('clearing storage');
      localStorage.clear();
    },
  },
  getters: {
    isAuthenticated: () => {
      const userData = JSON.parse(localStorage.getItem(constant.userData));
      return userData !== null && userData[constant.token] !== null;
    },
    userData: () => {
      const user = JSON.parse(localStorage.getItem(constant.userData));
      return user;
    },
  },
};
