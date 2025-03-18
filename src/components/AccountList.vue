<template>
  <div class="account-table">
    <ul class="list-unstyled">
      <li v-for="(account, index) in accountStore.accounts" :key="index" class="account-row">
        <div class="account-cell">
          <input class="" :value="account.labels.map((item: object) => item.text).join(';') || 'Значение'">
        </div>
        <div class="account-cell">
          <select id="type" v-model="account.type" class="form-select rounded-2">
            <option value="LDAP">LDAP</option>
            <option value="Локальная">Локальная</option>
          </select>
        </div>
        <div class="account-cell" :class="{ 'login-expanded': account.type !== 'Локальная' }">
          <input class="" :value="account.login">
        </div>
        <div class="account-cell" v-if="account.type === 'Локальная'">
          <div class="">
            <input
                :type="showPassword[index] ? 'text' : 'password'"
                :value="account.password"
                class=""
                readonly
            >
            <span class="custom-eye-icon" @click="togglePasswordVisibility(index)">
              <i :class="showPassword[index] ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
            </span>
          </div>
        </div>
        <div class="account-cell">
          <button @click="onDelete(index)" type="button" class="btn">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAccountStore } from '../stores/accountStore';

export default defineComponent({
  setup() {
    const accountStore = useAccountStore();
    const showPassword = ref<boolean[]>([]);

    // Инициализация массива showPassword
    showPassword.value = new Array(accountStore.accounts.length).fill(false);

    const onDelete = (index: number): void => {
      accountStore.deleteAccount(index);
      // Удаляем состояние видимости пароля для удаленного аккаунта
      showPassword.value.splice(index, 1);
    };

    const togglePasswordVisibility = (index: number): void => {
      showPassword.value[index] = !showPassword.value[index];
    };

    return {
      showPassword,
      accountStore,
      onDelete,
      togglePasswordVisibility,
    };
  },
});
</script>
