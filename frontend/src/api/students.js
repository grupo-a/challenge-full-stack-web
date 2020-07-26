import { axios } from '@/plugins'

const api = process.env.VUE_APP_API

const getStudents   = ()   => axios.get(`${api}/get-students`)
const saveStudent   = data => axios.post(`${api}/save-student`, data)
const editStudent   = data => axios.put(`${api}/edit-student/${data.enrollment_id}`, data)
const deleteStudent = data => axios.delete(`${api}/delete-student/${data.enrollment_id}`)

export {
  getStudents,
  saveStudent,
  editStudent,
  deleteStudent
}
