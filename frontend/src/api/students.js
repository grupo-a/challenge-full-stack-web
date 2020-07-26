import { axios } from '@/plugins'

const getStudents   = ()   => axios.get('/get-students')
const saveStudent   = data => axios.post('/save-student', data)
const editStudent   = data => axios.put(`/edit-student/${data.enrollment_id}`, data)
const deleteStudent = data => axios.delete(`/delete-student/${data.enrollment_id}`)

export {
  getStudents,
  saveStudent,
  editStudent,
  deleteStudent
}
