<script lang="ts">
	import { translateValue } from '$lib/translations';

	export let label: string;
	export let value: string | number;
	export let imageSrc: string | undefined = undefined;
	export let imageAlt: string = '';

	$: translatedValue = translateValue(value);
</script>

<div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
	<div>
		<p class="text-gray-500">{label}</p>
		<p class="text-xl font-semibold">{translatedValue}</p>
	</div>
	{#if imageSrc}
		<img src={imageSrc} alt={imageAlt} class="w-16 h-16" />
	{/if}
</div>
