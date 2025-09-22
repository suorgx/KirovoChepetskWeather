<script lang="ts">
	import type { WeatherResponse } from '../interfaces/WeatherResponse';

	let { weather }: { weather: WeatherResponse } = $props();
</script>

<header class="flex items-center justify-between p-6">
	<div>
		<h2 class="text-xl font-semibold text-gray-800">{weather.location.name}, Погода в этот день</h2>
		<p class="text-gray-500">{weather.location.localtime}</p>
	</div>
</header>
