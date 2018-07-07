<template>
	<el-input :value="value" placeholder="Search..." @change="emit">
		<el-button slot="append" icon="el-icon-search"></el-button>
	</el-input>
</template>

<script>
	export default {
		props: ['value'],
		name: 'search-box',
		methods: {
			emit(value) {
				this.$emit('input', value);
			}
		}
	};
</script>
