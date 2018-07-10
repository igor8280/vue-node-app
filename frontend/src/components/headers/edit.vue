<template>
	<div class="header__edit">
		<div class="return" @click="goBack">
			<i class="el-icon-arrow-left" title="Go back" />
		</div>
		<div class="title">
			<h1>{{header.title}}</h1>
		</div>
		<div class="actions">
			<el-button @click="save">Save</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'edit-header',
		computed: {
			header() {
				return this.$store.getters.header;
			}
		},
		methods: {
			goBack() {
				if (typeof this.header.goBack === 'function')
					this.header.goBack();
				else
					this.$utils('goBack');
			},
			save() {
				if (typeof this.header.save === 'function')
					this.header.save();
				else
					console.warn('Save method not defined');
			}
		}
	};
</script>
