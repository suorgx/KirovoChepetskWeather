<script lang="ts">
	import HistoryChart from '../components/HistoryChart.svelte';
	import Loader from '../components/Loader.svelte';
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isLoading } from '$lib/stores/loading';

	import type { WeatherResponse } from '../interfaces/WeatherResponse';
	import type { DataPoint } from '../interfaces/DataPoint';

	let weather: WeatherResponse;
	let data: DataPoint[] = [];

	const API_KEY = '95b700e9c16d4442944105810251809';
	const city = 'Kirovo-Chepetsk';

	onMount(async () => {
		isLoading.set(true);

		try {
			const [dataRes, weatherRes] = await Promise.all([
				fetch('/api/data'),
				fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
			]);

			data = (await dataRes.json()).filter((d: DataPoint) => d.year % 2 === 0).reverse();
			weather = (await weatherRes.json()) as WeatherResponse;

			console.log(weather);
		} catch (err) {
			console.error('Ошибка при загрузке данных:', err);
		} finally {
			isLoading.set(false);
		}
	});
</script>

{#if $isLoading}
	<Loader />
{:else}
	<div class="container mx-auto" transition:fade>
		<Header {weather} />

		<div class="grid grid-cols-2 gap-4 p-6">
			<div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm">Скорость ветка</p>
					<p class="text-xl font-semibold">{weather.current.wind_kph}km/h</p>
				</div>
				<span class="text-3xl">💨</span>
			</div>
			<div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
				<div>
					<p class="text-gray-500 text-sm">Влажность</p>
					<p class="text-xl font-semibold">{weather.current.humidity}%</p>
				</div>
				<img src={weather.current.condition.icon} alt="Погода" class="w-16 h-16" />
			</div>
		</div>

		<div class="grid grid-cols-3 gap-6 p-6">
			<div class="bg-gradient-to-br from-blue-600 to-gray-700 text-white rounded-2xl shadow p-6">
				<p class="text-sm opacity-80">Температура сейчас</p>
				<p class="text-right text-sm">Время</p>
				<div class="mt-6 text-5xl font-bold">{weather.current.feelslike_c}°C</div>
				<p class="opacity-80">{weather.current.condition.text}</p>
			</div>

			<div class="col-span-2 bg-white rounded-2xl shadow p-6">
				<h3 class="text-gray-700 font-medium mb-4">Средняя температура в этот день, по годам</h3>
				<div class="flex items-center justify-center text-gray-400">
					<HistoryChart {weather} {data} />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-3 gap-6 p-6">
			<div class="col-span-2 bg-white rounded-2xl shadow p-6">
				<h3 class="text-gray-700 font-medium mb-4">Восход и закат в Кирово-Чепецке</h3>
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-500 text-sm">Восход солнца</p>
						<p class="text-lg font-semibold">05:00 AM</p>
					</div>
					<div>
						<p class="text-gray-500 text-sm">Закат</p>
						<p class="text-lg font-semibold">05:00 PM</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
