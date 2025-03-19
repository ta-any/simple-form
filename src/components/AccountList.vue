<template>
  <div class="account-table">
    <div class="account-header">
      <div class="header-cell">Метка</div>
      <div class="header-cell">Тип записи</div>
      <div class="header-cell">Логин</div>
      <div class="header-cell">Пароль</div>
    </div>

    <ul class="list-unstyled">
      <li v-for="(account, index) in accountStore.accounts" :key="index" class="account-row">
        <div class="account-cell">
          <input class="rounded-2 p-1" :value="account.labels.map(item => item.text).join(';') || 'Значение'">
        </div>
        <div class="account-cell">
          <select id="type" v-model="account.type" class="form-select rounded-2">
            <option value="LDAP">LDAP</option>
            <option value="Локальная">Локальная</option>
          </select>
        </div>
        <div class="account-cell" :class="{ 'login-expanded': account.type !== 'Локальная' }">
          <input class="rounded-2 p-1" :value="account.login">
        </div>
        <div class="account-cell" v-if="account.type === 'Локальная'">
          <div class="input-group">
            <input
                :type="showPassword[index] ? 'text' : 'password'"
                :value="account.password"
                class="form-control rounded-2 p-1 rounded-left"
                readonly
            >
            <span class="custom-eye-icon input-group-text bg-transparent" @click="togglePasswordVisibility(index)">
              <i :class="showPassword[index] ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
            </span>
          </div>
        </div>
        <div class="account-cell">
          <button @click="onDelete(index)" type="button" class="btn delete-btn">
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

<style scoped>
input {
  width: 100%;
  border: 1px solid #ccc !important;
}

.account-table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.account-header,
.account-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto; /* 4 столбца для данных + 1 для кнопки */
  gap: 10px;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Разделитель между строками */
}

.account-header {
  font-weight: bold;
  background-color: #f8f9fa; /* Фон для заголовков */
}

.header-cell,
.account-cell {
  display: flex;
  align-items: center;
}

.login-expanded {
  grid-column: span 2; /* Поле "Логин" занимает две колонки */
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545; /* Цвет иконки удаления */
}

.custom-eye-icon {
  background-color: transparent;
  cursor: pointer;
}

.rounded-left {
  border-radius: 5px 0 0 5px !important; /* Закругление только с левой стороны */
  border: 1px solid #ccc !important; /* Граница для наглядности */
  padding: 8px !important; /* Отступы внутри input */
  outline: none !important; /* Убираем стандартный outline при фокусе */
  border-right: none !important;
}

.rounded-left:focus {
  border-color: #66afe9; /* Изменение цвета границы при фокусе */
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.5); /* Тень при фокусе */
}
</style>