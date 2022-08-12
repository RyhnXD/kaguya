import { promises, readFileSync } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'

let emot = `${pickRandom(['⎔', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '▢', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
const defaultMenu = {
  before: `
Hai, *%name!* %ucapan

*᯽ᴛᴀɴɢɢᴀʟ:* %week, %date
*᯽ᴡᴀᴋᴛᴜ:* %time
*᯽ʀᴜɴᴛɪᴍᴇ:* %uptime (%muptime)
*᯽ᴘᴇɴɢɢᴜɴᴀ:* %totalreg Orang
*᯽ʟɪʙ:* Baileys-Md
*᯽ʟᴀɴɢᴜᴀɢᴇ:* Javascript,Ts-Node
*᯽ғɪᴛᴜʀ:* %totalfeatures command

%readmore
*ᴊᴏɪɴ ᴍʏ ɢʀᴏᴜᴘ:* https://bit.ly/3vU9BOw
*ɴᴏᴛᴇ:*
ᴊɪᴋᴀ ʀᴇsᴘᴏɴ ᴛɪᴅᴀᴋ ᴍᴜɴᴄᴜʟ ᴍᴜɴɢᴋɪɴ ᴛᴇʀᴊᴀᴅɪ ᴇʀʀᴏʀ
`.trimStart(),
  header: `${cmenut} *%category* ${cmenuh}`,
  body: `┊${emot} %cmd %islimit %isPremium`,
  footer: `${cmenuf}`,
  after: `${cmenua}`,
}
let handler = async (m, { conn, command, groupMetadata, usedPrefix: _p, __dirname, args }) => {

     let res = JSON.parse(readFileSync('./json/emoji.json'))
     let em = res.emoji
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned, pasangan } = global.db.data.users[who]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(who)
    let pp = await conn.profilePictureUrl(who).catch(_ => './src/avatar_contact.png')
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Warrior V',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
     let math = max - xp
     let ktnya = [`\n\n\n ${em.getRandom()} Hai *${name}* : _Mungkin menu ini bermanfaat?_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Terimakasih sudah menggunakan bot ini_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Semoga gak erorr_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Jika lama kemungkiman erorr atau delay_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Menampilkan menu_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Wait..._`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Dua tiga kucing berlari_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Bentar bang akan kutampilkan menunya_`,
 `\n\n\n ${em.getRandom()} Hai *${name}* : _Prosess..._`]
 let ktx = ktnya.getRandom()
     let tags
     let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'admin', 'advanced', 'anonymous', 'audio', 'Baileys', 'database', 'downloader', 'edukasi', 'fun', 'game', 'group', 'host', 'info', 'internet', 'jadian', 'jadibot', 'kerang', 'main', 'maker', 'nocategory', 'nsfw', 'nulis', 'owner', 'premium', 'primbon', 'quotes', 'quran', 'random', 'rpg', 'sticker', 'tools', 'vote', 'xp']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'Main',
  'rpg': 'RolePlay Games',
  'xp': 'Exp & Limit',
  'jadian': 'Jadian',
  'sticker': 'Sticker',
  'edukasi': 'Edukasi',
  'quran': 'Al Quran',
  'tools': 'Tools',
  'kerang': 'Kerang Ajaib',
  'primbon': 'Primbon',
  'fun': 'Fun',
  'game': 'Game',
  'quotes': 'Quotes',
  'audio': 'Audio',
  'maker': 'Maker',
  'downloader': 'Downloader',
  'internet': 'Internet',
  'random': 'Random',
  'nsfw': 'Nsfw',
  'nulis': 'MagerNulis & Logo',
  'anonymous': 'Anonymous Chat',
  'database': 'Database',
  'admin': 'Admin',
  'group': 'Group',
  'vote': 'Voting',
  'absen': 'Absen',
  'premium': 'Premium',
  'advanced': 'Advanced',
  'info': 'Info',
  'owner': 'Owner',
  'jadibot': 'Jadi Bot',
  'host': 'Host',
  'Baileys': 'Baileys',
  'nocategory': 'No Category',
}
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'admin') tags = {
    'admin': 'Admin'
  }
  if (teks == 'advanced') tags = {
    'advanced': 'Advanced'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'audio') tags = {
    'audio': 'Audio'
  }
  if (teks == 'Baileys') tags = {
    'Baileys': 'Baileys'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'host') tags = {
    'host': 'Host'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'jadian') tags = {
    'jadian': 'Jadian'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'kerang') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'main') tags = {
    'main': 'Main'
  }
  if (teks == 'maker') tags = {
    'maker': 'Maker'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'primbon') tags = {
    'primbon': 'Primbon'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Quran'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'RolePlay Games'
  }
  if (teks == 'sticker') tags = {
    'sticker': 'Sticker'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'nocategory') tags = {
    'nocategory': 'No Category'
  }
                      
    try {
      const sections = [
   {
	title: `${htki} MAIN ${htka}`,
	rows: [
	    {title: `⚡ SPEED BOT`, rowId: ".ping", description: "Menampilkan kecepatan respon BOT"},
	    {title: `💌 OWNER BOT`, rowId: ".owner", description: "Menampilkan List owner BOT"},
	    {title: `📔 SCRIPT BOT`, rowId: ".sc", description: `Source Code`},
	]
    },{
	title: `${htki} SUPPORT ${htka}`,
	rows: [
	    {title: `🔖 SEWA`, rowId: ".sewa", description: "Menampilkan list harga sewa BOT"},
	    {title: `🌟 LIST PREMIUM`, rowId: ".premlist", description: "Menampilkan list harga premium"},
	    {title: `💹 DONASI`, rowId: ".donasi", description: 'Support BOT agar lebih fast respon'},
	]
	},{
	title: `${htki} MENU ${htka}`,
	rows: [
	{title: `${em.getRandom()} ${emot} Menu All Menu ${emot}`, rowId: ".menulist all", description: "menampilkan semua fitur"},
	{title: `${em.getRandom()} ${emot} Menu Absen ${emot}`, rowId: ".menulist absen", description: "absen yukk"},
	{title: `${em.getRandom()} ${emot} Menu Admin ${emot}`, rowId: ".menulist admin", description: "menu khusus admin"},
	{title: `${em.getRandom()} ${emot} Menu Advanced ${emot}`, rowId: ".menulist advanced", description: "advanced"},
	{title: `${em.getRandom()} ${emot} Menu Anonymous ${emot}`, rowId: ".menulist anonymous", description: "Bicara dengan orang tidak dikenal"},
	{title: `${em.getRandom()} ${emot} Menu Audio ${emot}`, rowId: ".menulist audio", description: "Ubah audio dengan filter"},
	{title: `${em.getRandom()} ${emot} Menu Baileys ${emot}`, rowId: ".menulist Baileys", description: "Baileys"},
	{title: `${em.getRandom()} ${emot} Menu Database ${emot}`, rowId: ".menulist database", description: "Menyimpan sesuatu di bot"},
	{title: `${em.getRandom()} ${emot} Menu Downloader ${emot}`, rowId: ".menulist downloader", description: "Mengdownload melalui bot"},
	{title: `${em.getRandom()} ${emot} Menu Edukasi ${emot}`, rowId: ".menulist edukasi", description: "Edukasi"},
	{title: `${em.getRandom()} ${emot} Menu Fun ${emot}`, rowId: ".menulist fun", description: "Menu hiburan"},
	{title: `${em.getRandom()} ${emot} Menu Game ${emot}`, rowId: ".menulist game", description: "Main game yok"},
	{title: `${em.getRandom()} ${emot} Menu Group ${emot}`, rowId: ".menulist group", description: "Menu khusus group"},
	{title: `${em.getRandom()} ${emot} Menu Host ${emot}`, rowId: ".menulist host", description: "Host"},
	{title: `${em.getRandom()} ${emot} Menu Info ${emot}`, rowId: ".menulist info", description: "Ingfo min"},
	{title: `${em.getRandom()} ${emot} Menu Internet ${emot}`, rowId: ".menulist internet", description: "Mencari sesuat di internet"},
	{title: `${em.getRandom()} ${emot} Menu Jadian ${emot}`, rowId: ".menulist jadian", description: "Ehkem"},
	{title: `${em.getRandom()} ${emot} Menu Jadibot ${emot}`, rowId: ".menulist jadibot", description: "Numpang jadibot"},
	{title: `${em.getRandom()} ${emot} Menu Kerang ${emot}`, rowId: ".menulist kerang", description: "Menanyakan sesuatu"},
	{title: `${em.getRandom()} ${emot} Menu Main ${emot}`, rowId: ".menulist main", description: "Main"},
	{title: `${em.getRandom()} ${emot} Menu Maker ${emot}`, rowId: ".menulist maker", description: "Buat logo"},
	{title: `${em.getRandom()} ${emot} Menu Nocategory ${emot}`, rowId: ".menulist nocategory", description: "No category"},
	{title: `${em.getRandom()} ${emot} Menu Nsfw ${emot}`, rowId: ".menulist nsfw", description: "Hayo kenapa megang thithit"},
	{title: `${em.getRandom()} ${emot} Menu Nulis ${emot}`, rowId: ".menulist nulis", description: "Kok males"},
	{title: `${em.getRandom()} ${emot} Menu Owner ${emot}`, rowId: ".menulist owner", description: "Only owner"},
	{title: `${em.getRandom()} ${emot} Menu Premium ${emot}`, rowId: ".menulist premium", description: "Only premium"},
	{title: `${em.getRandom()} ${emot} Menu Primbon ${emot}`, rowId: ".menulist primbon", description: "Primbon"},
	{title: `${em.getRandom()} ${emot} Menu Quotes ${emot}`, rowId: ".menulist quotes", description: "quotes"},
	{title: `${em.getRandom()} ${emot} Menu Quran ${emot}`, rowId: ".menulist quran", description: "Tobat yuk kak"},
	{title: `${em.getRandom()} ${emot} Menu Random ${emot}`, rowId: ".menulist random", description: "Random"},
	{title: `${em.getRandom()} ${emot} Menu RPG ${emot}`, rowId: ".menulist rpg", description: "game epic RPG"},
	{title: `${em.getRandom()} ${emot} Menu Sticker ${emot}`, rowId: ".menulist sticker", description: "Buat sticker di bot"},
	{title: `${em.getRandom()} ${emot} Menu Tools ${emot}`, rowId: ".menulist tools", description: "Mungkin tools ini bisa membantu?"},
	{title: `${em.getRandom()} ${emot} Menu Vote ${emot}`, rowId: ".menulist vote", description: "VOTE"},
	{title: `${em.getRandom()} ${emot} Menu XP ${emot}`, rowId: ".menulist xp", description: "Ayo tingkatkan pangkat mu"}
	]
  }
]

let tek = `👋 Hai @${who.split("@")[0]}\n${ucapan}

*${htjava} YOUR PROFILE ${htjava}*
*᯽ ɴᴀᴍᴇ:* *${name}* ${registered ? '(' + name + ') ' : ''}
*᯽ ᴍᴏɴᴇʏ:* *RP* ${money}
*᯽ ʟᴇᴠᴇʟ* ${level}
*᯽ ʀᴏʟᴇ:* ${role}
*᯽ᴛᴇʀᴅᴀғᴛᴀʀ:* ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'Tidak'} ${lastclaim > 0 ? '\n*⏱️Terakhir Klaim:* ' + new Date(lastclaim).toLocaleString() : ''}\n\n Ketik /inv untuk melihat Inventory RPG
`
const listMessage = {
  text: tek,
  footer: '                「 ᴀᴢᴜsᴀ 」',
  mentions: await conn.parseMention(tek),
  title: `${htki} *LIST MENU* ${htka}`,
  buttonText: `CLICK HERE ⎙`,
  sections
}
  if (teks == '404') {
  	return conn.sendMessage(m.chat, listMessage, { quoted: fgif })
    }
    
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    
    let totalfeatures = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, totalfeatures, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, ucapan,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.sendHydrated(m.chat, text.trim(), wm + '\n\n' + botdate, hwaifu.getRandom(), gcwangsaf, 'Hinata Group', who.split`@`[0], em.getRandom() + ' Your Number', [
      ['🎀 Menu', '/menu'],
      ['🪄 Owner', '/owner'],
      ['🔖 Test', '/ping']
    ], null, false, { mentions: [text] })
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}

handler.command = /^(menulist)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }