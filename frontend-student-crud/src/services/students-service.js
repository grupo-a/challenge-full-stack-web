import axios from 'axios';

const STUDENTS_URL = 'http://localhost:3000/students';

export default {
  getStudents() {
    const students = axios.get(STUDENTS_URL).then((response) => response);

    students.then((students) => {
      students.data.map((student) => {
        student.createdAt = new Date(student.createdAt).toLocaleString('pt');
        student.updatedAt = new Date(student.updatedAt).toLocaleString('pt');
      });
    });

    return students;
  },
  saveStudent(student) {
    return axios.post(STUDENTS_URL, student);
  },
};
