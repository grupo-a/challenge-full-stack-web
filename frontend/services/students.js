import axiosClient from '@/plugins/axios.plugin'

export default {
    fetch() {
        return axiosClient.default().get('/students')
    },
    getById(id) {
        return axiosClient.default().get(`/students/${id}`)
    },
    add(student) {
        return axiosClient.default().post(`/students`, student)
    },
    update(id, student) {
        return axiosClient.default().put(`/students/${id}`, student)
    },
    delete(id) {
        return axiosClient.default().delete(`/students/${id}`)
    }
}