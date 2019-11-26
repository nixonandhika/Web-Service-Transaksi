# Web Service Transaction

Web service Transaksi yang dibangun di atas Node.js dan mengimplementasikan protokol REST. Web service ini bertanggung jawab untuk semua transaksi tiket film Engima.

<br>
<br>

Web service Transaksi memiliki basis data tersendiri yang memiliki informasi transaksi tiket film setiap pengguna Engima. Informasi transaksi adalah id pengguna, nomor akun virtual tujuan, id film, jadwal film, kursi yang dipesan, waktu pembuatan transaksi, dan status transaksi.

<br>
<br>

Ada tiga status pembayaran sebuah transaksi tiket film sebagai berikut.

<br>

Pending: tiket belum dibayar namun belum lewat dari masa berlaku transaksi.
<br>
Cancelled: tiket belum dibayar dan sudah lewat dari masa berlaku transaksi. Status kursi yang dipesan pada transaksi dengan status cancelled menjadi tersedia kembali.
<br>
Success: tiket sudah dibayar sebelum masa berlaku transaksi.

<br>
<br>

Berikut layanan yang disediakan oleh web service ini:
1. Menambah transaksi baru dengan status “Pending”. Input yang diberikan adalah id pengguna, id film, kursi yang dipilih, dan nomor akun virtual yang menjadi tujuan pembayaran. Layanan mengembalikan id transaksi.
2. Mengubah status suatu transaksi menjadi status “Success” atau “Cancelled”. Input yang diberikan adalah id transaksi.
3. Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima


## Basis Data yang Digunakan: MySQL


</br>

## Pembagian Tugas DPPL
1. CI/CD: 13517089
2. Eksplorasi dan setup mesin deployment: 13517059, 13517069, 13517134

</br>

## URL Deployment
Halaman Engima: 100.26.106.0/engima
<br>
Halaman Bank Pro: 100.26.106.0:5000
<br>
URL WS Transaksi: 100.26.106.0:3000