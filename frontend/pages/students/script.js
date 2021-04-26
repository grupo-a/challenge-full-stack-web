export default {
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Registro Acadêmico',
        align: 'start',
        sortable: false,
        value: 'academicRegistry',
      },
      { text: 'Nome', value: 'name' },
      { text: 'CPF', value: 'taxNumber' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          academicRegistry: '12345',
          name: 'Frozen Yogurt',
          taxNumber: '042.942.040-44',
        },
        {
          academicRegistry: '12345',
          name: 'Frozen Yogurt',
          taxNumber: '042.942.040-44',
        },
        {
          academicRegistry: '12345',
          name: 'Frozen Yogurt',
          taxNumber: '042.942.040-44',
        },
        {
          academicRegistry: '12345',
          name: 'Frozen Yogurt',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'Gingerbread',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'Jelly bean',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'Lollipop',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'Honeycomb',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'Donut',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
        {
          name: 'KitKat',
          academicRegistry: '12345',
          taxNumber: '042.942.040-44',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.names.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
  },
}