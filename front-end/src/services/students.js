import api from './api';

export default {
  
  getStudents() {
    return api.get('/students');
  },

  postStudent(student) {
    return api.post('/students', student);
  }
};