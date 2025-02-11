<template>
  <v-app>
    <v-navigation-drawer app permanent class="bg-primary">
      <v-list>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-title class="display-2 text-primary"
              >Módulo Acadêmico</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateToStudents">
          <v-list-item-content class="d-flex align-center" style="gap: 20px">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToStudents = () => {
  router.push("/dashboard/students");
};
</script>

<style scoped>
.v-list-item-content {
  display: flex;
  align-items: center;
}

.text-center {
  text-align: center;
}

.display-2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.bg-primary {
  background-color: #00bcd4 !important;
}
</style>
