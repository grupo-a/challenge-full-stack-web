const util = {

    /* Função para utilizar em loop de promisses, empilha a fila de chamadas aguardando a resposta das anteriores.*/
    recursiveAwait: (array, fn) => {

        if (!Array.isArray(array) && typeof array == 'object')
            array = Object.values(array)

        return new Promise(async (res, rej) => {
            if (array.length == 0) {
                res()
                return false
            }

            let count = array.length - 1

            const fnRepeat = async (dados) => {

                try {
                    await fn(dados)
                } catch (error) {
                    console.log('uk', error.message);
                    rej(error)
                    return false
                }
                count--

                if (count >= 0)
                    fnRepeat(array[count])
                else
                    res()
            }

            fnRepeat(array[count]);

        })

    },

    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    validateCPF: (cpf) => {

        var sum;
        var rest;
        sum = 0;

        cpf = cpf.toString().padStart(11, '0')

        console.log(cpf);
        strCPF = cpf.replace(/\.|\-/g, '')

        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(strCPF.substring(9, 10))) return false;

        sum = 0;
        for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },

}

module.exports = util