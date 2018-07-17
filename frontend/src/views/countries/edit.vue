<template>
	<el-form class="page" :model="country" :rules="rules" ref="form" :label-position="'top'">
		<el-row>
			<el-col :span="6">
				<el-form-item label="Name" prop="name">
					<el-input v-model="country.name" :maxLength="100"/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Country ISO Code Two" prop="isoCodeTwo">
					<el-input v-model="country.isoCodeTwo" :maxLength="2"/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Country ISO Code Three" prop="isoCodeThree">
					<el-input v-model="country.isoCodeThree" :maxLength="3"/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-form-item label="Currency">
					<el-input v-model="country.currency" />
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Tax Rate (%)">
					<el-input-number :min="0" :max="100" v-model="country.taxRate" />
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Shortlisted">
					<el-switch v-model="country.shortListed"></el-switch>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-form-item label="Description">
					<el-input :rows="3" type="textarea" v-model="country.description" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		name: 'edit-country',
		data() {
			return {
				id: '',
				formCreate: '',
				country: {
					name: '',
					isoCodeTwo: '',
					isoCodeThree: '',
					description: '',
					taxRate: null,
					shortListed: false,
					currencyId: null
				},
				rules: {
					name: [{required: true, max: 100, trigger: 'blur'}],
					isoCodeTwo: [{required: true, min: 2, max: 2, trigger: 'blur'}],
					isoCodeThree: [{required: true, min: 3, max: 3, trigger: 'blur'}]
				}
			};
		},
		mounted() {
			this.id = this.$route.params.id;
			this.formCreate = this.id === 'create';

			this.$store.dispatch('setHeader', {
				type: 'edit',
				title: ((this.formCreate) ? 'Add' : 'Edit') + ' Country',
				save: this.saveCountry
			});

			if (!this.formCreate)
				this.getCountry();
		},
		methods: {
			getCountry() {
				this.$api.countries.get({id: this.id}).then((response) => {
					return response.json();
				}).then((data) => {
					this.country = data;
				}, error => {
					this.$utils('handleError', error);
				});
			},
			saveCountry() {
				this.$refs.form.validate(valid => {
					if (valid) {
						let data = JSON.stringify(this.country);

						if (this.formCreate) {
							this.$api.countries.save(data).then((response) => {
								this.$utils('showResponse', response);
								this.$utils('goBack');
							}, (error) => {
								this.$utils('handleError', error);
							});
						}
						else {
							this.$api.countries.update({id: this.id}, data).then((response) => {
								this.$utils('showResponse', response);
								this.$utils('goBack');
							}, (error) => {
								this.$utils('handleError', error);
							});
						}
					}
				});
			}
		}
	};
</script>
