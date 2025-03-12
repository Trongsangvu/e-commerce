import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

export default {
    get: axios.get,
    post: axios.post
};