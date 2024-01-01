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

-- Dumping structure for table tubes_rpl.assigned
DROP TABLE IF EXISTS `assigned`;
CREATE TABLE IF NOT EXISTS `assigned` (
  `id_calon` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `idmk` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `idkelas` varchar(1) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.assigned: ~4 rows (approximately)
DELETE FROM `assigned`;

-- Dumping structure for table tubes_rpl.calon
DROP TABLE IF EXISTS `calon`;
CREATE TABLE IF NOT EXISTS `calon` (
  `id_calon` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `nama_calon` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `email` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `jumlah_matkul` int NOT NULL,
  `alumni` tinyint(1) NOT NULL,
  `pw` varchar(20) CHARACTER SET ucs2 COLLATE ucs2_bin DEFAULT NULL,
  PRIMARY KEY (`id_calon`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.calon: ~7 rows (approximately)
DELETE FROM `calon`;

-- Dumping structure for table tubes_rpl.dosen
DROP TABLE IF EXISTS `dosen`;
CREATE TABLE IF NOT EXISTS `dosen` (
  `id_dosen` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `nama_dosen` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `idmk` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `pw` varchar(20) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.dosen: ~6 rows (approximately)
DELETE FROM `dosen`;
INSERT INTO `dosen` (`id_dosen`, `nama_dosen`, `idmk`, `pw`) VALUES
	('1231231231', 'Pascal', 'AIF182100', 'pass'),
	('1231231232', 'Hakim', 'AIF181100', 'pass'),
	('1231231232', 'Hakim', 'AIF182101', 'pass'),
	('1231231232', 'Hakim', 'AIF181101', 'pass'),
	('1231231232', 'Hakim', 'AIF182109', 'pass'),
	('1231231233', 'Raymond', 'AIF182204', 'pass'),
	('1231231234', 'Lionov', 'AIF182106', 'pass');
	
-- Dumping structure for table tubes_rpl.info
DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `id_calon` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `filename` varchar(100) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`id_calon`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.info: ~3 rows (approximately)
DELETE FROM `info`;

-- Dumping structure for table tubes_rpl.jadwal
DROP TABLE IF EXISTS `jadwal`;
CREATE TABLE IF NOT EXISTS `jadwal` (
  `id_calon` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `hari` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `awal` int NOT NULL,
  `akhir` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.jadwal: ~4 rows (approximately)
DELETE FROM `jadwal`;

-- Dumping structure for table tubes_rpl.kelas
DROP TABLE IF EXISTS `kelas`;
CREATE TABLE IF NOT EXISTS `kelas` (
  `idkelas` varchar(1) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `hari` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `awal` int NOT NULL,
  `akhir` int NOT NULL,
  `idmk` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `ruangkelas` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `requires` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.kelas: ~23 rows (approximately)
DELETE FROM `kelas`;
INSERT INTO `kelas` (`idkelas`, `hari`, `awal`, `akhir`, `idmk`, `ruangkelas`, `requires`) VALUES
	('A', 'Senin', 12, 14, 'AIF181100', 'Ruang 9015', 2),
	('B', 'Senin', 14, 16, 'AIF181100', 'Ruang 9016', 2),
	('A', 'Rabu', 10, 12, 'AIF182100', 'Ruang 9017', 1),
	('B', 'Rabu', 8, 10, 'AIF182100', 'Ruang 9018', 1),
	('A', 'Selasa', 8, 10, 'AIF182204', 'Ruang 9015', 2),
	('B', 'Selasa', 8, 10, 'AIF182204', 'Ruang 9016', 2),
	('A', 'Selasa', 7, 9, 'AIF182109', 'Ruang 9017', NULL),
	('B', 'Selasa', 9, 11, 'AIF182109', 'Ruang 9018', NULL),
	('A', 'Jumat', 9, 11, 'AIF184005', 'Ruang 9015', NULL),
	('B', 'Jumat', 13, 15, 'AIF184005', 'Ruang 9016', NULL),
	('A', 'Senin', 7, 9, 'AIF182103', 'Ruang 9017', NULL),
	('B', 'Senin', 14, 16, 'AIF182103', 'Ruang 9018', NULL),
	('A', 'Rabu', 13, 16, 'AIF182101', 'Ruang 9015', 2),
	('B', 'Rabu', 13, 16, 'AIF182101', 'Ruang 9016', 2),
	('A', 'Selasa', 13, 15, 'AIF183153', 'Ruang 9017', 1),
	('A', 'Jumat', 7, 10, 'AIF182210', 'Ruang 9018', NULL),
	('B', 'Jumat', 14, 17, 'AIF182210', 'Ruang 9015', NULL),
	('A', 'Senin', 7, 9, 'AIF182105', 'Ruang 9016', NULL),
	('B', 'Senin', 9, 11, 'AIF182105', 'Ruang 9017', NULL),
	('A', 'Rabu', 13, 15, 'AIF182105', 'Ruang 9018', 2),
	('B', 'Rabu', 13, 15, 'AIF182105', 'Ruang 9015', 2),
	('A', 'Jumat', 9, 11, 'AIF182105', 'Ruang 9016', NULL),
	('B', 'Jumat', 13, 15, 'AIF182105', 'Ruang 9017', NULL);

-- Dumping structure for table tubes_rpl.koordinator
DROP TABLE IF EXISTS `koordinator`;
CREATE TABLE IF NOT EXISTS `koordinator` (
  `id_koord` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `nama_koord` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `pw` varchar(20) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`id_koord`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.koordinator: ~2 rows (approximately)
DELETE FROM `koordinator`;
INSERT INTO `koordinator` (`id_koord`, `nama_koord`, `pw`) VALUES
	('8888888888', 'Charles', 'dudududu'),
	('9999999999', 'Agus', 'gunawan');

-- Dumping structure for table tubes_rpl.matkul
DROP TABLE IF EXISTS `matkul`;
CREATE TABLE IF NOT EXISTS `matkul` (
  `idmk` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `namamk` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  PRIMARY KEY (`idmk`)
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.matkul: ~0 rows (approximately)
DELETE FROM `matkul`;
INSERT INTO `matkul` (`idmk`, `namamk`) VALUES
	('AIF181100', 'Dasar Pemrograman'),
	('AIF181101', 'Pemodelan untuk Komputasi'),
	('AIF182100', 'Analisis dan Desain Perangkat Lunak'),
	('AIF182101', 'Algoritma dan Struktur Data'),
	('AIF182105', 'Pemrograman Berorientasi Objek'),
	('AIF182204', 'Pemodelan Berbasis Web');

-- Dumping structure for table tubes_rpl.nilai
DROP TABLE IF EXISTS `nilai`;
CREATE TABLE IF NOT EXISTS `nilai` (
  `id_calon` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `idmk` varchar(10) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL,
  `nilai` varchar(5) CHARACTER SET ucs2 COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.nilai: ~0 rows (approximately)
DELETE FROM `nilai`;

-- Dumping structure for table tubes_rpl.status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `lowongan` varchar(7) COLLATE ucs2_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2 COLLATE=ucs2_bin;

-- Dumping data for table tubes_rpl.status: ~0 rows (approximately)
DELETE FROM `status`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

INSERT INTO `status` (`lowongan`) VALUES("Open");