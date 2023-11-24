CREATE TABLE dosen(
	id_dosen CHAR(10) NOT NULL,
	nama_dosen CHAR(50) NOT NULL,
	idmk CHAR(10) NOT NULL
)

ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id_dosen`);

CREATE TABLE calon(
	id_calon CHAR(10) NOT NULL,
	nama_calon CHAR(50) NOT NULL,
	alumni BOOL NOT NULL 
)

ALTER TABLE `calon`
  ADD PRIMARY KEY (`id_calon`);

CREATE TABLE koordinator(
	id_koord CHAR(10) NOT NULL,
	nama_koord CHAR(50) NOT NULL 
)

ALTER TABLE `koordinator`
  ADD PRIMARY KEY (`id_koord`);

CREATE TABLE matkul(
	idmk CHAR(10) NOT NULL,
	namamk CHAR(50) NOT NULL,
	requires INT NOT NULL 
)

ALTER TABLE `matkul`
  ADD PRIMARY KEY (`idmk`);

CREATE TABLE kelas(
	idkelas CHAR(1) NOT NULL,
	hari CHAR(10) NOT NULL,
	jam CHAR(12) NOT NULL,
	idmk CHAR(10) NOT NULL 
)

ALTER TABLE `kelas`
  ADD PRIMARY KEY (`idkelas`);

CREATE TABLE info(
	id_calon CHAR(10) NOT NULL,
	filename varchar(100) NOT NULL,
	#preferences nya gw masi ga yakin
)

ALTER TABLE `info`
  ADD PRIMARY KEY (`id_calon`);

CREATE TABLE jadwal(
	id_calon CHAR(10) NOT NULL,
	hari CHAR(10) NOT NULL,
	jam CHAR(12) NOT NULL
)

ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id_calon`);
