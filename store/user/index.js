import { get, post, del, put } from "../../services/axios/index.js";

export const state = () => ({
    list: [],
    typeUser: [],
    educationalInstitution: [],
    loading: false,
    closeModal: false
});

export const mutations = {
    setList: (state, valor) => (state.list = valor),
    setEducationalInstitution: (state, valor) => (state.educationalInstitution = valor),
    setTypeUser: (state, valor) => (state.typeUser = valor),


    setAtualizarlist(state, param) {

        /* Operações:
            0 - Inclusão
            1 - Alteração
            2 - Remoção
        */

        let list = state.list;
        let operation = param.operation;
        let user = param.user;

        switch (operation) {

            case 0:

                list.splice(list.length, 0, user);
                break;

            case 1:

                let indexChanged = this.$findIndex(list, (item) => item.idUser == user.idUser);
                list.splice(indexChanged, 1, user);
                break;

            case 2:

                let indexRemoved = this.$findIndex(list, (item) => item.idUser == user.idUser);
                list.splice(indexRemoved, 1);
                break;

        }

        state.list = list;

    },
    setLoading: (state, valor) => (state.loading = valor),
    setCloseModal: (state, valor) => (state.closeModal = valor)
};

export const actions = {

    async include({ commit }, user) {
        try {
            commit("setLoading", true);
            commit("setCloseModal", false);

            const response = await post(`users`, user, "WITH_USER_TOKEN");

            commit("setAtualizarlist", { operation: 0, user: response.data });
            commit("setLoading", false);
            commit("setCloseModal", true);
            return true;
        } catch (error) {

            commit("setLoading", false);
            let message = error.response?.data?.message || "Ocorreu um erro inesperado ao incluir o Usuário/Aluno, entre em contato com o suporte";
            throw new Error(message);
        }
    },

    async list({ commit }) {
        try {
            commit("setLoading", true);

            const response = await get(`users`, "WITH_USER_TOKEN");
            commit("setLoading", false);
            commit("setList", response.data);
            return true;
        } catch (error) {
            commit("setLoading", false);
            
            let message = error?.response?.data?.message || "Ocorreu um erro inesperado ao listar os Usuário/Aluno, entre em contato com o suporte";

            throw new Error(message);
        }
    },

    async delete({ commit }, idUser) {
        try {
            commit("setLoading", true);
            commit("setCloseModal", false);

            await del(`users/${idUser}`, "WITH_USER_TOKEN");

            commit("setAtualizarlist", { operation: 2, user: { idUser } });
            commit("setLoading", false);
            commit("setCloseModal", true);
            return true;
        } catch (error) {
            commit("setLoading", false);
            let message = error?.response?.data?.message || "Ocorreu um erro inesperado ao excluir o Usuário/Aluno, entre em contato com o suporte";
            throw new Error(message);
        }
    },

    async alter({ commit }, param) {
        try {
            commit("setLoading", true);
            commit("setCloseModal", false);

            const response = await put(`users/${param.idUser}`, param.user, "WITH_USER_TOKEN");

            commit("setAtualizarlist", { operation: 1, user: response.data });
            commit("setLoading", false);
            commit("setCloseModal", true);
            return true;
        } catch (error) {
            commit("setLoading", false);
            let message = error.response?.data?.message || "Ocorreu um erro inesperado ao alterar o Usuário/Aluno, entre em contato com o suporte";
            throw new Error(message);
        }
    },

    async typeUserList({ commit }) {
        try {
            commit("setLoading", true);

            const response = await get(`typeUser`, "WITH_USER_TOKEN");

            commit("setLoading", false);
            commit("setTypeUser", response.data);
            return true;
        } catch (error) {
            commit("setLoading", false);
            let message = error?.response?.data?.message || "Ocorreu um erro inesperado ao listar os Usuário/Aluno, entre em contato com o suporte";
            throw new Error(message);
        }
    },

    async educationalInstitutionList({ commit }) {
        try {
            commit("setLoading", true);

            const response = await get(`educationalInstitution`, "WITH_USER_TOKEN");

            commit("setLoading", false);
            commit("setEducationalInstitution", response.data);
            return true;
        } catch (error) {
            commit("setLoading", false);
            let message = error.response?.data?.message || "Ocorreu um erro inesperado ao listar os Usuário/Aluno, entre em contato com o suporte";
            throw new Error(message);
        }
    },
};

export const getters = {
    getList: (state) => state.list,
    getLoading: (state) => state.loading,
    getCloseModal: (state) => state.closeModal,
    getEducationalInstitution: (state) => state.educationalInstitution,
    getTypeUser: (state) => state.typeUser

};
