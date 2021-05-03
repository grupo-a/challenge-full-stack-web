export default {
  name: 'DeleteMessage',
  props: {
    value: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    accept() {
      this.$emit('accept')
    },
    reject() {
      this.$emit('reject')
    },
  },
}