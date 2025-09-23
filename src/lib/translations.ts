export const valueTranslations: Record<string, string> = {
	'Patchy rain nearby': 'Мелкий дождь неподалеку'
};

export function translateValue(value: string | number): string | number {
	if (typeof value === 'string') {
		return valueTranslations[value] || value;
	}
	return value;
}
