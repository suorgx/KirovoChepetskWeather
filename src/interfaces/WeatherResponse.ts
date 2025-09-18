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
	};
}
