<template>
	<div class="container wrap">
		<slot />
	</div>
</template>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 32px;
	}
</style>