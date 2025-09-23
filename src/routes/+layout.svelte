<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Погода в Кирово-Чепецке в этот день</title>
</svelte:head>

<div class="bg-slate-50 min-h-screen p-2 sm:p-4 lg:p-6">
	{@render children?.()}
</div>
