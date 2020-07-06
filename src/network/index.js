import axios from 'axios';
import config from './config';

console.log('config is ', config);

export default axios.create(config);
