<template>
    <div class="search">
        <input type="text" v-model="searchValue">
        <button class="btn search__btn" @click="searchUsers(searchValue)">
            Найти
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "search",
        data: () => ({
            searchValue: '',
        }),
        computed: {
            ...mapGetters([
                'SEARCH_VALUE'
            ])
        },
        methods: {
            ...mapActions([
                'GET_SEARCH_VALUE'
            ]),
            searchUsers(value) {
                this.GET_SEARCH_VALUE(value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        background: #ecf1fe;
        border-radius: 3px;
        padding: 7px 17px;
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
    .search {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        input {
            width: 400px;
            height: 40px;
            border: 1px solid #efefef;
            border-radius: 5px;
            padding: 0 10px;
        }
        &__btn {
            margin-left: 15px;
            cursor: pointer;
            min-height: 40px;
        }
    }
</style>