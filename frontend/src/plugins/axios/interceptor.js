import axios from "./axios";

export default () => {

    axios.interceptors.response.use(
        res => {
            console.log('uiiii');
            return res;
        },
        error => {

            if (error.message.indexOf('401') > -1) {
                throw new Error('Sem pemissão de acesso, faça login novamente!')
            }

            if (error.message.indexOf('500') > -1) {
                throw new Error('Requisição falhou (500)')
            }

            if (error.message.indexOf('Network Error') > -1) {
                throw new Error('Erro de Conexão (Network Error)')
            }

            if (error.response && error.response.data && error.response.data.msg)
                throw new Error(error.response.data.msg)

            //validation body celebrate
            if (error?.response?.data?.validation?.body?.message)
                throw new Error(error.response.data.validation.body.message)

            if (error.message)
                throw new Error(error.message)

            throw new Error('Erro Desconhecido ;)')

        }
    );
};