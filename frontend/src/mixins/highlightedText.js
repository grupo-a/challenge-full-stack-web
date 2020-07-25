import { normalizeSync } from 'diacritics-normalizr'

export default {
  methods: {
    escapeHTML (str) {
      var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
      }

      return str.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag
      })
    },

    genFilteredText (search, text) {
      text = text || ''
      if (!search) return this.escapeHTML(text)
      const {
        start,
        middle,
        end
      } = this.getMaskedCharacters(search, text)
      return `${this.escapeHTML(start)}${this.genHighlight(middle)}${this.escapeHTML(end)}`
    },

    genHighlight (text) {
      return `<span class="v-list-item__mask">${this.escapeHTML(text)}</span>`
    },

    getMaskedCharacters (search, text) {
      const searchInput = normalizeSync(search || '').toString().toLocaleLowerCase()
      const index = normalizeSync(text.toLocaleLowerCase()).indexOf(searchInput)
      if (index < 0) return {
        start: '',
        middle: text,
        end: ''
      }
      const start = text.slice(0, index)
      const middle = text.slice(index, index + searchInput.length)
      const end = text.slice(index + searchInput.length)
      return {
        start,
        middle,
        end
      }
    }
  }
}