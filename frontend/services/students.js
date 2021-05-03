import API from '../plugins/axios.plugin'

export default {
    fetch() {
        return API.get('/students')
    },
    getById(id) {
        return API.get(`/students/${id}`)
    },
    add(student) {
        return API.post(`/students`, student)
    },
    update(id, student) {
        return API.put(`/students/${id}`, student)
    },
    delete(id) {
        return API.delete(`students/${id}`)
    }
}