class Util {
  /**
   * Extrai somente os números de uma string
   * @param {*} text 
   * @returns int
   */
  async justNumbers(text) {
    var numbers = text.replace(/[^0-9]/g,'')
    return parseInt(numbers)
  }

  /**
   * Verifica se a string possui números
   * @param {*} text 
   * @returns true -> Se houver números | false -> Se não houver números
   */
  async haveNumbers(text) {
    var numbers = text.replace(/[^0-9]/g,'')

    if (numbers) {
      return true
    } else {
      return false
    }
  }

  /**
   * Verifica se é um e-mail válido
   * @param {*} email 
   * @returns true -> Se for um e-mail válido | false -> Se for um e-mail inválido
   */
  async isValidEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  /**
   * Insere a máscara de ***** no número do cartão (Para salvamento dos logs)
   * @param {*} cardNumber 
   */
  async cardMask(cardNumber) {
    return cardNumber.replace(' ', '').substring(0, 6) + '******' + cardNumber.replace(" ", "").substring(cardNumber.replace(" ", "").length - 4)
  }

  /**
   * Recebe o id da Bandeira de pagamento e retorna a descrição dela
   * Providers Braspag
   * @param {*} id 
   * @returns string: Descrição da bandeira
   */
  async getPaymentBrand(id) {
    if (parseInt(id) === 3) {
      return 'Visa'
    }
    if (parseInt(id) === 4) {
      return 'Master'
    }
    if (parseInt(id) === 5) {
      return 'Amex'
    }
    if (parseInt(id) === 16) {
      return 'Elo'
    }
    if (parseInt(id) === 20) {
      return 'Hipercard'
    }
    if (parseInt(id) === 25) {
      return 'Hiper'
    }
    return ''
  }
  
}

module.exports = Util