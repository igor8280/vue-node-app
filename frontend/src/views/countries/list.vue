<template>
	<div class="page">
		<el-row>
			<div class="toolbar">
				<div>
					<search-box v-model="search" @input="getCountriesBySearch()" />
				</div>
				<div>
					<el-button type="primary"
							   icon="el-icon-plus"
							   @click="edit('create')">
						Add new
					</el-button>
					<el-button type="danger"
							   icon="el-icon-delete"
							   :disabled="selectedCountries.length !== 1"
							   @click="deleteCountry">
						Delete
					</el-button>
				</div>
			</div>
		</el-row>
		<el-row>
			<!--Table-->
			<el-table v-if="countries.length"
					  :data="countries"
					  :default-sort="sortBy"
					  ref="table"
					  @sort-change="sort => $utils('changeSort', sort, getCountries)"
					  @selection-change="selectedCountries = $utils('rowsIds', $event)"
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
						prop="isoCodeTwo"
						label="ISO Code Two"
						sortable="custom"
						width="140">
				</el-table-column>
				<el-table-column
						align="center"
						prop="isoCodeThree"
						label="ISO Code Three"
						sortable="custom"
						width="160">
				</el-table-column>
				<el-table-column
						align="center"
						width="120"
						prop="currency"
						label="Currency"
						sortable="custom">
				</el-table-column>
				<el-table-column
						align="center"
						width="120"
						prop="taxRate"
						label="Tax Rate"
						sortable="custom">
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
			<pagination v-model="pagination" @input="getCountries" ref="pagination"/>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Countries',
		data() {
			return {
				countries: [],
				selectedCountries: [],
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
				title: 'Countries list'
			});
			this.$utils('autoLoad');
			this.getCountries();
		},
		methods: {
			getCountries() {
				let params = {
					...this.pagination,
					sortBy: this.$utils('sortToString')
				};

				if (this.search)
					params.search = this.search;

				this.gridLoad = true;
				this.$api.countries.get(params).then((response) => {
					return response.json();
				}).then((data) => {
					this.countries = data.content;
					this.pagination.page = data.page;
					this.pagination.limit = data.limit;
					this.pagination.total = data.total;
					this.gridLoad = false;
					this.$utils('autoSave');
				}, (error) => {
					this.$utils('handleError', error);
				});
			},
			getCountriesBySearch() {
				this.pagination.page = 1;
				this.getCountries();
			},
			edit(id) {
				this.$store.commit('saveRoute', this.$route.path);
				this.$router.push(/countries/ + id);
			},
			deleteCountry() {
				this.$api.countries.delete({id: this.selectedCountries[0]}).then((response) => {
					this.$utils('showResponse', response);
					this.$refs.pagination.decreaseTotal(1);
				}, (error) => {
					this.$utils('handleError', error);
				});
			}
		}
	};
</script>
