import { Client } from 'pg';

const DATABASE_URL = "postgresql://postgres:jece6ob63elur0xf@187.124.172.149:5432/postgres";

function humanizePunctuation(text: string): string {
    if (!text) return text;
    let result = text;
    // Pairs -> Parentheses
    result = result.replace(/(\s+)—\s+([^—\n]+?)\s+—(\s+)/g, '$1($2)$3');
    // Single -> Comma
    result = result.replace(/(\S)\s*—\s*(\S)/g, '$1, $2');
    return result;
}

async function main() {
    const client = new Client({
        connectionString: DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("Connected to SolarRV Database.");

        const res = await client.query('SELECT id, title, content, excerpt FROM "Post"');
        const posts = res.rows;
        console.log(`Analyzing ${posts.length} posts...`);

        let updatedCount = 0;
        for (const post of posts) {
            const newContent = humanizePunctuation(post.content);
            const newExcerpt = humanizePunctuation(post.excerpt);

            if (newContent !== post.content || newExcerpt !== post.excerpt) {
                await client.query(
                    'UPDATE "Post" SET content = $1, excerpt = $2 WHERE id = $3',
                    [newContent, newExcerpt, post.id]
                );
                console.log(`✅ Updated: ${post.title}`);
                updatedCount++;
            }
        }
        console.log(`Finished. Updated ${updatedCount} posts.`);
    } catch (err) {
        console.error("Error cleaning SolarRV DB:", err);
    } finally {
        await client.end();
    }
}

main();
