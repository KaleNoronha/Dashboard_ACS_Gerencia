use  Negocios
go

create table Ventas.Transacciones(
  Estado VARCHAR(1),
  Q_TRX decimal(10,2),
  Porcentaje_TRX decimal(5,2)
)
go

insert into Ventas.Transacciones 
values
('Y',1048.82,65.04),
('N',462.47,28.68),
('R',75.815,4.70),
('',19.47,1.21),
('U',5.54,0.34),
('C',449,0.03),
('A',32,0.00),
('I',19,0.00)
go



create schema Periodo
go


create table Periodo.En_Jul_2024(
	id_tra varchar(10) primary key not null,
	fecha date,
	categoria varchar(20),
	monto decimal(10,2)
)
go



bulk insert Periodo.En_Jul_2024
from 'C:\Users\knoronha\Downloads\ALIGNET\Dashboard_ACS_Gerencia\frontend\public\ECHART3_sin_duplicados.csv'
with(
	firstrow=2,
	fieldterminator=',',
	rowterminator='\n'
)
go



create table Compras.Comercios(
	idcomercio char(15) primary key not null,
	nombre varchar(25)not null,
)
go

insert Compras.Comercios values 
('0001749110','Banco Ripley'),
('0002286725','Entel'),
('100030509','Interbank'),
('604000001601','Banco de la nacion'),
('0002558826','BBVA Uruguay'),
('003108010','Banco del Austro'),
(' ','free'),
('0002257643','Banco Brou'),
('650187001','Banco Pacifico')
go

select * from Compras.Comercios
go

create table Compras.Bines(
	bin_prefix char(6) primary key not null,
	idcomercio char(15) not null references Compras.Comercios(idcomercio)
)
go

alter table Periodo.EN_Jul_2024
add bin_prefix char(6) null
go
alter table Periodo.En_Jul_2024
add constraint FK_EnJul2024_bin
	foreign key (bin_prefix)
	references Compras.bines(bin_prefix);
go

INSERT INTO Compras.Bines (bin_prefix, idcomercio) VALUES

  /* Banco Ripley (0001749110) */
  ('000174', '0001749110'),
  ('000175', '0001749110'),
  ('000176', '0001749110'),
  ('000177', '0001749110'),
  ('000178', '0001749110'),
  ('000179', '0001749110'),
  ('000180', '0001749110'),
  ('000181', '0001749110'),
  ('000182', '0001749110'),
  ('000183', '0001749110'),

  /* Entel (0002286725) */
  ('000228', '0002286725'),
  ('000229', '0002286725'),
  ('000230', '0002286725'),
  ('000231', '0002286725'),
  ('000232', '0002286725'),
  ('000233', '0002286725'),
  ('000234', '0002286725'),
  ('000235', '0002286725'),
  ('000236', '0002286725'),
  ('000237', '0002286725'),

  /* Interbank (100030509) */
  ('100030', '100030509'),
  ('100031', '100030509'),
  ('100032', '100030509'),
  ('100033', '100030509'),
  ('100034', '100030509'),
  ('100035', '100030509'),
  ('100036', '100030509'),
  ('100037', '100030509'),
  ('100038', '100030509'),
  ('100039', '100030509'),

  /* Banco de la nacion (604000001601) */
  ('604000', '604000001601'),
  ('604001', '604000001601'),
  ('604002', '604000001601'),
  ('604003', '604000001601'),
  ('604004', '604000001601'),
  ('604005', '604000001601'),
  ('604006', '604000001601'),
  ('604007', '604000001601'),
  ('604008', '604000001601'),
  ('604009', '604000001601'),

  /* BBVA Uruguay (0002558826) */
  ('000255', '0002558826'),
  ('000256', '0002558826'),
  ('000257', '0002558826'),
  ('000258', '0002558826'),
  ('000259', '0002558826'),
  ('000260', '0002558826'),
  ('000261', '0002558826'),
  ('000262', '0002558826'),
  ('000263', '0002558826'),
  ('000264', '0002558826'),

  /* Banco del Austro (003108010) */
  ('003108', '003108010'),
  ('003109', '003108010'),
  ('003110', '003108010'),
  ('003111', '003108010'),
  ('003112', '003108010'),
  ('003113', '003108010'),
  ('003114', '003108010'),
  ('003115', '003108010'),
  ('003116', '003108010'),
  ('003117', '003108010'),

  /* Banco Brou (0002257643) — desplazado para no colisionar */
  ('000216', '0002257643'),
  ('000217', '0002257643'),
  ('000218', '0002257643'),
  ('000219', '0002257643'),
  ('000220', '0002257643'),
  ('000221', '0002257643'),
  ('000222', '0002257643'),
  ('000223', '0002257643'),
  ('000224', '0002257643'),
  ('000225', '0002257643'),

  /* Banco Pacifico (650187001) */
  ('650187', '650187001'),
  ('650188', '650187001'),
  ('650189', '650187001'),
  ('650190', '650187001'),
  ('650191', '650187001'),
  ('650192', '650187001'),
  ('650193', '650187001'),
  ('650194', '650187001'),
  ('650195', '650187001'),
  ('650196', '650187001')
;
GO


WITH
-- (A) Numeramos las transacciones en el orden que SQL decida
cte_tr AS (
  SELECT
    id_tra,
    ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rn_tr
  FROM Periodo.En_Jul_2024
),

-- (B) Numeramos los BINS en el orden que prefieras (aquí por bin_prefix alfabéticamente)
cte_bins AS (
  SELECT
    bin_prefix,
    ROW_NUMBER() OVER (ORDER BY bin_prefix) AS rn_bn,
    COUNT(*) OVER()                   AS total_bins
  FROM Compras.Bines
)
UPDATE t
SET bin_prefix = b.bin_prefix
FROM Periodo.En_Jul_2024 AS t
-- Unimos con la numeración de transacciones
JOIN cte_tr AS tr
  ON t.id_tra = tr.id_tra
-- Unimos con el bin cuyo número corresponda al módulo
JOIN cte_bins AS b
  ON ((tr.rn_tr - 1) % b.total_bins) + 1 = b.rn_bn
go

exec usp_en_jul_2024
go
/*==================================consultas========================================*/
create or alter proc usp_Transacciones
as 
begin
select
	*
from 
	Ventas.Transacciones
end
go

exec usp_Transacciones
go

create or alter proc usp_en_jul_2024
as
select
	*
from
	Periodo.En_Jul_2024
go

exec usp_en_jul_2024
go
alter table Periodo.En_Jul_2024 
alter column bin_prefix char(6) not null
go

create or alter proc usp_transaccion_comercio
@nombre varchar(20)=''
as
begin
select 
	b.bin_prefix,
	c.nombre,
	e.id_tra,
	e.fecha,
	e.monto
from 
	Compras.Comercios c join Compras.Bines b
	on c.idcomercio=b.idcomercio join Periodo.En_Jul_2024 e
	on e.bin_prefix=b.bin_prefix
where
	(c.nombre=@nombre or @nombre='')
end
go

exec usp_transaccion_comercio @nombre='Banco Pacifico'
go

create or alter proc usp_transacciones_comercio_total
@comercio varchar(25)
as
begin
select 
	COUNT(*)
from
		Compras.Comercios c join Compras.Bines b
	on c.idcomercio=b.idcomercio join Periodo.En_Jul_2024 e
	on e.bin_prefix=b.bin_prefix
where
	c.nombre=@comercio
end
go

exec usp_en_jul_2024 
go

create or alter proc usp_transac_acquirer

as
	select
		c.idcomercio,
		count(e.id_tra) as Q_trx,
		COUNT(e.id_tra)*100.0
		/SUM(COUNT(e.id_tra))over () as pct_trx
	from
		Compras.Comercios c join Compras.Bines b
		on c.idcomercio=b.idcomercio join Periodo.En_Jul_2024 e
		on b.bin_prefix = e.bin_prefix
	group by 
		c.idcomercio
	order by c.idcomercio asc 
go