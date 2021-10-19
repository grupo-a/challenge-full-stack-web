<template>
  <div>
    <Header />
    <Sidebar />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Notification />
  </div>
</template>

<script>
import Notification from '@/components/common/Notification'
import Sidebar from '@/components/views/Sidebar'
import Header from '@/components/views/Header'
export default {
  name: 'Layout',

  components: {
    Notification,
    Sidebar,
    Header
  }
}
</script>
