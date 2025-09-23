export interface WeatherResponse {
	location: {
		name: string;
		country: string;
		localtime: string;
	};
	current: {
		temp_c: number;
		condition: {
			text: string;
			icon: string;
		};
		feelslike_c: number;
		wind_kph: number;
		humidity: number;
	};
	forecast: {
		forecastday: {
			date: string;
			astro: {
				sunrise: string;
				sunset: string;
			};
		}[];
	};
}
