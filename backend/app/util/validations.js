const Util = require('./util')
const util = new Util()
const moment = require('../util/moment')

class Validations {
  async validatesPaymentBodyYapay(body) {
    const { finger_print, ip, order, client, products, payments } = body

    if (!ip) {
      throw {
        code: 409,
        message: `Ip do cliente não informado! (Não foi possivel recuperar o Ip internamente)`,
      }
    }

    if (!finger_print) {
      throw {
        code: 409,
        message: `Número de identificação do pagamento não informado! (Campo: 'finger_print')`,
      }
    }

    if (!order) {
      throw {
        code: 409,
        message: `Dados do pedido não informado!`,
      }
    }

    if (!order.id) {
      throw {
        code: 409,
        message: `Id do pedido não informado! (Campo: 'order.id' )`,
      }
    }

    if (!order.affiliateId) {
      throw {
        code: 409,
        message: `Canal de venda do pedido não informado! (Campo: 'order.affiliateId')`,
      }
    }

    if (!order.total_payment_value && order.total_payment_value !== 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento não informado! (Campo: 'order.total_payment_value')`,
      }
    }

    if (isNaN(order.total_payment_value)) {
      throw {
        code: 409,
        message: `Valor total de pagamento inválido (Possui letras ou caracteres inválidos, aceito somente números)! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (order.total_payment_value < 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento deve ser positivo! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (!client) {
      throw {
        code: 409,
        message: `Dados do cliente não informado!`,
      }
    }

    if (!client.name) {
      throw {
        code: 409,
        message: `Nome do cliente não informado! (Campo: 'client.name')`,
      }
    }

    if (!client.document) {
      throw {
        code: 409,
        message: `Documento do cliente não informado! (Campo: 'client.document')`,
      }
    }

    if (client.document.length > 11) {
      if (!client.company_name) {
        throw {
          code: 409,
          message: `Razão social não informada! (Campo: 'client.company_name')`,
        }
      }

      if (!client.trade_name) {
        throw {
          code: 409,
          message: `Nome fantasia não informado! (Campo: 'client.trade_name')`,
        }
      }
    }

    if (!client.email) {
      throw {
        code: 409,
        message: `E-mail do cliente não informado! (Campo: 'client.email')`,
      }
    }

    if (!(await util.isValidEmail(client.email))) {
      throw {
        code: 409,
        message: `E-mail do cliente inválido, fora dos padrões de email! Email: '${client.email}' (Campo: 'client.email')`,
      }
    }

    if (!client.phone_number) {
      throw {
        code: 409,
        message: `Contatos do cliente não informado! (Campo: 'client.phone_number')`,
      }
    }

    if (isNaN(client.phone_number)) {
      throw {
        code: 409,
        message: `Número de contato inválido (Possui letras ou caracteres inválidos, aceito somente números)! Telefone: '${client.phone_number}' (Campo: 'client.phone_number')`,
      }
    }

    if (
      client.phone_number.length < 8 ||
      client.phone_number.length > 15
    ) {
      throw {
        code: 409,
        message: `Número de telefone de contato inválido, quantidade de caracteres (Minimo: 8, máxima: 15)! Telefone: '${client.phone_number}' (Campo: 'client.phone_number')`,
      }
    }

    if (!client.addresses) {
      throw {
        code: 409,
        message: `Endereços do cliente não informado! (Campo: 'client.addresses[]')`,
      }
    }

    if (!Array.isArray(client.addresses)) {
      throw {
        code: 409,
        message: `Erro endereços do cliente, esperado um array! (Campo: 'client.addresses[]')`,
      }
    }

    if (client.addresses.length === 0) {
      throw {
        code: 409,
        message: `Nenhum endereço informado (addresses)! (Campo: 'client.addresses[]')`,
      }
    }

    let countAddresses = 0
    for await (const address of client.addresses) {
      if (!address.postal_code) {
        throw {
          code: 409,
          message: `CEP não informado! (Campo: 'client.addresses[${countAddresses}].postal_code')`,
        }
      }

      if (address.postal_code.length > 8) {
        throw {
          code: 409,
          message: `CEP inválido, máximo de caracteres: 8! CEP: '${address.postal_code}' (Campo: 'client.addresses[${countAddresses}].postal_code')`,
        }
      }

      if (!address.street) {
        throw {
          code: 409,
          message: `Rua não informada! (Campo: 'client.addresses[${countAddresses}].street')`,
        }
      }

      if (!address.number) {
        throw {
          code: 409,
          message: `Número do endereço não informado! (Campo: 'client.addresses[${countAddresses}].number')`,
        }
      }

      if (!address.neighborhood) {
        throw {
          code: 409,
          message: `Bairro não informado! (Campo: 'client.addresses[${countAddresses}].neighborhood')`,
        }
      }

      if (!address.city) {
        throw {
          code: 409,
          message: `Cidade não informada! (Campo: 'client.addresses[${countAddresses}].city')`,
        }
      }

      if (!address.state) {
        throw {
          code: 409,
          message: `Estado não informado! (Campo: 'client.addresses[${countAddresses}].state')`,
        }
      }

      if (address.state.length !== 2) {
        throw {
          code: 409,
          message: `Estado inválido, esperado a sigla do estado (Ex: SP)! Estado: '${address.state}' (Campo: 'client.addresses[${countAddresses}].state')`,
        }
      }

      countAddresses++
    }

    if (!products) {
      throw {
        code: 409,
        message: `Produtos não informado (products)! (Campo: 'products[]')`,
      }
    }

    if (!Array.isArray(products)) {
      throw {
        code: 409,
        message: `Erro produtos, esperado um array! (Campo: 'products[]' )`,
      }
    }

    if (products.length === 0) {
      throw {
        code: 409,
        message: `Nenhum produto informado (products)! (Campo: 'products[]')`,
      }
    }

    let countProducts = 0
    for await (const product of products) {
      if (!product.description) {
        throw {
          code: 409,
          message: `Descrição do produto não informada! (Campo: 'products[${countProducts}].description')`,
        }
      }

      if (!product.quantity) {
        throw {
          code: 409,
          message: `Quantidade do produto não informada! (Campo: 'products[${countProducts}].quantity')`,
        }
      }

      if (!product.price_unit) {
        throw {
          code: 409,
          message: `Preço do produto não informado! (Campo: 'products[${countProducts}].price_unit')`,
        }
      }

      if (!product.sku_code) {
        throw {
          code: 409,
          message: `SKU do produto não informado! (Campo: 'products[${countProducts}].sku_code')`,
        }
      }

      countProducts++
    }

    if (!payments) {
      throw {
        code: 409,
        message: `Pagamentos não informado (payments)! (Campo: 'payments[]')`,
      }
    }

    if (!Array.isArray(payments)) {
      throw {
        code: 409,
        message: `Erro pagamento, esperado um array! (Campo: 'payments[]')`,
      }
    }

    if (payments.length === 0) {
      throw {
        code: 409,
        message: `Nenhum pagamento informado (payments)! (Campo: 'payments[]')`,
      }
    }

    let countPayments = 0
    for await (const payment of payments) {
      if (!payment.payment_value && payment.payment_value !== 0) {
        throw {
          code: 409,
          message: `Valor de pagamento não informado! (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (isNaN(payment.payment_value)) {
        throw {
          code: 409,
          message: `Valor de pagamento inválido, é permitido apenas números! Valor de pagamento: '${payment.payment_value}' (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (payment.payment_value < 1) {
        throw {
          code: 409,
          message: `Valor de pagamento inválido, não é permitida transações menores que R$ 1,00! Valor de pagamento: '${payment.payment_value}' (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (!payment.payment_method_id) {
        throw {
          code: 409,
          message: `Id da forma de pagamento não informado! (Campo: 'payments[${countPayments}].payment_method_id')`,
        }
      }

      if (isNaN(payment.payment_method_id)) {
        throw {
          code: 409,
          message: `Id da forma de pagamento inválido, é permitido apenas números! Id: '${payment.payment_method_id}' (Campo: 'payments[${countPayments}].payment_method_id')`,
        }
      }

      if (!payment.card_name) {
        throw {
          code: 409,
          message: `Nome impresso no cartão não informado! (Campo: 'payments[${countPayments}].card_name')`,
        }
      }

      if (await util.haveNumbers(payment.card_name)) {
        throw {
          code: 409,
          message: `Nome impresso no cartão inválido, não pode conter números! Nome impresso: '${payment.card_name}' (Campo: 'payments[${countPayments}].card_name')`,
        }
      }

      if (!payment.card_number) {
        throw {
          code: 409,
          message: `Número do cartão não informado! (Campo: 'payments[${countPayments}].card_number')`,
        }
      }

      if (isNaN(payment.card_number)) {
        throw {
          code: 409,
          message: `Número do cartão inválido, não pode possuir letras! Número do cartão: '${payment.card_number}' (Campo: 'payments[${countPayments}].card_number')`,
        }
      }

      if (!payment.card_expdate_year) {
        throw {
          code: 409,
          message: `Ano de validade do cartão não informado! (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (isNaN(payment.card_expdate_year)) {
        throw {
          code: 409,
          message: `Ano de validade do cartão inválido, não pode possuir letras! Ano de validade: '${payment.card_expdate_year}' (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (payment.card_expdate_year.length !== 4) {
        throw {
          code: 409,
          message: `Ano de validade do cartão inválido, quantidade de caracteres deve ser 4 (Ex: 2022)! Ano de validade: '${payment.card_expdate_year}' (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (!payment.card_expdate_month) {
        throw {
          code: 409,
          message: `Mês de validade do cartão não informado! (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (isNaN(payment.card_expdate_month)) {
        throw {
          code: 409,
          message: `Mês de validade do cartão inválido, não pode possuir letras! Mês de validade: '${payment.card_expdate_month}' (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (payment.card_expdate_month.length !== 2) {
        throw {
          code: 409,
          message: `Mês de validade do cartão inválido, quantidade de caracteres deve ser 2 (Ex: 02)! Mês de validade: '${payment.card_expdate_month}' (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      const cardExpdate = moment(
        `${payment.card_expdate_year}-${payment.card_expdate_month}`
      ).format('YYYY-MM')
      if (cardExpdate < moment().format('YYYY-MM')) {
        throw {
          code: 409,
          message: `Data de vencimento do cartão inválida / vencida, Data de vencimento: '${moment(
            cardExpdate
          ).format(
            'MM/YYYY'
          )}' (Campo: 'payments[${countPayments}].card_expdate_year - payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (!payment.card_cvv) {
        throw {
          code: 409,
          message: `Código de segurança do cartão não informado! (Campo: 'payments[${countPayments}].card_cvv')`,
        }
      }

      if (isNaN(payment.card_cvv)) {
        throw {
          code: 409,
          message: `Código de segurança do cartão inválido, não pode possuir letras! Código de segurança do cartão: '${payment.card_cvv}' (Campo: 'payments[${countPayments}].card_cvv')`,
        }
      }

      if (!payment.split) {
        throw {
          code: 409,
          message: `Quantidade de parcelas não informado! (Campo: 'payments[${countPayments}].split')`,
        }
      }

      if (isNaN(payment.split)) {
        throw {
          code: 409,
          message: `Quantidade de parcelas inválida, não pode possuir letras! Quantidade de parcelas: '${payment.split}' (Campo: 'payments[${countPayments}].split')`,
        }
      }

      countPayments++
    }

    return 'OK'
  }

  async validatesPaymentBodySpinpay(body) {
    const { ip, order, client, products } = body

    if (!ip) {
      throw {
        code: 409,
        message: `Ip do cliente não informado! (Não foi possivel recuperar o Ip internamente)`,
      }
    }

    if (!order) {
      throw {
        code: 409,
        message: `Dados do pedido não informado!`,
      }
    }

    if (!order.id) {
      throw {
        code: 409,
        message: `Id do pedido não informado! (Campo: 'order.id')`,
      }
    }

    if (!order.total_payment_value && order.total_payment_value !== 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento não informado! (Campo: 'order.total_payment_value')`,
      }
    }

    if (isNaN(order.total_payment_value)) {
      throw {
        code: 409,
        message: `Valor total de pagamento inválido (Possui letras ou caracteres inválidos, aceito somente números)! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (order.total_payment_value < 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento deve ser positivo! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (!client) {
      throw {
        code: 409,
        message: `Dados do cliente não informado!`,
      }
    }

    if (!client.name) {
      throw {
        code: 409,
        message: `Nome do cliente não informado! (Campo: 'client.name')`,
      }
    }

    if (!client.document) {
      throw {
        code: 409,
        message: `Documento do cliente não informado! (Campo: 'client.document')`,
      }
    }

    if (!client.email) {
      throw {
        code: 409,
        message: `E-mail do cliente não informado! (Campo: 'client.email')`,
      }
    }

    if (!(await util.isValidEmail(client.email))) {
      throw {
        code: 409,
        message: `E-mail do cliente inválido, fora dos padrões de email! Email: '${client.email}' (Campo: 'client.email')`,
      }
    }

    if (!client.phone_number) {
      throw {
        code: 409,
        message: `Contatos do cliente não informado! (Campo: 'client.phone_number')`,
      }
    }

    if (isNaN(client.phone_number)) {
      throw {
        code: 409,
        message: `Número de contato inválido (Possui letras ou caracteres inválidos, aceito somente números)! Telefone: '${client.phone_number}' (Campo: 'client.phone_number')`,
      }
    }

    if (
      client.phone_number.length < 8 ||
      client.phone_number.length > 15
    ) {
      throw {
        code: 409,
        message: `Número de telefone de contato inválido, quantidade de caracteres (Minimo: 8, máxima: 15)! Telefone: '${client.phone_number}' (Campo: 'client.phone_number')`,
      }
    }

    if (!products) {
      throw {
        code: 409,
        message: `Produtos não informado (products)! (Campo: 'products[]')`,
      }
    }

    if (!Array.isArray(products)) {
      throw {
        code: 409,
        message: `Erro produtos, esperado um array! (Campo: 'products[]' )`,
      }
    }

    if (products.length === 0) {
      throw {
        code: 409,
        message: `Nenhum produto informado (products)! (Campo: 'products[]')`,
      }
    }

    let countProducts = 0
    for await (const product of products) {
      if (!product.description) {
        throw {
          code: 409,
          message: `Descrição do produto não informada! (Campo: 'products[${countProducts}].description')`,
        }
      }

      if (!product.quantity) {
        throw {
          code: 409,
          message: `Quantidade do produto não informada! (Campo: 'products[${countProducts}].quantity')`,
        }
      }

      if (!product.price_unit) {
        throw {
          code: 409,
          message: `Preço do produto não informado! (Campo: 'products[${countProducts}].price_unit')`,
        }
      }

      if (!product.sku_code) {
        throw {
          code: 409,
          message: `SKU do produto não informado! (Campo: 'products[${countProducts}].sku_code')`,
        }
      }

      countProducts++
    }
  }

  async validatesPaymentBodyBraspag(body) {
    const { ip, order, client, payments } = body

    if (!ip) {
      throw {
        code: 409,
        message: `Ip do cliente não informado! (Não foi possivel recuperar o Ip internamente)`,
      }
    }

    if (!order) {
      throw {
        code: 409,
        message: `Dados do pedido não informado!`,
      }
    }

    if (!order.id) {
      throw {
        code: 409,
        message: `Id do pedido não informado! (Campo: 'order.id')`,
      }
    }

    if (!order.total_payment_value && order.total_payment_value !== 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento não informado! (Campo: 'order.total_payment_value')`,
      }
    }

    if (isNaN(order.total_payment_value)) {
      throw {
        code: 409,
        message: `Valor total de pagamento inválido (Possui letras ou caracteres inválidos, aceito somente números)! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (order.total_payment_value < 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento deve ser positivo! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (!client.name) {
      throw {
        code: 409,
        message: `Nome do cliente não informado! (Campo: 'client.name')`,
      }
    }

    if (!payments) {
      throw {
        code: 409,
        message: `Pagamentos não informado (payments)! (Campo: 'payments[]')`,
      }
    }

    if (!Array.isArray(payments)) {
      throw {
        code: 409,
        message: `Erro pagamento, esperado um array! (Campo: 'payments[]')`,
      }
    }

    if (payments.length === 0) {
      throw {
        code: 409,
        message: `Nenhum pagamento informado (payments)! (Campo: 'payments[]')`,
      }
    }

    let countPayments = 0
    for await (const payment of payments) {
      if (!payment.payment_value && payment.payment_value !== 0) {
        throw {
          code: 409,
          message: `Valor de pagamento não informado! (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (isNaN(payment.payment_value)) {
        throw {
          code: 409,
          message: `Valor de pagamento inválido, é permitido apenas números! Valor de pagamento: '${payment.payment_value}' (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (payment.payment_value < 1) {
        throw {
          code: 409,
          message: `Valor de pagamento inválido, não é permitida transações menores que R$ 1,00! Valor de pagamento: '${payment.payment_value}' (Campo: 'payments[${countPayments}].payment_value')`,
        }
      }

      if (!payment.payment_method_id) {
        throw {
          code: 409,
          message: `Id da forma de pagamento não informado! (Campo: 'payments[${countPayments}].payment_method_id')`,
        }
      }

      if (isNaN(payment.payment_method_id)) {
        throw {
          code: 409,
          message: `Id da forma de pagamento inválido, é permitido apenas números! Id: '${payment.payment_method_id}' (Campo: 'payments[${countPayments}].payment_method_id')`,
        }
      }

      if (!payment.card_name) {
        throw {
          code: 409,
          message: `Nome impresso no cartão não informado! (Campo: 'payments[${countPayments}].card_name')`,
        }
      }

      if (await util.haveNumbers(payment.card_name)) {
        throw {
          code: 409,
          message: `Nome impresso no cartão inválido, não pode conter números! Nome impresso: '${payment.card_name}' (Campo: 'payments[${countPayments}].card_name')`,
        }
      }

      if (!payment.card_number) {
        throw {
          code: 409,
          message: `Número do cartão não informado! (Campo: 'payments[${countPayments}].card_number')`,
        }
      }

      if (isNaN(payment.card_number)) {
        throw {
          code: 409,
          message: `Número do cartão inválido, não pode possuir letras! Número do cartão: '${payment.card_number}' (Campo: 'payments[${countPayments}].card_number')`,
        }
      }

      if (!payment.card_expdate_year) {
        throw {
          code: 409,
          message: `Ano de validade do cartão não informado! (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (isNaN(payment.card_expdate_year)) {
        throw {
          code: 409,
          message: `Ano de validade do cartão inválido, não pode possuir letras! Ano de validade: '${payment.card_expdate_year}' (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (payment.card_expdate_year.length !== 4) {
        throw {
          code: 409,
          message: `Ano de validade do cartão inválido, quantidade de caracteres deve ser 4 (Ex: 2022)! Ano de validade: '${payment.card_expdate_year}' (Campo: 'payments[${countPayments}].card_expdate_year')`,
        }
      }

      if (!payment.card_expdate_month) {
        throw {
          code: 409,
          message: `Mês de validade do cartão não informado! (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (isNaN(payment.card_expdate_month)) {
        throw {
          code: 409,
          message: `Mês de validade do cartão inválido, não pode possuir letras! Mês de validade: '${payment.card_expdate_month}' (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (payment.card_expdate_month.length !== 2) {
        throw {
          code: 409,
          message: `Mês de validade do cartão inválido, quantidade de caracteres deve ser 2 (Ex: 02)! Mês de validade: '${payment.card_expdate_month}' (Campo: 'payments[${countPayments}].card_expdate_month')`,
        }
      }

      const cardExpdate = moment(
        `${payment.card_expdate_year}-${payment.card_expdate_month}`
      ).format('YYYY-MM')
      if (cardExpdate < moment().format('YYYY-MM')) {
        throw {
          code: 409,
          message: `Data de vencimento do cartão inválida / vencida, Data de vencimento: '${moment(
            cardExpdate
          ).format(
            'MM/YYYY'
          )}' (Campo: 'payments[${countPayments}].card_expdate_year - payments[${countPayments}].card_expdate_month')`,
        }
      }

      if (!payment.card_cvv) {
        throw {
          code: 409,
          message: `Código de segurança do cartão não informado! (Campo: 'payments[${countPayments}].card_cvv')`,
        }
      }

      if (isNaN(payment.card_cvv)) {
        throw {
          code: 409,
          message: `Código de segurança do cartão inválido, não pode possuir letras! Código de segurança do cartão: '${payment.card_cvv}' (Campo: 'payments[${countPayments}].card_cvv')`,
        }
      }

      if (!payment.split) {
        throw {
          code: 409,
          message: `Quantidade de parcelas não informado! (Campo: 'payments[${countPayments}].split')`,
        }
      }

      if (isNaN(payment.split)) {
        throw {
          code: 409,
          message: `Quantidade de parcelas inválida, não pode possuir letras! Quantidade de parcelas: '${payment.split}' (Campo: 'payments[${countPayments}].split')`,
        }
      }

      countPayments++
    }
  }

  async validatesPaymentBodyItauShopline(body) {
    let { order, client } = body

    if (!order) {
      throw {
        code: 409,
        message: `Dados do pedido não informado!`,
      }
    }

    if (!order.id) {
      throw {
        code: 409,
        message: `Id do pedido não informado! (Campo: 'order.id')`,
      }
    }

    if (!order.total_payment_value && order.total_payment_value !== 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento não informado! (Campo: 'order.total_payment_value')`,
      }
    }

    if (isNaN(order.total_payment_value)) {
      throw {
        code: 409,
        message: `Valor total de pagamento inválido (Possui letras ou caracteres inválidos, aceito somente números)! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (order.total_payment_value < 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento deve ser positivo! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (!client) {
      throw {
        code: 409,
        message: `Dados do cliente não informado!`,
      }
    }

    if (!client.name) {
      throw {
        code: 409,
        message: `Nome do cliente não informado! (Campo: 'client.name')`,
      }
    }

    if (!client.document) {
      throw {
        code: 409,
        message: `Documento do cliente não informado! (Campo: 'client.document')`,
      }
    }

    if (client.document.length > 11) {
      if (!client.company_name) {
        throw {
          code: 409,
          message: `Razão social não informada! (Campo: 'client.company_name')`,
        }
      }
    }
  }

  async validatesPaymentBodyCoupon(body) {
    let { order, client } = body

    if (!order) {
      throw {
        code: 409,
        message: `Dados do pedido não informado!`,
      }
    }

    if (!order.id) {
      throw {
        code: 409,
        message: `Id do pedido não informado! (Campo: 'order.id')`,
      }
    }

    if (!order.coupon) {
      throw {
        code: 409,
        message: `Código do cupom não informado! (Campo: 'order.coupon')`,
      }
    }

    if (!order.total_payment_value && order.total_payment_value !== 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento não informado! (Campo: 'order.total_payment_value')`,
      }
    }

    if (isNaN(order.total_payment_value)) {
      throw {
        code: 409,
        message: `Valor total de pagamento inválido (Possui letras ou caracteres inválidos, aceito somente números)! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (order.total_payment_value < 0) {
      throw {
        code: 409,
        message: `Valor total de pagamento deve ser positivo! Valor total de pagamento: '${order.total_payment_value}' (Campo: 'order.total_payment_value')`,
      }
    }

    if (!client) {
      throw {
        code: 409,
        message: `Dados do cliente não informado!`,
      }
    }

    if (!client.document) {
      throw {
        code: 409,
        message: `Documento do cliente não informado! (Campo: 'client.document')`,
      }
    }

    if (client.document.length > 11) {
      if (!client.company_name) {
        throw {
          code: 409,
          message: `Razão social não informada! (Campo: 'client.company_name')`,
        }
      }
    }
  }
}

module.exports = Validations
