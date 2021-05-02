import studentsApi from '@/services/students'

export default {
    async actionFetchStudents({ commit }) {
        try {
            const { data } = await studentsApi.fetch();
            return data;
        } 
        catch(err) {
            return err;
        }
    },
    async actionGetStudent({ commit }, id) {
        try {
            const { data } = await studentsApi.getById(id);
            return data;
        } 
        catch(err) {
            return err;
        }
    },
    async actionAddStudent({ commit }, student) {
        try {
            const { data } = await studentsApi.add(student);
            return data;
        } 
        catch(err) {
            return err;
        }
    },
    async actionUpdateStudent({ commit }, { id, student }) {
        try {
            const { data } = await studentsApi.update(id, student);
            return data;
        } 
        catch(err) {
            return err;
        }
    },
    async actionDeleteStudent({ commit }, id) {
        try {
            const { data } = await studentsApi.delete(id);
            return data;
        } 
        catch(err) {
            return err;
        }
    }, 
}