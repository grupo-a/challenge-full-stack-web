import { localize, extend } from "vee-validate";
import { required, numeric, min, max, min_value, max_value } from "vee-validate/dist/rules";
import pt from "vee-validate/dist/locale/pt_BR.json";

localize("pt_BR", pt);

extend("required", required);
extend("min", min);
extend("max", max);
extend("min_value", min_value);
extend("max_value", max_value);
extend("numeric", numeric);

extend("validEmail", {

    params: ["email"],
    validate(data) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(data);

    },
    message: "O {_field_} deve ser válido!"

});

extend("validCPF", {

    params: ["cpf"],
    validate(data) {

        let cpf = data.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;


        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = soma % 11;
        let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

        if (parseInt(cpf.charAt(9)) !== digitoVerificador1) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

        if (parseInt(cpf.charAt(10)) !== digitoVerificador2) return false;

        return true;


    },
    message: "O {_field_} deve ser válido."

});

extend("validPhoneNumber", {

    params: ["phoneNumber"],
    validate(data) {
        
        const regex = /^\d{2}\d{8,9}$/; 
        return regex.test(data);

    },
    message: "O {_field_} deve ser válido, (DDD + número) no seguinte formato: DDD (2 dígitos) + número (8 ou 9 dígitos)"

});
