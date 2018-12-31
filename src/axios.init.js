import axios from 'axios'
// import { default as cookies } from './redux/cookieHelper'

// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'http://ec2-52-15-124-186.us-east-2.compute.amazonaws.com:8080'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS' // for all requests
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' // for all requests
axios.defaults.crossdomain = true
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*' // for POST requests

axios.defaults.withCredentials = false
export default function configureAxios (store) {
  console.log('Axios.init : ', axios.interceptors.request)
  axios.interceptors.request.use((config) => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return config
  })
  axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })
}
