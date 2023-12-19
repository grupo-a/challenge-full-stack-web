import axios from 'axios'

function authHeader() {
    const token = localStorage.getItem('token')
    if (token) {
        return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    } else {
        return {}
    }
}

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: authHeader(),
})

export { api }
