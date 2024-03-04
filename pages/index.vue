<template fluid>  
    <v-container class="fill-height" fluid>

      <v-row class="fill-height width-inherit ma-0">

        <v-col md="12">

          <v-card>

            <v-row class="row-toolbar ma-0" color="primary">

              <v-col md="4" class="text-left align-self-center">Alunos</v-col>
              <v-col md="4" class="text-center align-self-center"></v-col>
              <v-col md="4" class="text-right align-self-center">


                <v-btn class="mr-6" @click="exportExcel()">
                  <v-icon> mdi-file-excel </v-icon>
                  EXPORTAR DADOS

                </v-btn>

              </v-col>

            </v-row>

            <v-data-table v-model="selected" :headers="tableHeader" sortBy="idUser" :sortDesc="true" :items="dataUser"
              :search="search" :loading="loading" :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-page-first',
                lastIcon: 'mdi-page-last',
                prevIcon: 'mdi-chevron-left',
                nextIcon: 'mdi-chevron-right'
              }" item-key="idUser" show-select single-select @click:row="selectClick">

              <template v-slot:top>

                <v-row  class="ma-0">

                  <v-col md="6" class="font-weight-medium"> </v-col>

                  <v-col  md="12" class="text-right">

                    <v-btn color="primary" @click="openOperationsModal(0)" :disabled="typeUserAuth != 1">Incluir</v-btn>
                    <v-btn color="primary" @click="openOperationsModal(1)" :disabled="typeUserAuth != 1">Alterar</v-btn>
                    <v-btn color="primary" @click="openOperationsModal(2)" :disabled="typeUserAuth != 1">Excluir</v-btn>

                  </v-col>

                </v-row>

                <v-row>

                  <v-col md="12">

                    <v-text-field class="mx-4" v-model="search" label="Pesquisar"
                      append-icon="mdi-magnify"></v-text-field>

                  </v-col>

                </v-row>

              </template>

              <template v-slot:[`item.active`]="{ item }">

                <v-tooltip right>

                  <template v-slot:activator="{ on, attrs }">

                    <v-icon dense v-bind:class="setClassStatus(item)" v-bind="attrs" v-on="on">

                      mdi-circle

                    </v-icon>

                  </template>

                  <span>{{ item.active }}</span>

                </v-tooltip>

              </template>


            </v-data-table>

          </v-card>

        </v-col>

      </v-row>

      <ModalUser ref="modal-user" :operation="operation" :title="operationTitle" :typeUser="typeUserList"
        :educationalInstitution="educationalInstitutionList" :functionWhenConfirmingOperation="triggerOperation"
        :loading="loading" />

    </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import { exportExcell } from '../utils/excel/index';

import ModalUser from "../components/modal/user/index.vue";

export default {
  components: {
    ModalUser,
    exportExcell
  },
  data: () => ({
    selected: [],
    tableHeader: [
      { text: "Status", value: "active", width: "50px" },
      { text: "ID.Usuário", value: "idUser", width: "50px", sortable: false },
      { text: "ID.Aluno", value: "idStudent", width: "60px", sortable: false },
      { text: "RA", value: "ra", width: "135px", sortable: false },
      { text: "Instituição Ensino", value: "educationalInstitution", width: "100px", sortable: false },
      { text: "Nome", value: "name", width: "150px", sortable: false },
      { text: "CPF", value: "cpf", width: "100px", sortable: false },
      { text: "Telefone", value: "phoneNumber", width: "80px", sortable: false },
      { text: "E-mail", value: "email", width: "100px", sortable: false },
    ],
    dataUser: [],
    search: "",
    operation: 0,
    operationTitle: "",
    adminsitrator: true,

  }),
  computed: {
    ...mapGetters({
      typeUserList: "user/getTypeUser",
      educationalInstitutionList: "user/getEducationalInstitution",
      users: "user/getList",
      loading: "user/getLoading",
      closeModal: "user/getCloseModal",
      typeUserAuth: "auth/getUserType"
    }),

    thereAreRecordsSelected: function () {

      return this.$isEmpty(this.selected);

    }
  },
  watch: {
    users: {

      handler(newValue) {

        this.dataUser = [...newValue];
        this.selected = [];

      },
      deep: true

    }
  },
  methods: {

    setClassStatus(item) {
      let classStatus = "";
      let status = item?.active;
      switch (status) {
        case true:
          classStatus = "Ativo";
          break;

        case false:
          classStatus = "Bloqueado";
          break;
      }

      return classStatus;
    },

    openOperationsModal(operation) {

      this.operation = operation;
      this.setTitleOperation();

      if (operation !== 0) {

        this.$forEach(this.selected[0], (valor, chave) => {

          if (this.$refs["modal-user"].hasOwnProperty(chave)) {

            this.$refs["modal-user"][chave] = valor;

          }

        });

      }

      this.$refs["modal-user"].openModal();

    },
    setTitleOperation() {

      let idUser = !this.$isEmpty(this.selected) ? this.selected[0].idUser : "";

      switch (this.operation) {

        case 0:

          this.operationTitle = "Incluir novo Usuário/Aluno";
          break;

        case 1:

          this.operationTitle = `Alterar Usuário/Aluno: ${idUser}`;
          break;

        case 2:

          this.operationTitle = `Deseja realmente excluir o Usuário/Aluno: ${idUser}?`;
          break;

      }

    },
    triggerOperation(user) {

      switch (this.operation) {

        case 0:

          this.$store.dispatch("user/include", user)

            .then(() => {

              this.$toast.global.success("Usuário/Aluno inserido com sucesso!");
              this.$refs["modal-user"].closeModal();

            })
            .catch((e) => this.$toast.global.error(e.message));

          break;

        case 1:

          const changed = this.checkIfChanged(user);

          if (changed) {

            this.$store.dispatch("user/alter", { idUser: this.selected[0].idUser, user: user })

              .then(() => {

                this.$toast.global.success("Usuário/Aluno alterado com sucesso!");
                this.$refs["modal-user"].closeModal();

              })
              .catch((e) => this.$toast.global.error(e.message));

          } else {

            this.$refs["modal-user"].closeModal();
            this.$toast.global.info("Nenhuma alteração detectada");

          }
          break;

        case 2:

          this.$store.dispatch("user/delete", this.selected[0].idUser)

            .then(() => {

              this.$toast.global.success("Usuário/Aluno excluído com sucesso !");
              this.$refs["modal-user"].closeModal();

            })
            .catch((e) => this.$toast.global.error(e.message));
          break;

      }

    },
    checkIfChanged(news) {

      const old = {
        idRA: parseInt(this.selected[0].idRA),
        idUserType: parseInt(this.selected[0].idUserType),
        idUser: parseInt(this.selected[0].idUser),
        idStudent: parseInt(this.selected[0].idStudent),
        cpf: this.selected[0].cpf,
        email: this.selected[0].email,
        phoneNumber: this.selected[0].phoneNumber,
        active: this.selected[0].active,
      };

      return !this.$isEqual(news, old);

    },
    selectClick(event, line) {

      if (!this.$isEqual(this.selected[0], line.item)) {

        this.selected = [];
        this.selected.push(line.item);

      } else this.selected = [];

    },
    getDate() {
      return (
        this.$route.name + '_' + this.$moment(new Date()).format('YYYY-MM-DD_hh_mm_ss')
      )
    },
    exportExcel() {
      let nameArchive = this.getDate()
      exportExcell(this.users, nameArchive)
    },
  },
  created() {

    this.$store.dispatch("user/list");
    this.$store.dispatch("user/typeUserList");
    this.$store.dispatch("user/educationalInstitutionList");


  }

};


</script>

<style scoped>
.Ativo {

  color: #006236 !important;

}

.Bloqueado {

  color: #D32F2F !important;

}

.row-toolbar {

  background-color: rgb(85, 45, 248) !important;
  color: #fff !important;
  min-height: 64px !important;
  align-content: center !important;
  font-size: 1.25rem;

}

.width-inherit {

  width: inherit !important;

}

@media (min-width: 9999999px) {
  .container {
    max-width: 9999999px;
  }

  .no-container-style .container {
  max-width: 9999999px;
  min-width: 9999999px; 
}
}
</style>