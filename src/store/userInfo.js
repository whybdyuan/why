import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', {
    state: () => {
        return { name: '', username: '', sex: '', comment: '', img: '' }
    }
})