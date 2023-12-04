DROP TABLE dosen;
DROP TABLE calon;
DROP TABLE koordinator;
DROP TABLE matkul;
DROP TABLE kelas;
DROP TABLE info;
DROP TABLE jadwal;

CREATE TABLE dosen(
	id_dosen VARCHAR(10) NOT NULL,
	nama_dosen VARCHAR(50) NOT NULL,
	idmk VARCHAR(10) NOT NULL
);

ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id_dosen`);

CREATE TABLE calon(
	id_calon VARCHAR(10) NOT NULL,
	nama_calon VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	jumlah_matkul INT NOT NULL,
	alumni BOOL NOT NULL 
);

ALTER TABLE `calon`
  ADD PRIMARY KEY (`id_calon`);

CREATE TABLE koordinator(
	id_koord VARCHAR(10) NOT NULL,
	nama_koord VARCHAR(50) NOT NULL 
);

ALTER TABLE `koordinator`
  ADD PRIMARY KEY (`id_koord`);

CREATE TABLE matkul(
	idmk VARCHAR(10) NOT NULL,
	namamk VARCHAR(50) NOT NULL,
	requires INT 
);

ALTER TABLE `matkul`
  ADD PRIMARY KEY (`idmk`);

CREATE TABLE kelas(
	idkelas VARCHAR(1) NOT NULL,
	hari VARCHAR(10) NOT NULL,
	jam VARCHAR(12) NOT NULL,
	idmk VARCHAR(10) NOT NULL 
);

CREATE TABLE info(
	id_calon VARCHAR(10) NOT NULL,
	filename varchar(100) NOT NULL
);

ALTER TABLE `info`
  ADD PRIMARY KEY (`id_calon`);

CREATE TABLE jadwal(
	id_calon VARCHAR(10) NOT NULL,
	hari VARCHAR(10) NOT NULL,
	jam VARCHAR(12) NOT NULL
);

	

INSERT INTO `koordinator` (`id_koord`,`nama_koord`) VALUES
('9999999999','Agus');

INSERT INTO `koordinator` (`id_koord`,`nama_koord`) VALUES
('8888888888','Charles');



INSERT INTO `matkul`(`idmk`,`namamk`,`requires`) VALUES
('AIF181100','Daspro','2');

INSERT INTO `matkul`(`idmk`,`namamk`,`requires`) VALUES
('AIF182100','ADPL','2');

INSERT INTO `matkul`(`idmk`,`namamk`,`requires`) VALUES
('AIF182204','PBW','2');



INSERT INTO `kelas`(`idkelas`,`hari`,`jam`,`idmk`) VALUES
('a','Senin','14:00','AIF181100');

INSERT INTO `kelas`(`idkelas`,`hari`,`jam`,`idmk`) VALUES
('b','Senin','14:00','AIF182100');



INSERT INTO `dosen` (`id_dosen`,`nama_dosen`,`idmk`) VALUES
('1231231231','Pascal','AIF182100');

INSERT INTO `dosen` (`id_dosen`,`nama_dosen`,`idmk`) VALUES
('1231231232','Hakim','AIF181100');

INSERT INTO `dosen` (`id_dosen`,`nama_dosen`,`idmk`) VALUES
('1231231233','Reimon','AIF182204');



INSERT INTO `calon` (`id_calon`,`nama_calon`,`email`,`jumlah_matkul`,`alumni`) VALUES
('1111111111','Ferry','ferryperahu@gmail.com','3',TRUE);

INSERT INTO `calon` (`id_calon`,`nama_calon`,`email`,`jumlah_matkul`,`alumni`) VALUES
('2222222222','Hana','hannaferi@gmail.com','2',FALSE);



INSERT INTO `info` (`id_calon`,`filename`) VALUES
('2222222222','foto.png');

INSERT INTO `info` (`id_calon`,`filename`) VALUES
('1111111111','nilai.png');