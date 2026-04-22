import { Client } from 'pg';

const DATABASE_URL = "postgresql://postgres:jece6ob63elur0xf@187.124.172.149:5432/postgres";

async function main() {
    const client = new Client({ connectionString: DATABASE_URL });
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM "Post" WHERE content LIKE \'%—%\' OR excerpt LIKE \'%—%\'');
        console.log(`Found ${res.rows[0].count} posts with em-dashes.`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
main();
