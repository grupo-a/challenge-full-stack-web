<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="Buscar aluno..."
          clearable
          @update:model-value="fetchStudents"
        />
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="primary" class="mr-2" @click="openModal">Cadastrar</v-btn>
      </v-col>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th @click="sortBy('ra')">
            Registro Acadêmico
            <v-icon
              v-if="sortByField === 'ra' && sortOrder === 'ASC'"
              color="primary"
              size="small"
              >mdi-arrow-up</v-icon
            >
            <v-icon
              v-if="sortByField === 'ra' && sortOrder === 'DESC'"
              color="primary"
              size="small"
              >mdi-arrow-down</v-icon
            >
          </th>
          <th @click="sortBy('name')">
            Nome
            <v-icon
              v-if="sortByField === 'name' && sortOrder === 'ASC'"
              color="primary"
              size="small"
              >mdi-arrow-up</v-icon
            >
            <v-icon
              v-if="sortByField === 'name' && sortOrder === 'DESC'"
              color="primary"
              size="small"
              >mdi-arrow-down</v-icon
            >
          </th>
          <th @click="sortBy('cpf')">
            CPF
            <v-icon
              v-if="sortByField === 'cpf' && sortOrder === 'ASC'"
              color="primary"
              size="small"
              >mdi-arrow-up</v-icon
            >
            <v-icon
              v-if="sortByField === 'cpf' && sortOrder === 'DESC'"
              color="primary"
              size="small"
              >mdi-arrow-down</v-icon
            >
          </th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.ra }}</td>
          <td>{{ student.name }}</td>
          <td>{{ formatCpf(student.cpf) }}</td>
          <td>
            <v-btn
              size="x-small"
              icon
              color="info"
              class="mr-2"
              @click="editStudent(student)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              size="x-small"
              icon
              color="red"
              @click="askDeleteConfirmation(student.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="confirmDeleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <div style="white-space: pre-wrap">
            Tem certeza que deseja excluir este aluno?
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey" @click="confirmDeleteDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="red" @click="deleteStudent(deleteStudentId)"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-pagination
      v-model="page"
      :length="totalPages"
      @input="fetchStudents"
    ></v-pagination>

    <v-dialog
      v-model="modalOpen"
      persistent
      @keydown.esc="modalOpen = false"
      @click:outside="modalOpen = false"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          {{ selectedStudent ? "Editar Aluno" : "Cadastrar Aluno" }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.ra"
            label="Registro Acadêmico"
            maxlength="20"
            :rules="[rules.required]"
            :readonly="selectedStudent !== null"
            @input="validateRa"
          ></v-text-field>
          <v-text-field
            v-model="form.name"
            label="Nome"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="form.cpf"
            label="CPF"
            @update:model-value="applyCpfMask"
            maxlength="14"
            :rules="[rules.cpf]"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="E-mail"
            :rules="[rules.required]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="modalOpen = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveStudent">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.open" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "@/plugins/axios";
import { formatCpf } from "@/utils/formatters";

const students = ref([]);
const page = ref(1);
const totalPages = ref(1);
const search = ref("");
const sortByField = ref("createdAt");
const sortOrder = ref("DESC");
const modalOpen = ref(false);
const selectedStudent = ref(null);
const form = ref({ ra: "", name: "", cpf: "", email: "" });
const confirmDeleteDialog = ref(false);
const deleteStudentId = ref(null);

const snackbar = ref({
  open: false,
  message: "",
  color: "success",
});

const rules = {
  required: (value) => !!value || "Campo obrigatório.",
  cpf: (value) => /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(value) || "CPF inválido.",
};

const showSnackbar = (message, color = "success") => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.open = true;
};

const askDeleteConfirmation = (id) => {
  deleteStudentId.value = id;
  confirmDeleteDialog.value = true;
};

const fetchStudents = async () => {
  try {
    const { data } = await axios.get("/students", {
      params: {
        page: page.value,
        limit: 10,
        sort: sortOrder.value,
        sortBy: sortByField.value,
        ...(search.value?.length >= 3 ? { search: search.value } : {}),
      },
    });
    students.value = data.data;
    totalPages.value = Math.ceil(data.total / 10);
  } catch (error) {
    console.log(error);
    handleError(error, "Erro ao buscar alunos.");
  }
};

onMounted(fetchStudents);

const openModal = () => {
  selectedStudent.value = null;
  form.value = { ra: "", name: "", cpf: "", email: "" };
  modalOpen.value = true;
};

const handleError = (error, defaultMessage) => {
  console.error("Erro:", error);
  const errorMessage = error.response?.data?.message ?? defaultMessage;
  showSnackbar(errorMessage, "error");
};

const editStudent = (student) => {
  selectedStudent.value = student;
  form.value = { ...student };
  form.value.cpf = formatCpf(student.cpf);
  modalOpen.value = true;
};

const saveStudent = async () => {
  try {
    const studentData = {
      name: form.value.name,
      cpf: form.value.cpf.replace(/\D/g, ""),
      email: form.value.email,
    };

    if (selectedStudent.value) {
      await axios.patch(`/students/${selectedStudent.value.id}`, studentData);
      showSnackbar("Aluno alterado com sucesso!");
    } else {
      const newStudentData = {
        ra: form.value.ra,
        ...studentData,
      };
      await axios.post("/students", newStudentData);
      showSnackbar("Aluno cadastrado com sucesso!");
    }

    modalOpen.value = false;
    fetchStudents();
  } catch (error) {
    handleError(error, "Erro ao salvar alunos.");
  }
};

const deleteStudent = async (id) => {
  try {
    await axios.delete(`/students/${id}`);
    showSnackbar("Aluno excluído com sucesso!");
    fetchStudents();
  } catch (error) {
    handleError(error, "Erro ao excluir alunos.");
  } finally {
    confirmDeleteDialog.value = false;
  }
};

const sortBy = (field) => {
  if (sortByField.value === field) {
    sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
  } else {
    sortByField.value = field;
    sortOrder.value = "ASC";
  }
  fetchStudents();
};

const validateRa = () => {
  form.value.ra = form.value.ra.replace(/\D/g, "");
};

const applyCpfMask = (value) => {
  if (!value) return (form.value.cpf = "");

  let cpf = value.replace(/\D/g, "").slice(0, 11);

  let maskedCpf = cpf
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");

  form.value.cpf = maskedCpf;
};

watch(page, fetchStudents);
</script>
