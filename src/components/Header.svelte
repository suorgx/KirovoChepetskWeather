<script lang="ts">
	import type { WeatherResponse } from '../interfaces/WeatherResponse';

	let { weather }: { weather: WeatherResponse } = $props();

	const formatLocalTime = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};
</script>

<header class="flex items-center justify-between p-2 sm:p-4 lg:p-6">
	<div>
		<h2 class="text-xl font-semibold text-gray-800">Киров, Погода в этот день</h2>
		<p class="text-gray-500">{formatLocalTime(weather.location.localtime)}</p>
	</div>
</header>
