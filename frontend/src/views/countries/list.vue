<template>
    <el-row>
        <el-col :span="18">
            <el-button @click="$store.dispatch('showMenu',!$store.getters.showMenu)">toggle</el-button>
            <!--Table-->
            <el-table v-if="countries.length"
                      :data="countries"
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
                        data-th="Name"
                        sortable="custom"
                        width="560">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="id"
                        label="ID"
                        data-th="ID"
                        sortable="custom"
                        width="50">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="isoCodeTwo"
                        label="ISO Code Two"
                        data-th="ISO Code Two"
                        sortable="custom"
                        width="140">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="isoCodeThree"
                        label="ISO Code Three"
                        data-th="ISO Code Three"
                        sortable="custom"
                        width="160">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="120"
                        prop="currency.code"
                        label="Currency"
                        data-th="Currency"
                        sortable="custom">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="120"
                        prop="taxRate"
                        label="Tax Rate"
                        data-th="Tax Rate"
                        sortable="custom">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="160"
                        prop="description"
                        label="Description"
                        data-th="Description">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="140"
                        prop="shortlisted"
                        label="Short listed"
                        data-th="Short listed"
                        sortable="custom">
                    <template slot-scope="scope">
                        <el-icon v-if="scope.row.shortlisted" name="el-input__icon el-icon-check vms-green"></el-icon>
                        <el-icon v-else name="el-input__icon el-icon-close vms-red"></el-icon>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop=""
                        label=""
                        data-th=""
                        sortable="custom">
                </el-table-column>
            </el-table>
            <!--End Table-->
        </el-col>
        <el-col :span="6">
            <h1>Sidebar</h1>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		name: 'Countries',
		data() {
			return {
				countries: [],
				gridLoad: false,
				resource: {}
			};
		},
		mounted() {
			this.resource = this.$resource('/proxy/countries');
			this.getCountries();
		},
		methods: {
			getCountries() {
				let params = {
					'size': 10,
					'page': 0
				};
				this.gridLoad = true;
				this.resource.get(params).then((response) => {
					return response.json();
				}).then((data) => {
					this.countries = data.content;
					this.gridLoad = false;
				}, (error) => {
					console.log(error);
				});
			}
		}
	};
</script>