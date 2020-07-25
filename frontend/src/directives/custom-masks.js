import { formatToCPF } from 'brazilian-values'

const cpf =  {
  bind (element) {
    function handler (event) {
      event.target.value = event.target.value.replace(/[^\d.-]/g, "")
    }

    element.addEventListener('input', handler)

    element.getElementsByTagName('input')[0].setAttribute('maxlength', 14)
  },

  update (_, binding, vnode) {
    const levels = binding.expression.split('.')

    if (levels.length === 1) {
      vnode.context[levels[0]] = formatToCPF(vnode.context[levels[0]])
    } else {
      levels.reduce((obj, key) => {
        if (key === levels[levels.length - 1]) {
          obj[key] = formatToCPF(obj[key])
        }

        return obj[key]
      }, vnode.context)
    }
  }
}

export { cpf }