import constant from '@/constant';

const data = JSON.parse(localStorage.getItem(constant.data));
const header = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
if (data && data.token) header.Authorization = data.token;
const config = {
  baseURL: constant.baseUrl,
  headers: header,
};
export default config;
