const routes = {
  signup: '/create-new-user',
  login: '/login-customer',
  verifyotp: '/validate-otp',
  customerInstance: '/user/customer-details',
  categories: '/service/get-categories',
  servicesByCategory: (categoryID) => `/service/get-services-by-category?category_id=${categoryID}`,
};

export default routes;
