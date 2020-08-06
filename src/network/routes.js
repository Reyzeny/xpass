const routes = {
  signup: '/create-new-user',
  login: '/login-customer',
  verifyotp: '/validate-otp',
  customerInstance: '/user/customer-details',
  categories: '/service/get-categories',
  servicesByCategory: (categoryID) => `/service/get-services-by-category?category_id=${categoryID}`,
  servicesByID: (id) => `/service/get-service?id=${id}`,
  createTransaction: 'service/create-transaction',
  initiateWalletLoad: 'transaction/inititate-wallet-load',
  finalizeWalletLoad: 'transaction/finalize-wallet-load',
  userWallet: 'user/customer-wallet',
  getBanks: 'transfer/get-banks',
  getAccountDetails: 'transfer/get-bank-account-details',
  inititateFundsTransfer: 'transaction/initiate-funds-transfer',
  validateBVN: 'user/verify-bvn',
};

export default routes;
