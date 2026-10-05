# Senga bir gapim bor

Shaxsiy, mobil-first o‘zbekcha taklif. React + Vite.

```sh
npm install
npm run dev
```

## Matn va media

`src/content.js` ichida savol, matn, ismlar va yakuniy javobni tahrirlang.

Qo‘shiqni `public/media/song.mp3` ichiga qo‘yib, `musicSrc: '/media/song.mp3'` yozing. Audio maktubni ochish bosilgandan keyin boshlanadi va takrorlanadi. Sahifada ovoz sozlash, yoqish/o‘chirish yoki pauza tugmalari yo‘q; ovoz darajasi kodda 40% qilib belgilangan.

Ixtiyoriy rasm/GIF uchun shu papkaga fayl joylab, `imageSrc` va `imageAlt`ni belgilang. Rasm bo‘lmasa sahifa mediasiz ishlaydi.

Matn va media `src/content.js` orqali sozlanadi.

## Animatsiyalar va stikerlar

Yuklangan beshta stiker qog‘oz atrofida alohida tezlik va burilish bilan suzadi. Mobil o‘lchamlarda kichrayadi. Ko‘rinmayotgan stikerlar va yashirin tabdagi takroriy animatsiyalar pauza bo‘ladi.

Matn harflari yumshoq paydo bo‘ladi; pastdagi paragraphlar ekranga kirganda boshlanadi. Intro, maktub va “Ha” holatlari View Transitions orqali almashadi; eski brauzerlarda yumshoq crossfade ishlaydi. Reduced Motion yoqilganida matn darhol ko‘rinadi, takroriy harakatlar to‘xtaydi.

Optimallashtirilgan stikerlar: `public/stickers/`. Asl `image-Photoroom*.png` fayllar saqlangan. Suzish joyi va tezligi `src/styles.css` ichidagi `.sticker-*` klasslarida.

## Build va QR

```sh
npm run build
npm run preview
```

`dist/`ni statik hostingga deploy qiling. Yakuniy HTTPS URLni QR kodga aylantiring. `localhost` manzili telefonga beriladigan QR uchun mos emas. Bir xil Wi-Fi ichida Vite terminalidagi Network URL orqali mahalliy sinash mumkin.

## Impeccable live

Dev server ishlab turganida:

```sh
.agents/skills/impeccable/scripts/impeccable live --target src/App.jsx
.agents/skills/impeccable/scripts/impeccable live-poll
```

Live’ni yopishda:

```sh
.agents/skills/impeccable/scripts/impeccable live-server stop
```

Deploy oldidan live script injectionni olib tashlang. `npm run build` ishlatishdan oldin shu stop buyrug‘ini bajaring.

## Material manbasi

`public/media/print-paper.webp` va `print-fiber.webp` — Internet Archive Book Images'ning 1902-yilgi kitobdan skanerlangan [bo‘sh qog‘oz sahifasi](https://commons.wikimedia.org/wiki/File:Blank_page,_brown_paper_texture_(14802136533).jpg). Flickr Commons: no known copyright restrictions. Rang o‘qishga moslashtirilgan, o‘lcham optimallashtirilgan; chetlar va ichki tekstura alohida ishlatiladi, tolalar cho‘zilmaydi. To‘liq kelib chiqish har bir WebP yonidagi JSON sidecarida.
