import { post } from "../../services/axios/index.js";

export const state = () => ({
    token: null,
    logon: null,
    userType: null,
});

export const mutations = {
    setLogon: (state, valor) => (state.logon = valor),
    setToken: (state, valor) => (state.token = valor),
    setUserType: (state, valor) => (state.userType = valor),
};

export const actions = {


    async login({ commit }, param) {
        try {
            commit("setLogon", null);
            commit("setToken", null);
            commit("setUserType", null);

            const response = await post(`login`, param, "WITHOUT_USER_TOKEN", "N");
            commit("setLogon", response.data.logon);
            commit("setToken", JSON.stringify(response.data.token));
            commit("setUserType", parseInt(response.data.idUserType));
            window.sessionStorage.setItem("token", JSON.stringify(response.data.token));

            return true;

        } catch (error) {

            let message = error.response?.data?.message || "Ocorreu um erro inesperado ao efetuar o login, entre em contato com o suporte";
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
    getLogon: (state) => state.logon,
    getToken: (state) => state.token,
    getUserType: (state) => state.userType

};
