/**
 * Fast Indexing Protocol for IPTV Playlist 8K (iptvplaylist8k.com)
 * Submits all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 */
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const HOST = 'iptvplaylist8k.com';
const SITE_URL = 'https://iptvplaylist8k.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = 'iptvplaylist8k-indexnow-2026-key';
const LOCAL_DEV_SITEMAP = 'http://localhost:3020/sitemap.xml';

/**
 * Fetches and parses the sitemap URLs
 * Tries production sitemap -> local dev server sitemap -> local indexability.json
 */
async function getSitemapUrls() {
    console.log(`📡 Fetching sitemap from: ${SITEMAP_URL}`);
    
    // 1. Try production live sitemap
    try {
        const response = await fetch(SITEMAP_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/xml, text/xml, */*'
            },
            signal: AbortSignal.timeout(6000)
        });

        if (response.ok) {
            const data = await response.text();
            const urls = [...data.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
            if (urls.length > 0) {
                console.log(`✅ Loaded ${urls.length} URLs from live production sitemap.`);
                return urls;
            }
        }
    } catch (e) {
        console.log(`ℹ️ Live sitemap (${SITEMAP_URL}) not reachable: ${e.message}`);
    }

    // 2. Try local dev server sitemap
    try {
        console.log(`📡 Trying local dev sitemap: ${LOCAL_DEV_SITEMAP}`);
        const response = await fetch(LOCAL_DEV_SITEMAP, {
            signal: AbortSignal.timeout(4000)
        });
        if (response.ok) {
            const data = await response.text();
            const urls = [...data.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
            if (urls.length > 0) {
                console.log(`✅ Loaded ${urls.length} URLs from local dev sitemap.`);
                return urls;
            }
        }
    } catch (e) {
        console.log(`ℹ️ Dev server sitemap not reachable.`);
    }

    // 3. Fallback to seo/indexability.json directly from filesystem
    console.log(`📂 Reading indexable URLs directly from seo/indexability.json...`);
    const indexPath = path.join(__dirname, '..', 'seo', 'indexability.json');
    if (fs.existsSync(indexPath)) {
        const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        const urls = Object.entries(indexData)
            .filter(([_, val]) => val.status === 'index')
            .map(([p]) => (p === '/' ? SITE_URL : `${SITE_URL}${p}`));
        console.log(`✅ Loaded ${urls.length} approved URLs from project indexability index.`);
        return urls;
    }

    throw new Error('Could not retrieve URLs from live sitemap, dev server, or indexability.json');
}

/**
 * Submits URLs to IndexNow (Bing, Yandex, IndexNow.org)
 */
async function submitToIndexNow(urls) {
    const batchSize = 1000; // IndexNow handles up to 10k per batch
    
    const engines = [
        'https://api.indexnow.org/IndexNow',
        'https://www.bing.com/IndexNow',
        'https://yandex.com/indexnow'
    ];

    console.log(`\n🚀 Starting IndexNow submission for ${urls.length} URLs...`);

    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        
        for (const engine of engines) {
            try {
                const response = await fetch(engine, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Host': new URL(engine).hostname
                    },
                    body: JSON.stringify({
                        host: HOST,
                        key: INDEXNOW_KEY,
                        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                        urlList: batch
                    }),
                    signal: AbortSignal.timeout(10000)
                });

                if (response.ok || response.status === 200 || response.status === 202) {
                    console.log(`✅ Success (${response.status} ${response.statusText}): Submitted ${batch.length} URLs to ${engine}`);
                } else {
                    console.log(`⚠️ Warning: ${engine} returned status ${response.status} (${response.statusText})`);
                }
            } catch (error) {
                console.error(`❌ Error submitting to ${engine}:`, error.message);
            }
        }
    }
}

// MAIN EXECUTION
(async () => {
    try {
        console.log('⚡ Starting Fast Indexing Protocol for IPTV Playlist 8K...');
        console.log(`🌐 Target Host: ${HOST}`);
        console.log(`🔑 IndexNow Key: ${INDEXNOW_KEY}`);
        console.log(`📄 Key Location: ${SITE_URL}/${INDEXNOW_KEY}.txt`);
        
        // 1. Determine URLs
        let urls = [];
        const specificUrls = process.argv.slice(2).filter(arg => arg.startsWith('http'));

        if (specificUrls.length > 0) {
            console.log(`🎯 ${specificUrls.length} specific URL(s) provided.`);
            urls = specificUrls;
        } else {
            urls = await getSitemapUrls();
            console.log(`🔍 Total URLs to index: ${urls.length}`);
        }

        // 2. Submit to IndexNow Protocol (IndexNow.org / Bing / Yandex)
        if (urls.length > 0) {
            await submitToIndexNow(urls);
        }

        console.log('\n✨ All Done! Search engines (Bing, Yandex, IndexNow partner network) have been notified.');

    } catch (error) {
        console.error('\n🔥 Fatal Error:', error.message);
        process.exit(1);
    }
})();
