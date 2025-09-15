import data from '$lib/data.json';

/** @type {import('./$types').RequestHandler} */
export function GET() {
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}