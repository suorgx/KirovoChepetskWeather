<script>
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";
	import Header from "../components/Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Погода в Кирово-Чепецке в этот день</title>
</svelte:head>

<div class="bg-slate-50 min-h-screen p-8">
	<div class="container mx-auto">
		<Header />
		{@render children?.()}
	</div>
</div>
