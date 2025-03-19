<template>
  <div class="container">
    <div class="container mt-2 gx-5 my-3 p-3 d-flex align-items-center gap-3">
      <span class="fs-4" @click="toggleForm">
        {{ !isFormVisible ? 'Учетные записи' : '' }}
      </span>
      <button  v-if="!isFormVisible" @click="toggleForm" class="btn btn-outline-secondary">
        <i class="bi bi-plus"></i>
      </button>
    </div>
    <div class="container mt-2 gx-5 my-3 p-3 bg-light rounded-2">
      <i class="bi bi-exclamation-octagon-fill me-2"></i>
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
    </div>
    <AccountList />
    <AccountForm
        v-if="isFormVisible"
        @add-account="handleAddAccount"
        @cancel="toggleForm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useAccountStore } from './stores/accountStore';
import AccountList from './components/AccountList.vue';
import AccountForm from "@/components/AccountForm.vue";


interface Account {
  login: string;
  password: string;
  tags?: string;
}

export default defineComponent({
  name: 'App',
  components: {
    AccountForm,
    AccountList,
  },
  setup() {
    const accountStore = useAccountStore();
    const isFormVisible = ref<boolean>(false);

    onMounted(() => {
      accountStore.loadFromLocalStorage();
    });

    const toggleForm = (): void => {
      isFormVisible.value = !isFormVisible.value;
    };

    const handleAddAccount = (account: Account): void => {
      accountStore.addAccount(account);
      toggleForm();
    };

    return {
      isFormVisible,
      toggleForm,
      handleAddAccount,
      accountStore,
    };
  },
});
</script>
<style>
p{
  margin: 0 !important;
}
</style>