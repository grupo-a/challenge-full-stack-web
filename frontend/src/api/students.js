import { axios } from '@/plugins'

const api = process.env.VUE_APP_API

const getStudents   = ()   => axios.get(`${api}/get-students`)
const saveStudent   = data => axios.post(`${api}/save-student`, data)
const editStudent   = data => axios.put(`${api}/edit-students/${data.enrollment_id}`, data)
const deleteStudent = data => axios.delete(`${api}/delete-students/${data.enrollment_id}`)

export {
  getStudents,
  saveStudent,
  editStudent,
  deleteStudent
}
