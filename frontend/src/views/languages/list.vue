<template>
	<div>
		<el-row>
			<div class="toolbar">
				<div>
					<search-box v-model="search" @input="getLanguagesBySearch()" />
				</div>
				<div>
					<el-button type="primary"
							   icon="el-icon-plus"
							   @click="edit('create')">
						Add new
					</el-button>
					<el-button type="danger"
							   icon="el-icon-delete"
							   :disabled="selectedLanguages.length !== 1"
							   @click="deleteLanguage">
						Delete
					</el-button>
				</div>
			</div>
		</el-row>
		<el-row>
			<!--Table-->
			<el-table v-if="languages.length"
					  :data="languages"
					  :default-sort="sortBy"
					  ref="table"
					  @sort-change="sort => $utils('changeSort', sort, getLanguages)"
					  @selection-change="selectedLanguages = $utils('rowsIds', $event)"
					  v-loading="gridLoad"
					  border
					  stripe>
				<el-table-column
					type="selection"
					width="30">
				</el-table-column>
				<el-table-column
					align="left"
					prop="name"
					label="Name"
					sortable="custom">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row._id)">
							{{scope.row.name}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="isoCodeTwoB"
					label="ISO Code"
					sortable="custom"
					width="140">
				</el-table-column>
				<el-table-column
					align="center"
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
						<i v-if="scope.row.shortListed" class="el-icon-check" style="color: green;"></i>
						<i v-else class="el-icon-close" style="color: red;"></i>
					</template>
				</el-table-column>
			</el-table>
			<el-alert v-else title="There's no created items." type="warning" :closable="false" />
		</el-row>
		<el-row>
			<pagination v-model="pagination" @input="getLanguages" ref="pagination"/>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Languages',
		data() {
			return {
				languages: [],
				selectedLanguages: [],
				pagination: {},
				sortBy: {
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
			this.$utils('autoLoad');
			this.getLanguages();
		},
		methods: {
			getLanguages() {
				let params = {
					...this.pagination,
					sortBy: this.$utils('sortToString')
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
					this.$utils('autoSave');
				}, (error) => {
					this.$utils('handleError', error);
				});
			},
			getLanguagesBySearch() {
				this.pagination.page = 1;
				this.getLanguages();
			},
			edit(id) {
				this.$store.commit('saveRoute', this.$route.path);
				this.$router.push('/languages/' + id);
			},
			deleteLanguage() {
				this.$api.languages.delete({id: this.selectedLanguages[0]}).then((response) => {
					this.$utils('showResponse', response);
					this.$refs.pagination.decreaseTotal(1);
				}, (error) => {
					this.$utils('handleError', error);
				});
			}
		}
	};
</script>
