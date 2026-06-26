import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://checkfoto.com';
const API_URL = 'https://checkfoto.com/api/app/eventController/listEventByEventType';

const DIST_PATH = path.resolve('dist');
const SITEMAP_PATH = path.join(DIST_PATH, 'sitemap.xml');

function isEventActive(event) {
    const now = new Date();

    const saleStart = new Date(event.photoSaleDate || '');
    const saleEnd = new Date(event.photoSaleEndDate || '');

    const eventDateActive =
        saleStart < now && saleEnd > now;

    return (
        eventDateActive &&
        event.status !== 'PENDING'
    );
}

function filterActiveEvents(events = []) {
    return events
        .filter((x) =>
            x.status !== 'DRAFT' &&
            x.status !== 'INACTIVE' &&
            x.eventUrl !== 'checkraceshop' &&
            !x.eventNameTh?.toLowerCase().includes('migrate') &&
            !x.eventNameTh?.toLowerCase().includes('test')
        )
        .filter(isEventActive);
}

async function fetchEvents() {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventType: '',
            registerStep: {
                listStep: []
            }
        })
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status}`);
    }

    const json = await res.json();
    const listEventByType = json?.data || [];

    const events = filterActiveEvents(listEventByType);

    console.table(
        events.map((e) => ({
            url: e.eventUrl,
            status: e.status,
            saleStart: e.photoSaleDate,
            saleEnd: e.photoSaleEndDate
        }))
    );

    return events;
}

function buildUrlXml({ loc, lastmod, changefreq, priority }) {
    return `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
    console.log('🗺  Generating sitemap.xml...');

    const listEventActive = await fetchEvents();

    let urls = [];

    // Homepage
    urls.push(
        buildUrlXml({
            loc: `${SITE_URL}/`,
            changefreq: 'daily',
            priority: '1.0'
        })
    );

    // Event pages
    for (const event of listEventActive) {
        urls.push(
            buildUrlXml({
                loc: `${SITE_URL}/event/${event.eventUrl}`,
                lastmod: event.lastUpdateDtm || event.photoSaleDate,
                changefreq: 'weekly',
                priority: '0.9'
            })
        );
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    fs.mkdirSync(DIST_PATH, { recursive: true });
    fs.writeFileSync(SITEMAP_PATH, sitemap.trim());

    console.log(`✅ sitemap.xml generated (${listEventActive.length} events)`);
}

generateSitemap().catch((err) => {
    console.error('❌ Sitemap generation failed');
    console.error(err);
    process.exit(1);
});