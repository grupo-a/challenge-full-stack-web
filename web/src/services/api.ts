import axios from 'axios'

function httpApi() {
    const token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    })

    return api
}

export { httpApi }
