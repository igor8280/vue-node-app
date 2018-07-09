<template>
    <el-pagination
            :current-page.sync="value.page"
            :page-size="value.limit"
            :total="value.total"
            @current-change="handlePageChange"
            layout="slot, prev, pager, next, jumper"
            :background="true"
            align="center">
        <span class="el-pagination__jump">
            Items per page &nbsp;
            <el-input type="number"
                      :value="value.limit"
                      @change="handleLimitChange"
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
			handlePageChange(page) {
				this.emit({page});
			},
			handleLimitChange(limit) {
				limit = isNaN(limit) ? 1 : +limit;
				if (limit <= 0)
					limit = 1;

				let page = this.value.page;
				let totalPages = Math.ceil(this.value.total / limit);
				if (page > totalPages)
					page = totalPages;

				this.emit({page, limit});
			},
			emit(data) {
				this.$emit('input', {...this.value, ...data});
			}
		}
	};
</script>
