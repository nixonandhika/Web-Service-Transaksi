CREATE TABLE transactions (
  id_transaksi SERIAL PRIMARY KEY,
  id_pengguna Integer NOT NULL,
  nomor_va VARCHAR(255) NOT NULL,
  id_film Integer NOT NULL,
  jadwal_film DATETIME NOT NULL,
  no_kursi INTEGER NOT NULL,
  waktu_transaksi DATETIME NOT NULL,
  status TINYINT NOT NULL 
);

--  status : 
-- pending = 0
-- cancelled = 1
-- success = 2