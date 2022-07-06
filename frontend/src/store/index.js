import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store ({ 
    state: {
        students: [],
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        NEW(state, student) {
            state.students.push(student);
        },
        UPDATE(state, student) {
            const index = state.students.findIndex(s => s.id == student.id)
            state.students[index] = student
        },
        DELETE(state, id) {
            state.students = state.students.filter(s => s.id != s)
        },
        AUTH(state, token) {
            state.token = token;
        },
        LOGOUT(state) {
            state.token = '';
            localStorage.clear('token');
        }
    },
    actions: {
        GET_STUDENTS({ commit }) {
            return axios.get('http://localhost:3000/students')
        },
        async NEW_STUDENT({ commit }, studentBody) {
            return axios.post('http://localhost:3000/students/form', studentBody)
                .then(response => commit('NEW', response))
        },
        async UPDATE_STUDENT({ commit }, student) {
            return axios.put(`http://localhost:3000/students/form/${student.id}`, student)
                .then(() => commit('UPDATE', student))
        },
        async GET_STUDENT({ commit }, id) {
            return axios.get(`http://localhost:3000/students/one/${id}`);
        },
        async GET_STUDENT_NAME({ commit }, name) {
            return axios.get(`http://localhost:3000/students/name/${name}`);
        },
        async DELETE_STUDENT({ commit }, id) {
            return axios.delete(`http://localhost:3000/students/${id}`)
                .then(() => commit('DELETE', id))
        },
        async REGISTER_STUDENT({ commit }, registerData) {
            let token = (await axios.post('http://localhost:3000/register', registerData)).data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common['Authorization'] = token;
            commit("AUTH", token);
        },
        async LOGIN_STUDENT({ commit }, registerData) {
            let token = (await axios.post('http://localhost:3000/login', registerData)).data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common['Authorization'] = token;
            commit("AUTH", token);
        },
    }
});