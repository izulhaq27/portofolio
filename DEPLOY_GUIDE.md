# Panduan Deployment Next.js ke Vercel

Panduan ini berisi langkah-langkah lengkap untuk melakukan *deployment* (publikasi) aplikasi portofolio Anda ke internet secara gratis menggunakan Vercel.

> [!WARNING]
> **Langkah Pertama Paling Krusial: Konfigurasi IP MongoDB!**
> Server Vercel menggunakan alamat IP dinamis yang terus berubah. Jika Anda mengabaikan langkah ini, website Anda tidak akan bisa terhubung ke database MongoDB saat sudah online.

## Tahap 1: Persiapan Database & GitHub

1. **Buka Akses IP MongoDB**
   - Login ke [MongoDB Atlas](https://cloud.mongodb.com).
   - Di menu sebelah kiri, klik **Network Access** (di bawah bagian Security).
   - Klik **+ ADD IP ADDRESS**.
   - Pilih opsi **ALLOW ACCESS FROM ANYWHERE** (Nanti akan muncul tulisan `0.0.0.0/0`).
   - Klik **Confirm** dan pastikan statusnya berubah menjadi *Active*.

2. **Push Kode ke GitHub**
   - Pastikan semua perubahan kode terakhir sudah di-commit.
   - Buka terminal VS Code Anda dan jalankan:
     ```bash
     git add .
     git commit -m "Siap untuk deploy"
     git push origin main
     ```
   - Pastikan kode Anda sudah ter-update di repository GitHub Anda.

## Tahap 2: Proses Import di Vercel

1. Buka situs [vercel.com](https://vercel.com/) dan **Sign Up / Log In** menggunakan akun GitHub Anda.
2. Di Dashboard Vercel, klik tombol hitam **Add New...** di sudut kanan atas, lalu pilih **Project**.
3. Di daftar repository, temukan nama repository portofolio Anda dan klik tombol **Import**.
4. Biarkan konfigurasi *Framework Preset* tetap **Next.js**.

## Tahap 3: Mengatur Environment Variables (Variabel Lingkungan)

> [!IMPORTANT]
> Vercel tidak akan membaca file `.env.local` yang ada di komputer Anda. Anda **wajib** memasukkan nilainya secara manual di halaman pengaturan Vercel sebelum menekan tombol Deploy.

1. Di halaman konfirmasi (Configure Project), klik untuk membuka menu dropdown **Environment Variables**.
2. Salin isi dari file `.env.local` Anda ke form yang disediakan satu per satu:

   **Variabel 1: MongoDB**
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb://fahrieizuel_db_user:fahrieizuelpassworddb@ac-sgmu4zu-shard-00-00.i0vw6fa.mongodb.net:27017,ac-sgmu4zu-shard-00-01.i0vw6fa.mongodb.net:27017,ac-sgmu4zu-shard-00-02.i0vw6fa.mongodb.net:27017/portfolio_db?ssl=true&replicaSet=atlas-sfns9h-shard-0&authSource=admin&retryWrites=true&w=majority`
   - Klik **Add**

   **Variabel 2: NextAuth Secret**
   - **Name:** `NEXTAUTH_SECRET`
   - **Value:** `supersecret_portfolio_key_123!@#`
   - Klik **Add**

> [!TIP]
> **Tidak perlu** memasukkan `NEXTAUTH_URL`. Vercel dan NextAuth akan mendeteksi URL domain produksi Anda secara otomatis. Jika Anda memaksa mengisinya dengan `http://localhost:3000`, fitur login Anda akan *error* di server Vercel.

## Tahap 4: Deployment

1. Setelah semua Environment Variables ditambahkan, klik tombol **Deploy**.
2. Tunggu sekitar 1 hingga 3 menit. Vercel sedang membangun (*build*) aplikasi Anda.
3. Setelah selesai, layar perayaan 🎉 akan muncul!
4. Klik **Continue to Dashboard**.
5. Klik tombol **Visit** untuk membuka website portofolio Anda yang kini sudah bisa diakses dari seluruh dunia!

## Auto-Deployment (CD)
Mulai sekarang, setiap kali Anda melakukan perubahan kode di VS Code dan melakukan `git push` ke GitHub, Vercel akan secara otomatis membangun ulang dan meng-update website Anda tanpa perlu Anda mengaturnya lagi.
