<script lang="ts">
	import HistoryChart from '../components/HistoryChart.svelte';
	import Loader from '../components/Loader.svelte';
	import Header from '../components/Header.svelte';
	import WeatherInfo from '../components/WeatherInfo.svelte';
	import ForecastChart from '../components/ForecastChart.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isLoading } from '$lib/loading';

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
				fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&lang=ru&aqi=no`)
			]);

			data = (await dataRes.json()).filter((d: DataPoint) => d).reverse();
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

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 sm:p-4 lg:p-6">
			<WeatherInfo label="Температура сейчас" value={`${weather.current.temp_c}°C`} />
			<WeatherInfo label="Ощущается как" value={`${weather.current.feelslike_c}°C`} />
			<WeatherInfo
				label="Погода"
				value={weather.current.condition.text}
				imageSrc={weather.current.condition.icon}
				imageAlt="Погода"
			/>
			<WeatherInfo label="Влажность" value={`${weather.current.humidity}%`} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-2 sm:p-4 lg:p-6">
			<div class="col-span-3 bg-white rounded-2xl shadow p-6">
				<h3 class="text-gray-700 font-medium mb-4">Почасовой прогноз на сегодня</h3>
				<div class="flex items-center justify-center text-gray-400">
					<ForecastChart hours={weather.forecast.forecastday[0].hour} />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 sm:p-4 lg:p-6">
			<WeatherInfo
				label="Восход солнца"
				value={`${weather.forecast.forecastday[0].astro.sunrise.slice(0, 5)} утра`}
			/>
			<WeatherInfo
				label="Закат солнца"
				value={`${weather.forecast.forecastday[0].astro.sunset.slice(0, 5)} вечера`}
			/>
			<WeatherInfo label="Скорость ветра" value={`${weather.current.wind_kph} км/ч`} />
			<WeatherInfo label="Видимость" value={`${weather.current.vis_km} км`} />
		</div>

		<div class="grid grid-cols-1 gap-4 p-2 sm:p-4 lg:p-6">
			<div class="col-span-3 bg-white rounded-2xl shadow p-6">
				<h3 class="text-gray-700 font-medium mb-4">Средняя температура в этот день, по годам</h3>
				<div class="flex items-center justify-center text-gray-400">
					<HistoryChart {weather} {data} />
				</div>
			</div>
		</div>
	</div>
{/if}
