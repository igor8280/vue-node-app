<template>
	<el-form :model="language" :rules="rules" ref="form" :label-position="'top'">
		<el-row>
			<el-col :span="6">
				<el-form-item label="Name" prop="name">
					<el-input v-model="language.name" :maxLength="100"/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Language ISO Code" prop="isoCodeTwoB">
					<el-input v-model="language.isoCodeTwoB" :maxLength="3"/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Shortlisted">
					<el-switch v-model="language.shortlisted"></el-switch>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-form-item label="Description">
					<el-input type="textarea" v-model="language.description" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		name: 'edit-language',
		data() {
			return {
				id: '',
				formCreate: '',
				language: {
					name: '',
					isoCodeTwoB: '',
					description: '',
					shortlisted: false
				},
				rules: {
					name: [{required: true, max: 100, trigger: 'blur'}],
					isoCodeTwoB: [{required: true, min: 3, max: 3, trigger: 'blur'}]
				}
			};
		},
		mounted() {
			this.id = this.$route.params.id;
			this.formCreate = this.id === 'create';

			this.$store.dispatch('setHeader', {
				type: 'edit',
				title: ((this.formCreate) ? 'Add' : 'Edit') + ' Language',
				save: this.saveLanguage
			});

			if (!this.formCreate)
				this.getLanguage();
		},
		methods: {
			getLanguage() {
				this.$api.languages.get({id: this.id}).then((response) => {
					return response.json();
				}).then((data) => {
					this.language = data;
				}, this.$utils('handleError'));
			},
			saveLanguage() {
				this.$refs.form.validate(valid => {
					if (valid) {
						let data = JSON.stringify(this.language);

						if (this.formCreate) {
							this.$api.languages.save(data).then(() => {
								this.$utils('goBack', {msg: 'Language created successfully'});
							}, (error) => {
								this.$utils('handleError', error, {msg: 'Language creating failed'});
							});
						}
						else {
							this.$api.languages.update({id: this.id}, data).then(() => {
								this.$utils('goBack', {msg: 'Language edited successfully'});
							}, (error) => {
								this.$utils('handleError', error, {msg: 'Language edit failed'});
							});
						}
					}
				});
			}
		}
	};
</script>
