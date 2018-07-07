<template>
	<div>
		<el-row>
			<el-col :span="6">
				<search-box v-model="search" @input="getLanguagesBySearch()" />
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<!--Table-->
				<el-table v-if="languages.length"
						  :data="languages"
						  :default-sort="sort"
						  @sort-change="newSort => $utils.changeSort(newSort, sort, $refs.language, getLanguages)"
						  ref="language"
						  v-loading="gridLoad"
						  element-loading-text="Loading..."
						  border
						  stripe
						  style="width: 100%">
					<el-table-column
						type="selection"
						width="30">
					</el-table-column>
					<el-table-column
						align="left"
						prop="name"
						label="Name"
						sortable="custom"
						width="560">
					</el-table-column>
					<el-table-column
						align="center"
						prop="id"
						label="ID"
						sortable="custom"
						width="50">
					</el-table-column>
					<el-table-column
						align="center"
						prop="isoCodeOne"
						label="ISO Code One"
						sortable="custom"
						width="140">
					</el-table-column>
					<el-table-column
						align="center"
						prop="isoCodeTwoB"
						label="ISO Code Two B"
						sortable="custom"
						width="140">
					</el-table-column>
					<el-table-column
						align="center"
						prop="isoCodeTwoT"
						label="ISO Code Two T"
						sortable="custom"
						width="140">
					</el-table-column>
					<el-table-column
						align="center"
						width="160"
						prop="description"
						label="Description"
						sortable="custom">
					</el-table-column>
					<el-table-column
						align="center"
						width="140"
						prop="shortlisted"
						label="Short listed"
						sortable="custom">
						<template slot-scope="scope">
							<el-icon v-if="scope.row.shortlisted" name="el-input__icon el-icon-check vms-green"></el-icon>
							<el-icon v-else name="el-input__icon el-icon-close vms-red"></el-icon>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop=""
						label="">
					</el-table-column>
				</el-table>
				<pagination v-model="pagination" @input="getLanguages"/>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Languages',
		data() {
			return {
				languages: [],
				pagination: {},
				sort: {
					prop: 'name',
					order: 'ascending'
				},
				search: '',
				gridLoad: false
			};
		},
		mounted() {
			this.$store.dispatch('setHeader', {
				type: 'main',
				title: 'Languages list'
			});
			this.$utils.autoLoad(this);
			this.getLanguages();
		},
		methods: {
			getLanguages() {
				let params = {
					...this.pagination,
					sort: this.$utils.sortToString(this.sort)
				};

				if (this.search)
					params.search = this.search;

				this.gridLoad = true;
				this.$api.languages.get(params).then((response) => {
					return response.json();
				}).then((data) => {
					this.languages = data.content;
					this.pagination.page = +data.page;
					this.pagination.limit = +data.limit;
					this.pagination.total = +data.total;
					this.gridLoad = false;
					this.$utils.autoSave(this);
				}, (error) => {
					console.log(error);
				});
			},
			getLanguagesBySearch() {
				this.pagination.page = 1;
				this.getLanguages();
			}
		}
	};
</script>
