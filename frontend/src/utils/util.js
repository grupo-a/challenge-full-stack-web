import vue from '../main'

export const confirmar = (message, title = 'Confirmação', type = 'question', options = {}) => {
    return vue.$confirm(message, title, type, options)
}