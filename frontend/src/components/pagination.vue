<template>
    <el-pagination v-show="value.total"
            :current-page.sync="value.page"
            :page-size="value.limit"
            :total="value.total"
            @current-change="changePage"
            layout="slot, prev, pager, next, jumper"
            :background="true"
            align="center">
        <span class="el-pagination__jump">
            Items per page &nbsp;
            <el-input type="number"
                      :value="value.limit"
                      @change="changeLimit"
                      class="el-input el-pagination__editor is-in-pagination"/>
            / {{value.total}}
        </span>
    </el-pagination>
</template>

<script>
	export default {
		name: 'PaginationComponent',
		props: {
			value: {
				required: true,
				type: Object,
				default: {
					page: 1,
					limit: 10,
					total: 0
				}
			}
		},

		methods: {
			changePage(page) {
				this.value.page = page;
				this.update();
			},
			changeLimit(limit) {
				limit = isNaN(limit) ? 1 : +limit;
				if (limit <= 0)
					limit = 1;

				this.value.limit = limit;
				this.update();
			},
			decreaseTotal(value) {
				this.value.total -= value;
				this.update();
			},
			calcPage() {
				let totalPages = Math.ceil(this.value.total / this.value.limit) || 1;
				if (this.value.page > totalPages)
					this.value.page = totalPages;
			},
			update() {
				this.calcPage();
				this.$emit('input', this.value);
			}
		}
	};
</script>
