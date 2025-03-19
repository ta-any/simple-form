<template>
  <form @submit.prevent="onSubmit" class="account-row">
    <div class="account-cell">
      <input
          id="label"
          v-model="label"
          type="text"
          class="form-control p-1 rounded-2"
          maxlength="50"
          placeholder=""
      />
    </div>
    <div class="account-cell">
      <select id="type" v-model="newAccount.type" class="form-select rounded-2">
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>
    <div class="account-cell" :class="{ 'login-expanded': newAccount.type !== 'Локальная' }">
      <input
          id="login"
          v-model="newAccount.login"
          type="text"
          class="form-control rounded-2 p-1"
          maxlength="100"
          required
          placeholder="Введите логин"
      />
    </div>
    <div class="account-cell" v-if="newAccount.type === 'Локальная'">
      <div class="input-group">
        <input
            id="password"
            v-model="newAccount.password"
            type="password"
            class="form-control p-1"
            maxlength="100"
            required
            placeholder="Введите пароль"
        />
      </div>
    </div>
    <div class="account-cell">
      <button type="submit" class="btn">
        <i class="bi bi-floppy-fill"></i>
      </button>
    </div>
    <div class="d-flex gap-2">
      <button type="button" class="btn btn-secondary" @click="onCancel">Отмена</button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

interface Label {
  text: string;
}

interface Account {
  labels: Label[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

export default defineComponent({
  emits: ['add-account', 'cancel'],
  setup(props, { emit }) {
    const newAccount = ref<Account>({
      labels: [],
      type: 'LDAP',
      login: '',
      password: null,
    });

    const label = ref<string>('');

    const onSubmit = (): void => {
      if (newAccount.value.type === 'LDAP') {
        newAccount.value.password = null;
      }

      const str = label.value;
      str.split(';').forEach((item: string) => {
        const obj: Label = { text: item };
        newAccount.value.labels.push(obj);
      });

      emit('add-account', { ...newAccount.value });
      newAccount.value = { labels: [], type: 'LDAP', login: '', password: null };
    };

    const onCancel = (): void => {
      emit('cancel');
    };

    return {
      newAccount,
      label,
      onSubmit,
      onCancel,
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
</style>