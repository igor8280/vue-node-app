<template>
	<div class="page-login">
		<el-row>
			<el-col :span="8" :offset="8">
				<el-form :model="credentials" :rules="rules" ref="form">
					<el-form-item label="Username" prop="username">
						<el-input v-model="credentials.username" />
					</el-form-item>
					<el-form-item label="Password" prop="password">
						<el-input type="password" v-model="credentials.password" />
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col align="center">
				<el-button type="primary" @click="login">
					Login
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import auth from '../services/auth';

	export default {
		name: 'signin',
		data() {
			return {
				credentials: {
					username: '',
					password: ''
				},
				rules: {
					username: [{required: true}],
					password: [{required: true}]
				}
			};
		},
		mounted() {
			this.$store.dispatch('setHeader', {
				type: ''
			});
		},
		methods: {
			login() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						auth.login(this, this.credentials, true).then(response => {
							if (response.status !== 200) {
								this.$message({
									showClose: true,
									type: 'error',
									message: response.body.message,
									duration: 2000
								});
							}
						});
					}
				});
			}
		}
	};
</script>
