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
		vis_km: number;
		wind_kph: number;
		humidity: number;
	};
	forecast: {
		forecastday: ForecastDay[];
	};
}

export interface ForecastDay {
	date: string;
	date_epoch: number;
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		avgtemp_c: number;
		condition: {
			text: string;
			icon: string;
		};
	};
	astro: {
		sunrise: string;
		sunset: string;
	};
	hour: ForecastHour[];
}

export interface ForecastHour {
	time_epoch: number;
	time: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: {
		text: string;
		icon: string;
	};
}
