import { defineStore } from 'pinia';

interface Account {
    login: string;
    password: string;
    tags?: string;
}

export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: [] as Account[],
    }),
    actions: {
        addAccount(account: Account) {
            this.accounts.push(account);
            this.saveToLocalStorage();
        },
        deleteAccount(index: number) {
            this.accounts.splice(index, 1);
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem('accounts', JSON.stringify(this.accounts));
        },
        loadFromLocalStorage() {
            const savedAccounts = localStorage.getItem('accounts');
            if (savedAccounts) {
                this.accounts = JSON.parse(savedAccounts) as Account[];
            }
        },
    },
});