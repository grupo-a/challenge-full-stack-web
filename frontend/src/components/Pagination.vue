<template>
    <div>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <button class="pagination-previous" @click="onClickPreviousPage" :disabled="isInFirstPage">Anterior</button>
            <button class="pagination-next" @click="onClickNextPage" :disabled="isInLastPage">Próxima</button>
            <ul class="pagination-list">
                <li><button class="button" @click="onClickFirstPage" :disabled="isInFirstPage">Primeira</button></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li v-for="page in pages" :key="page.name">
                    <button class="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                        :class="{ 'is-current': isPageActive(page.name) }">{{
                            page.name
                        }}</button>
                </li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><button class="button" @click="onClickLastPage" :disabled="isInLastPage">Última</button></li>
            </ul>
        </nav>
    </div>

</template>


<script>
export default {
    name: 'StudentPagination',
    emits: ['pageChanged'],
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }
            if (this.currentPage === this.totalPages) {
                const start = this.totalPages - (this.maxVisibleButtons - 1);

                if (start === 0) {
                    return 1;
                } else {
                    return start;
                }
            }
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            if (this.currentPage === 1) {
                return true
            } else {
                return false
            }
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        }
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pageChanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pageChanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pageChanged', page);
        },
        onClickNextPage() {
            this.$emit('pageChanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pageChanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    }
}


</script>

<style scoped>
.active {
    background-color: #4AAE9B;
    color: #ffffff;
}

.pagination-previous {
    background-color: white;
}

.pagination-next {
    background-color: white;
}
</style>