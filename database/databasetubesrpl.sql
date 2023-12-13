-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for tubes_rpl
DROP DATABASE IF EXISTS `tubes_rpl`;
CREATE DATABASE IF NOT EXISTS `tubes_rpl` /*!40100 DEFAULT CHARACTER SET ucs2 COLLATE ucs2_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tubes_rpl`;

-- Dumping structure for table tubes_rpl.calon
DROP TABLE IF EXISTS `calon`;
CREATE TABLE IF NOT EXISTS `calon` (
  `id_calon` varchar(10) COLLATE ucs2_bin NOT NULL,
  `nama_calon` varchar(50) COLLATE ucs2_bin NOT NULL,
  `email` varchar(50) COLLATE ucs2_bin NOT NULL,
  `jumlah_matkul` int NOT NULL,
  `alumni` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_calon`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.calon: ~3 rows (approximately)
DELETE FROM `calon`;
INSERT INTO `calon` (`id_calon`, `nama_calon`, `email`, `jumlah_matkul`, `alumni`) VALUES
	('1111111111', 'Ferry', 'ferryperahu@gmail.com', 2, 1),
	('2222222222', 'Hana', 'hannaferi@gmail.com', 2, 0),
	('6182001001', 'Jenson Mark Lowell', 'bestibego@gmail.com', 3, 1);

-- Dumping structure for table tubes_rpl.dosen
DROP TABLE IF EXISTS `dosen`;
CREATE TABLE IF NOT EXISTS `dosen` (
  `id_dosen` varchar(10) COLLATE ucs2_bin NOT NULL,
  `nama_dosen` varchar(50) COLLATE ucs2_bin NOT NULL,
  `idmk` varchar(10) COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`id_dosen`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.dosen: ~3 rows (approximately)
DELETE FROM `dosen`;
INSERT INTO `dosen` (`id_dosen`, `nama_dosen`, `idmk`) VALUES
	('1231231231', 'Pascal', 'AIF182100'),
	('1231231232', 'Hakim', 'AIF181100'),
	('1231231233', 'Reimon', 'AIF182204');

-- Dumping structure for table tubes_rpl.info
DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `id_calon` varchar(10) COLLATE ucs2_bin NOT NULL,
  `filename` varchar(100) COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`id_calon`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.info: ~3 rows (approximately)
DELETE FROM `info`;
INSERT INTO `info` (`id_calon`, `filename`) VALUES
	('1111111111', 'nilai.png'),
	('2222222222', 'foto.png'),
	('6182001001', '6182001001.pdf');

-- Dumping structure for table tubes_rpl.jadwal
DROP TABLE IF EXISTS `jadwal`;
CREATE TABLE IF NOT EXISTS `jadwal` (
  `id_calon` varchar(10) COLLATE ucs2_bin NOT NULL,
  `hari` varchar(10) COLLATE ucs2_bin NOT NULL,
  `awal` int NOT NULL,
  `akhir` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.jadwal: ~3 rows (approximately)
DELETE FROM `jadwal`;
INSERT INTO `jadwal` (`id_calon`, `hari`, `awal`, `akhir`) VALUES
	('2222222222', 'Senin', 8, 10),
	('2222222222', 'Senin', 13, 15),
	('1111111111', 'Rabu', 10, 16);

-- Dumping structure for table tubes_rpl.kelas
DROP TABLE IF EXISTS `kelas`;
CREATE TABLE IF NOT EXISTS `kelas` (
  `idkelas` varchar(1) COLLATE ucs2_bin NOT NULL,
  `hari` varchar(10) COLLATE ucs2_bin NOT NULL,
  `awal` int NOT NULL,
  `akhir` int NOT NULL,
  `idmk` varchar(10) COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.kelas: ~24 rows (approximately)
DELETE FROM `kelas`;
INSERT INTO `kelas` (`idkelas`, `hari`, `awal`, `akhir`, `idmk`) VALUES
	('a', 'senin', 12, 14, 'AIF181100'),
	('b', 'senin', 14, 16, 'AIF181100'),
	('a', 'rabu', 10, 12, 'AIF182100'),
	('b', 'rabu', 8, 10, 'AIF182100'),
	('a', 'selasa', 8, 10, 'AIF182204'),
	('b', 'selasa', 8, 10, 'AIF182204'),
	('a', 'selasa', 7, 9, 'AIF182109'),
	('b', 'selasa', 9, 11, 'AIF182109'),
	('a', 'jumat', 9, 11, 'AIF184005'),
	('b', 'jumat', 13, 15, 'AIF184005'),
	('a', 'senin', 7, 9, 'AIF182103'),
	('b', 'senin', 14, 16, 'AIF182103'),
	('a', 'rabu', 13, 16, 'AIF182101'),
	('b', 'rabu', 13, 16, 'AIF182101'),
	('a', 'selasa', 13, 15, 'AIF183153'),
	('a', 'jumat', 7, 10, 'AIF182210'),
	('b', 'jumat', 14, 17, 'AIF182210'),
	('a', 'senin', 7, 9, 'AIF182105'),
	('b', 'senin', 9, 11, 'AIF182105'),
	('a', 'rabu', 13, 15, 'AIF182105'),
	('b', 'rabu', 13, 15, 'AIF182105'),
	('a', 'jumat', 9, 11, 'AIF182105'),
	('b', 'jumat', 13, 15, 'AIF182105'),
	('b', 'Rabu', 12, 15, 'AIF182100');

-- Dumping structure for table tubes_rpl.koordinator
DROP TABLE IF EXISTS `koordinator`;
CREATE TABLE IF NOT EXISTS `koordinator` (
  `id_koord` varchar(10) COLLATE ucs2_bin NOT NULL,
  `nama_koord` varchar(50) COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`id_koord`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.koordinator: ~2 rows (approximately)
DELETE FROM `koordinator`;
INSERT INTO `koordinator` (`id_koord`, `nama_koord`) VALUES
	('8888888888', 'Charles'),
	('9999999999', 'Agus');

-- Dumping structure for table tubes_rpl.matkul
DROP TABLE IF EXISTS `matkul`;
CREATE TABLE IF NOT EXISTS `matkul` (
  `idmk` varchar(10) COLLATE ucs2_bin NOT NULL,
  `namamk` varchar(50) COLLATE ucs2_bin NOT NULL,
  `requires` int DEFAULT NULL,
  PRIMARY KEY (`idmk`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.matkul: ~10 rows (approximately)
DELETE FROM `matkul`;
INSERT INTO `matkul` (`idmk`, `namamk`, `requires`) VALUES
	('AIF181100', 'Dasar Pemrograman', 2),
	('AIF182100', 'Analisis dan Desain Perangkat Lunak', 2),
	('AIF182101', 'Algoritma dan Struktur Data', 2),
	('AIF182103', 'Struktur Diskret', 2),
	('AIF182105', 'Pemrograman Berorientasi Objek', 2),
	('AIF182109', 'Statistika untuk Komputasi', NULL),
	('AIF182204', 'Pemodelan Berbasis Web', 2),
	('AIF182210', 'Pengantar Jaringan Komputer', NULL),
	('AIF183153', 'Metode Numerik', NULL),
	('AIF184005', 'Komputer dan Masyarakat', NULL);

-- Dumping structure for table tubes_rpl.nilai
DROP TABLE IF EXISTS `nilai`;
CREATE TABLE IF NOT EXISTS `nilai` (
  `id_calon` varchar(10) COLLATE ucs2_bin NOT NULL,
  `idmk` varchar(10) COLLATE ucs2_bin NOT NULL,
  `nilai` varchar(5) COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.nilai: ~3 rows (approximately)
DELETE FROM `nilai`;
INSERT INTO `nilai` (`id_calon`, `idmk`, `nilai`) VALUES
	('1111111111', 'AIF181100', 'B'),
	('1111111111', 'AIF182100', 'A'),
	('1111111111', 'AIF181100', 'D');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
