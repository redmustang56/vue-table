<template>
    <div>
        <div class="u-table__row" @click="openPopup">
            <div class="u-table__row-name"
                 v-for="(item, index) in rowTable"
                 :key="index"
            >
                {{ item.state ? item.state : item }}
            </div>
        </div>
        <popup
                v-if="isInfoPopupVisible"
                @closePopup="closePopup"
        >
            <div>
                <p> Имя - {{ rowTable.fullname }}</p>
                <p > Улица - {{ rowTable.address.streetAddress }}</p>
                <p > Город - {{ rowTable.address.city }}</p>
                <p > Штат - {{ rowTable.address.state }}</p>
                <p > Zip - {{ rowTable.address.zip }}</p>
            </div>
        </popup>
    </div>
</template>

<script>
    import popup from '@/components/popup.vue'

    export default {
        name: "table-row",
        props: {
            rowTable: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data: () => ({
            isInfoPopupVisible: false
        }),
        components: {
            popup
        },
        methods: {
            openPopup() {
                this.isInfoPopupVisible = true
            },
            closePopup() {
                this.isInfoPopupVisible = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .u-table {
        &__row {
            display: flex;
            justify-content: space-around;
            
            &-name {
                width: calc(100%/ 5);
                padding: 10px 15px;
                text-align: left;
                border: 1px solid #efefef;
                &:last-of-type {
                    width: 5%;
                }
            }
        }
    }
</style>