# TUBES-RPL Website Penjadwalan Asisten
# Implementasi
Link Repositori: https://github.com/doniandrian/TUBES-RPL.git


### Built With
* [![Node Js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
* [![Tailwincss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
* [![Mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)




# Development
Prasyarat:
- Node js version 18.16.0 or higher: https://nodejs.org/en/download/
- XAMPP / LARAGON 6.0 220916 or higher: https://laragon.org/download/index.html
- Sqlyog 13.1.8.0 or higher: https://webyog.com/product/sqlyog/
- MySQL 5.7 or higher: https://www.mysql.com/

# Development Setup

1. Memilih direktori untuk menyimpan repositori ini
2. Clone repository ini
   ```sh
   git clone https://github.com/doniandrian/TUBES-RPL.git
   ```
3. Buka laragon klick start all untuk menjalankan webserver dan mysqlnya
4. Kemudian click database dan buatlah sebuah database baru dengan nama `tubes_rpl`
5. Buka repositori `TUBES-RPL` yang sudah anda clone sebelumnya dan buka `databasetubes.sql` kemudian salin isinya ke database yang sudah anda buat sebelumnya dan eksekusi querynya.
6. Install NPM packages
   ```sh
   npm install
   ```
7. Jalankan Aplikasi 
   ```sh
   npm start
   ```
8. Nodemon akan memulai aplikasi, dan akan ditampilkan pesan seperti berikut:
   <br>
   `Server started on port 8080
    Connected to the database`
10. Bukalah browser pilihan anda, lalu ketikkan link berikut pada address bar:
   `http://localhost:8080/login`
       

  


