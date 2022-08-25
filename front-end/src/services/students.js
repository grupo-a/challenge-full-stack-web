import api from './api';

export default {
  
  getStudents() {
    return api.get('/students');
  },

  postStudent(student) {
    return api.post('/students', student);
  },

  putStudent(student, ra) {
    return api.put(`/students/${ra}`, student);
  },

  deleteStudent(ra) {
    return api.delete(`/students/${ra}`);
  }
};