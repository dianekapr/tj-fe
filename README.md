# tj-fe

## Cara Menjalankan Aplikasi

Jalankan perintah-perintah berikut di terminal Anda, secara runtut.

1. **Clone Repository**
   ```bash
   git clone https://github.com/dianekapr/tj-fe.git
   ```

2. **Buka Directory Aplikasi**
   ```bash
   cd tjfe-diane
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Jalankan Aplikasi**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Akses Aplikasi**
- Buka browser Anda dan akses `http://localhost:3000`. 


## Arsitektur Aplikasi

### 1. **Komponen Utama**
   - **App**: Komponen utama yang mengelola state aplikasi, seperti data kendaraan, error, dan filter.
   - **Filters**: Menyediakan filter untuk memilih rute dan trip yang diinginkan. Menggunakan komponen `react-select` untuk pemilihan multiple.
   - **VehicleCard**: Menampilkan informasi dasar kendaraan seperti label, status, koordinat, dan waktu pembaruan terakhir.
   - **VehicleDetailModal**: Menampilkan detail kendaraan yang lebih lengkap, termasuk peta dengan memanfaatkan `react-leaflet` untuk memvisualisasikan posisi kendaraan.
   
### 2. **State Management**
   - **State kendaraan** disimpan dalam `vehicles` dan `filteredVehicles`. 
   - **Filter** dikelola dalam state `selectedRoutes` dan `selectedTrips`. Ketika filter berubah, data kendaraan akan difilter dan ditampilkan sesuai dengan kriteria yang dipilih oleh User.
   
### 3. **Fetching Data**
   - Data kendaraan, trip, dan route diambil menggunakan **axios** untuk mengambil data dari API MBTA.
   - Data kendaraan yang diambil dari API `/vehicles` di-filter dan ditampilkan berdasarkan rute dan trip yang dipilih.

### 4. **Pagination**
   - Pagination dilakuka menggunakan fungsi `slice` untuk membatasi jumlah data yang ditampilkan per halaman.
   - User dapat memilih jumlah data per halaman (5, 10, atau 20), dan dapat menavigasi ke halaman berikutnya atau sebelumnya.

### 5. **Peta**
   - Peta kendaraan di-render menggunakan **React-Leaflet**. Lokasi kendaraan ditandai dengan **marker**.

