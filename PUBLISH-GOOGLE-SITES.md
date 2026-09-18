# Publikasi ke Google Sites

Google Sites tidak menjalankan folder HTML/CSS/JS secara langsung. Website ini perlu diunggah ke hosting static terlebih dahulu, lalu URL publiknya dimasukkan ke Google Sites.

## Cara tercepat: Netlify Drop

1. Buka `https://app.netlify.com/drop`.
2. Masuk atau buat akun Netlify.
3. Seret seluruh folder proyek `greenzhi-pasta-gigi` ke area upload.
4. Tunggu sampai Netlify memberikan URL `*.netlify.app`.
5. Buka URL tersebut dan pastikan hero, formulir, serta video YouTube tampil.

## Masukkan ke Google Sites

1. Buka `https://sites.google.com/` dan buka site yang akan diedit.
2. Pilih **Insert** lalu **Embed**.
3. Pilih **By URL**.
4. Masukkan URL Netlify.
5. Klik **Insert**, atur ukuran frame, lalu klik **Publish**.

## Penting untuk YouTube

URL embed YouTube pada `index.html` saat ini menggunakan origin `https://www.greenzhipastagigi.com`. Jika hosting menggunakan URL Netlify, origin perlu diganti ke URL Netlify sebelum dipublikasikan agar error 153 tidak muncul.

Contoh:

```text
https://www.youtube.com/embed/VIDEO_ID?rel=0&origin=https%3A%2F%2Fnama-site.netlify.app&widget_referrer=https%3A%2F%2Fnama-site.netlify.app
```

Setelah memiliki URL hosting final, ganti nilai `origin` dan `widget_referrer` pada keenam iframe YouTube di `index.html`.

## Domain sendiri

Untuk hasil profesional, sambungkan domain seperti `greenzhipastagigi.com` di Netlify, lalu gunakan URL domain tersebut saat memasukkan website ke Google Sites. Pastikan HTTPS aktif.
