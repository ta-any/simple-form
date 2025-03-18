<template>
  <div class="container">
    <div class="container">
      <p class="fs-4" @click="toggleForm">
        {{ !isFormVisible ? 'Учетные записи' : '' }}
      </p>
      <button @click="toggleForm" class="btn btn-outline-secondary">
        {{ isFormVisible ? 'Скрыть форму' : '' }}
        <i v-if="!isFormVisible" class="bi bi-plus"></i>
      </button>
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
