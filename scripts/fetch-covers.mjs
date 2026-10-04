// 一次性工具：通过 iTunes 公开搜索 API 获取专辑封面（无需登录）
// 用法: node scripts/fetch-covers.mjs
// 输出: public/images/covers/<slug>.jpg（600x600，Apple 官方 CDN）
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const albums = [
  { slug: 'weezer-green', title: 'Weezer (Green Album)', artist: 'Weezer', q: 'Weezer Green Album' },
  { slug: 'use-your-illusion-ii', title: 'Use Your Illusion II', artist: "Guns N' Roses", q: 'Guns N Roses Use Your Illusion II' },
  { slug: 'best-of-don-mclean', title: 'The Best of Don McLean', artist: 'Don McLean', q: 'Don McLean The Best of' },
  { slug: 'ziggy-stardust', title: 'The Rise and Fall of Ziggy Stardust', artist: 'David Bowie', q: 'David Bowie Ziggy Stardust' },
  { slug: 'winks-and-kisses', title: 'Winks & Kisses (20th Anniversary)', artist: 'Airiel', q: 'Airiel Winks Kisses' },
  { slug: 'mad-mad-world', title: 'Mad Mad World', artist: 'Tom Cochrane', q: 'Tom Cochrane Mad Mad World' },
  { slug: 'willy-and-the-poor-boys', title: 'Willy and the Poor Boys', artist: 'Creedence Clearwater Revival', q: 'Creedence Willy and the Poor Boys' },
  { slug: 'man-who-sold-the-world', title: 'The Man Who Sold the World', artist: 'David Bowie', q: 'David Bowie The Man Who Sold the World' },
  { slug: 'machine-head', title: 'Machine Head', artist: 'Deep Purple', q: 'Deep Purple Machine Head' },
  { slug: 'whos-next', title: "Who's Next", artist: 'The Who', q: 'The Who Who’s Next' },
  { slug: '21st-century-breakdown', title: '21st Century Breakdown', artist: 'Green Day', q: 'Green Day 21st Century Breakdown' },
  { slug: 'ok-computer', title: 'OK Computer', artist: 'Radiohead', q: 'Radiohead OK Computer' },
  { slug: 'weezer-blue', title: 'Weezer (Blue Album)', artist: 'Weezer', q: 'Weezer Blue Album 1994' },
  { slug: 'billy-joel-greatest-hits', title: 'Greatest Hits, Vol. I & II', artist: 'Billy Joel', q: 'Billy Joel Greatest Hits Vol I II' },
  { slug: 'highway-61-revisited', title: 'Highway 61 Revisited', artist: 'Bob Dylan', q: 'Bob Dylan Highway 61 Revisited' },
  { slug: 'queen-platinum-collection', title: 'The Platinum Collection', artist: 'Queen', q: 'Queen Platinum Collection' },
  { slug: 'queen-a-day-at-the-races', title: 'A Day at the Races', artist: 'Queen', q: 'Queen A Day at the Races' },
  { slug: 'queen-bohemian-rhapsody', title: 'Bohemian Rhapsody (OST)', artist: 'Queen', q: 'Queen Bohemian Rhapsody Soundtrack' },
  { slug: 'queen-made-in-heaven', title: 'Made in Heaven', artist: 'Queen', q: 'Queen Made in Heaven' },
  { slug: 'queen-the-game', title: 'The Game', artist: 'Queen', q: 'Queen The Game' },
  { slug: 'queen-the-works', title: 'The Works', artist: 'Queen', q: 'Queen The Works' },
  { slug: 'queen-sheer-heart-attack', title: 'Sheer Heart Attack', artist: 'Queen', q: 'Queen Sheer Heart Attack' },
  { slug: 'queen-hot-space', title: 'Hot Space', artist: 'Queen', q: 'Queen Hot Space' },
  { slug: 'queen-a-night-at-the-opera', title: 'A Night at the Opera', artist: 'Queen', q: 'Queen A Night at the Opera' },
  { slug: 'queen-news-of-the-world', title: 'News of the World', artist: 'Queen', q: 'Queen News of the World' },
  { slug: 'acdc-iron-man-2', title: 'Iron Man 2', artist: 'AC/DC', q: 'AC/DC Iron Man 2' },
  { slug: 'acdc-rock-or-bust', title: 'Rock or Bust', artist: 'AC/DC', q: 'AC/DC Rock or Bust' },
  { slug: 'acdc-back-in-black', title: 'Back in Black', artist: 'AC/DC', q: 'AC/DC Back in Black' },
  { slug: 'acdc-high-voltage', title: 'High Voltage', artist: 'AC/DC', q: 'AC/DC High Voltage' },
  { slug: 'acdc-dirty-deeds', title: 'Dirty Deeds Done Dirt Cheap', artist: 'AC/DC', q: 'AC/DC Dirty Deeds Done Dirt Cheap' },
  { slug: 'acdc-the-razors-edge', title: 'The Razors Edge', artist: 'AC/DC', q: 'AC/DC The Razors Edge' },
  { slug: 'acdc-highway-to-hell', title: 'Highway to Hell', artist: 'AC/DC', q: 'AC/DC Highway to Hell' },
  { slug: 'radiohead-the-bends', title: 'The Bends', artist: 'Radiohead', q: 'Radiohead The Bends' },
  { slug: 'radiohead-creep-ep', title: 'Creep - EP', artist: 'Radiohead', q: 'Radiohead Creep EP' },
  { slug: 'rhcp-stadium-arcadium', title: 'Stadium Arcadium', artist: 'Red Hot Chili Peppers', q: 'Red Hot Chili Peppers Stadium Arcadium' },
  { slug: 'dominic-fike-demos', title: "Don't Forget About Me, Demos - EP", artist: 'Dominic Fike', q: 'Dominic Fike Don’t Forget About Me Demos' },
  { slug: 'the-animals-singles-plus', title: 'The Singles Plus', artist: 'The Animals', q: 'The Animals The Singles Plus' },
  { slug: '80s-hair-metal', title: "This Is '80s Hair Metal", artist: 'Various Artists', q: '80s Hair Metal compilation' },
  { slug: 'baldurs-gate-3-ost', title: "Baldur's Gate 3 (Original Game Soundtrack)", artist: 'Borislav Slavov', q: 'Baldur’s Gate 3 Soundtrack Borislav Slavov' },
  { slug: 'chuck-berry-is-on-top', title: 'Berry Is On Top', artist: 'Chuck Berry', q: 'Chuck Berry Berry Is On Top' },
  { slug: 'chuck-berry-st-louis-to-liverpool', title: 'St. Louis to Liverpool', artist: 'Chuck Berry', q: 'Chuck Berry St. Louis to Liverpool' },
  { slug: 'aerosmith-debut', title: 'Aerosmith', artist: 'Aerosmith', q: 'Aerosmith Aerosmith 1973' },
  { slug: 'lynyrd-skynyrd-pronounced', title: "(Pronounced 'Lĕh-'nérd 'Skin-'nérd)", artist: 'Lynyrd Skynyrd', q: 'Lynyrd Skynyrd Pronounced Leh-nerd Skin-nerd' },
  { slug: 'nakajima-miyuki-koibumi', title: '恋文', artist: '中島みゆき', q: '中島みゆき 恋文' },
  { slug: 'dylan-times-they-are-a-changin', title: "The Times They Are A-Changin'", artist: 'Bob Dylan', q: 'Bob Dylan The Times They Are A-Changin' },
  { slug: 'dylan-pat-garrett', title: 'Pat Garrett & Billy the Kid', artist: 'Bob Dylan', q: 'Bob Dylan Pat Garrett Billy the Kid' },
  { slug: 'dylan-freewheelin', title: "The Freewheelin' Bob Dylan", artist: 'Bob Dylan', q: 'Bob Dylan Freewheelin' },
  { slug: 'bcnr-ants-from-up-there', title: 'Ants From Up There', artist: 'Black Country, New Road', q: 'Black Country New Road Ants From Up There' },
  { slug: 'arcade-fire-funeral', title: 'Funeral', artist: 'Arcade Fire', q: 'Arcade Fire Funeral' },
  { slug: 'american-football-lp1', title: 'American Football (Deluxe Edition)', artist: 'American Football', q: 'American Football American Football Deluxe' },
  { slug: 'gnr-appetite', title: 'Appetite for Destruction', artist: "Guns N' Roses", q: 'Guns N Roses Appetite for Destruction' }
]

const outDir = new URL('../public/images/covers/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
await mkdir(outDir, { recursive: true })

let ok = 0
const failed = []
for (const a of albums) {
  const dest = `${outDir}${a.slug}.jpg`
  if (existsSync(dest)) {
    ok++
    continue
  }
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(a.q)}&entity=album&limit=5`
    const res = await fetch(url)
    const data = await res.json()
    const hit =
      data.results?.find((r) =>
        r.collectionName?.toLowerCase().includes(a.title.split('(')[0].trim().toLowerCase().slice(0, 10))
      ) ||
      data.results?.find((r) => r.artistName?.toLowerCase().includes(a.artist.split(' ')[0].toLowerCase())) ||
      data.results?.[0]
    if (!hit?.artworkUrl100) throw new Error('no result')
    const big = hit.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
    const img = await fetch(big)
    if (!img.ok) throw new Error('download failed')
    await writeFile(dest, Buffer.from(await img.arrayBuffer()))
    ok++
    console.log(`OK  ${a.slug}  <- ${hit.collectionName}`)
  } catch (e) {
    failed.push(a.slug)
    console.log(`FAIL ${a.slug}  (${e.message})`)
  }
  await new Promise((r) => setTimeout(r, 1200))
}
console.log(`\n完成: ${ok}/${albums.length}，失败: ${failed.length ? failed.join(', ') : '无'}`)
