import constant from '@/constant';

const data = JSON.parse(localStorage.getItem(constant.userData));
console.log('data is ', data);
const header = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
if (data && data.token) header.Authorization = `Bearer ${data.token}`;
const config = {
  baseURL: constant.baseUrl,
  headers: header,
};
console.log('config from data is ', config);
export default config;
