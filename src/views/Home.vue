<template>
   <div class="content">
      <h1>Table load</h1>
      <div class="content__nav">
         <button class="btn" @click="visibleUsers" :disabled="isVisibleUsers">Показать пользователей</button>
      </div>
      <Loader v-if="loading" />
      <tableUsers v-if="isVisibleUsers"
                  :users="USERS"
                  :headers="headers"
      />
   </div>
</template>

<script>
   import { mapActions, mapGetters } from 'vuex'
   import tableUsers from '@/components/table.vue'
   import Loader from '@/components/loader.vue'

    export default {
       name: "Home",
       data: () => ({
          isVisibleUsers: false,
          loading: false,
          headers: [
             {
                id: 1,
                name: 'Имя пользователя',
                value: 'fullname',
                sortable: true
             },
             {
                id: 2,
                name: 'Логин',
                value: 'uname',
                sortable: true
             },
             {
                id: 3,
                name: 'Компания',
                value: 'company',
                sortable: true
             },
             {
                id: 4,
                name: 'E-mail',
                value: 'email',
                sortable: true
             },
             {
                id: 5,
                name: 'Штат',
                value: 'address.state',
                sortable: false
             },
          ]
       }),
       components: {
          tableUsers,
          Loader
       },
       computed: {
         ...mapGetters([
           'USERS'
         ])
       },
       methods: {
          ...mapActions([
            'GET_USERS'
          ]),
          visibleUsers() {
             this.loading = true
             this.GET_USERS()
               .then(() => {
                  this.loading = false
                  this.isVisibleUsers = true
               })
          },
       },
       mounted() {

       }
    }
</script>

<style lang="scss" scoped>
   .content {
      max-width: 1100px;
      margin: 0 auto;
      &__nav {
         display: flex;
         align-items: center;
         justify-content: center;
         margin-bottom: 30px;
      }
   }
   .btn {
      background: #ecf1fe;
      border-radius: 3px;
      padding: 10px 17px;
      text-align: center;
      color: #61758f;
      border: none;
      outline: none;
      transition: all ease .3s;
      cursor: pointer;
      &:hover {
         background: #22a8e8;
         color: #fff;
      }
      &:focus {
         border: none;
         outline: none;
      }
   }
</style>