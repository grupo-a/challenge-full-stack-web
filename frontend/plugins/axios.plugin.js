import axios from "axios"

export default {
  default() {
    return axios.create({
      baseUrl: 'http://localhost:5000/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}