<template>
	<footer class="modal-footer">
		<slot />
	</footer>
</template>

<style lang="scss">
	.modal-footer {
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--border-mid);
		gap: 8px;
		background: var(--bg-alt);
		padding: 16px 24px;
		border-radius: 0 0 4px 4px;
	}
</style>