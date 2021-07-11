import axios from 'axios'

export const indexStudents = () => {

    return axios.get('students')

}

export const showStudent = (id_estudante) => {

    return axios.get(`students/${id_estudante}`)

}

export const storeStudent = (param) => {

    return axios.post(`students`, param)

}

export const updateStudent = (param) => {

    const { id_estudante } = param
    return axios.put(`students/${id_estudante}`, param)

}

export const destroyStudent = (id_estudante) => {

    return axios.delete(`students/${id_estudante}`)

}
