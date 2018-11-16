import axios from 'axios'

axios.defaults.baseURL = 'http://compta.dev.local.ina.fr:8080'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS' // for all requests
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' // for all requests
// axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS' // for POST requests

// axios.defaults.withCredentials = true
export default function configureAxios (store) {
  console.log(axios.interceptors.request)
  axios.interceptors.request.use((config) => {
    return config
  })
  axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })
}
