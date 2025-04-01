import axios from 'axios'

const catamarcaApi = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`
  baseURL: 'http://137.184.4.18:8055'
})

catamarcaApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers
  }

  return config
})

export { catamarcaApi }
