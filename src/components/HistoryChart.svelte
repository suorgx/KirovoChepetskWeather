<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartConfiguration } from 'chart.js';
	import type { WeatherResponse } from '../interfaces/WeatherResponse';
	import type { DataPoint } from '../interfaces/DataPoint';

	let { weather, data }: { weather: WeatherResponse; data: DataPoint[] } = $props();
	let canvas: HTMLCanvasElement;

	console.log(weather.location.localtime, data);

	onMount(() => {
		const yearLabels = data.map((d) => d.year);
		const avgValues = data.map((d) => d.average);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: yearLabels,
				datasets: [
					{
						data: avgValues,
						tension: 0.4
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { display: false }
				},
				scales: {
					x: {
						ticks: { autoSkip: true, maxRotation: 45, minRotation: 45 }
					}
				}
			},
			plugins: [
				{
					id: 'customCanvasBackgroundColor',
					beforeDraw: (chart) => {
						const ctx = chart.canvas.getContext('2d');
						if (!ctx) return;
						ctx.save();
						ctx.globalCompositeOperation = 'destination-over';
						ctx.fillStyle = 'white';
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					}
				}
			]
		};

		new Chart(ctx, config);
	});
</script>

<canvas bind:this={canvas}></canvas>
