<template>
    <div>
        <search />
        <div class="u-table">
            <div class="u-table__h">
                <p v-for="(item, index) in headers"
                   :key="item.id"
                   @click="sortList(item.value, index, item.sortable)">
                    {{ item.name }}
                    <span v-if="item.sortable" :class="isSortActive ? 'active' : ''"></span>
                </p>
            </div>
            <div class="u-table__cn">
                <rowTable v-for="user in paginatedUsers"
                          :key="user.id"
                          :rowTable="user" />
            </div>
            <div class="u-table__pg">
                <div class="page page--one" @click="pageClickOne()"><span></span></div>
                <div class="page"
                     v-for="page in pages"
                     :key="page"
                     @click="pageClick(page)"
                     :class="page === pageNumber ? 'active' : ''"
                >
                    {{ page }}
                </div>
                <div class="page page--last" @click="pageClickLast()"><span></span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import rowTable from '@/components/table-row'
    import search from '@/components/search'
    import { mapGetters } from 'vuex'

    export default {
        name: "table",
        props: {
            users: {
                type: Array,
                default: () => {
                    return []
                }
            },
            headers: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data: () => ({
            usersPage: 10,
            pageNumber: 1,
            isSortIndexActive: 0,
            isSortActive: false,
            filterList: []
        }),
        components: {
            rowTable,
            search
        },
        computed: {
            pages()  {
                return Math.ceil(this.users.length / 10)
            },
            paginatedUsers() {
                if(this.filterList.length) {
                    return this.filterList
                } else  {
                    let from = (this.pageNumber - 1) * this.usersPage,
                        to = from + this.usersPage;

                    return this.users.slice(from, to)
                }
            },
            ...mapGetters([
                'SEARCH_VALUE'
            ])
        },
        watch: {
            SEARCH_VALUE() {
                this.searchList(this.SEARCH_VALUE)
            }
        },
        methods: {
            pageClick(page) {
                this.pageNumber = page
            },
            pageClickOne() {
                this.pageNumber = 1
            },
            pageClickLast() {
                this.pageNumber = this.pages
            },
            sortList(value, index, sortable) {
                let vm = this;
                let valueSorting = value;
                this.isSortIndexActive = index
                this.isSortActive = !this.isSortActive
                if(sortable === true) {
                    this.paginatedUsers.sort(function (a, b) {
                        return (vm.isSortActive ? a[valueSorting].localeCompare(b[valueSorting]) : b[valueSorting].localeCompare(a[valueSorting]));
                    });
                }
            },
            searchList(value) {
                if (value) {
                    this.filterList = this.paginatedUsers
                    this.filterList = this.filterList.filter(function (item) {
                        return item.fullname.toLowerCase().includes(value.toLowerCase()) || item.uname.toLowerCase().includes(value.toLowerCase()) ||
                            item.company.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase()) ||
                            item.address.state.toLowerCase().includes(value.toLowerCase())
                    })
                } else {
                    this.filterList = ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .u-table {
        max-width: 1100px;
        margin: 0 auto;
        &__h {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #efefef;

            p {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(100%/ 5);
                max-height: 18px;
                text-align: center;
                cursor: pointer;

                &:last-of-type {
                    width: 5%;
                }
                span {
                    box-sizing: border-box;
                    position: relative;
                    display: none;
                    transform: scale(var(--ggs,1));
                    width: 22px;
                    height: 22px;
                    border: 2px solid transparent;
                    border-radius: 100px;

                    &:after {
                        content: "";
                        display: block;
                        box-sizing: border-box;
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border-bottom: 2px solid;
                        border-right: 2px solid;
                        transform: rotate(45deg);
                        left: 4px;
                        top: 2px;
                    }
                    &.active {
                        &:after {
                            transform: rotate(-135deg);
                            top: 7px;
                        }
                    }
                }
                &:hover {
                    span {
                        display: block;
                    }
                }
            }
        }
        &__pg {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 25px;
        }
        .page {
            padding: 10px;
            border: 1px solid #87da55;
            cursor: pointer;
            transition: all ease .3s;
            min-width: 30px;
            min-height: 20px;
            border-radius: 5px;

            &:hover {
                background: #efefef;

            }
            &.active {
                background: #22a8e8;
                border: 1px solid #22a8e8;
                color: #fff;
            }
            &--one {
                span {
                    box-sizing: border-box;
                    position: relative;
                    display: block;
                    transform: scale(var(--ggs,1));
                    width: 22px;
                    height: 22px;
                    &:after, &:before {
                        content: "";
                        display: block;
                        box-sizing: border-box;
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-left: 2px solid;
                        border-bottom: 2px solid;
                        transform: rotate(45deg);
                        top: 7px;
                        left: 6px;
                    }
                    &:after {
                        left: 11px
                    }
                }
            }
            &--last {
                span {
                    box-sizing: border-box;
                    position: relative;
                    display: block;
                    transform: scale(var(--ggs,1));
                    width: 22px;
                    height: 22px;
                    &:after, &:before {
                        content: "";
                        display: block;
                        box-sizing: border-box;
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-right: 2px solid;
                        border-top: 2px solid;
                        transform: rotate(45deg);
                        top: 7px;
                        right: 6px
                    }
                    &:after {
                        right: 11px
                    }
                }
            }
        }
    }
</style>