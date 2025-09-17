import { readFile } from 'fs/promises';
import path from 'path';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const month = url.searchParams.get('month');
	const day = url.searchParams.get('day');

	if (!month || !day) {
		throw error(400, 'Missing month or day parameter');
	}

	try {
		const filePath = path.resolve(`src/data/${Number(month)}/${Number(day)}/data.json`);

		const fileContent = await readFile(filePath, 'utf-8');
		const data = JSON.parse(fileContent);

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		throw error(404, `${err}, Data not found for this day`);
	}
}
