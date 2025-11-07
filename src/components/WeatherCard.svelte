<script lang="ts">
	import type { ForecastHour } from '../interfaces/WeatherResponse';

	let { hour }: { hour: ForecastHour } = $props();

	const formatTime = (timeStr: string) => {
		const date = new Date(timeStr);
		return date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const formatDate = (timeStr: string) => {
		const date = new Date(timeStr);
		return date.toLocaleDateString('ru-RU', {
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<div
	class="bg-white rounded-2xl shadow-md px-1 py-2 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
>
	<div class="flex flex-col items-center text-center">
		<p class="text-xl text-gray-500 mb-0">{formatTime(hour.time)}</p>
		<p class="text-xs text-gray-400 mb-2">{formatDate(hour.time)}</p>
		<div class="mb-2">
			<img src={hour.condition.icon} alt={hour.condition.text} class="w-14 h-14 mx-auto" />
		</div>
		<p class="text-2xl font-bold text-gray-800 mb-1">{Math.round(hour.temp_c)}°C</p>
		<p
			class="text-xs text-gray-600 leading-tight px-1 min-h-[2.5rem] flex items-center justify-center"
		>
			{hour.condition.text}
		</p>
	</div>
</div>
