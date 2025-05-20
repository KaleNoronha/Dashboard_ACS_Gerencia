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

select *
from Ventas.Transacciones
go

select 
	Estado,
	Q_TRX,
	Porcentaje_TRX,
	count(*) as veces
from Ventas.Transacciones
group by 
Estado,
Q_TRX,
Porcentaje_TRX
HAVING COUNT(*)>1
go


WITH CTE_Duplicados AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY 	Estado,
		Q_TRX,
		Porcentaje_TRX
      ORDER BY (SELECT 0)
    ) AS rn
  FROM Ventas.Transacciones
)
DELETE FROM CTE_Duplicados
WHERE rn > 1;


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

-- Crea un índice no clusterizado sobre id_tra
CREATE NONCLUSTERED INDEX IX_En_Jul_2024_id_tra
ON Periodo.En_Jul_2024 (id_tra);
GO

-- Crea un índice no clusterizado sobre idbin (o bin_prefix, según tu DDL)
CREATE NONCLUSTERED INDEX IX_En_Jul_2024_idbin
ON Periodo.En_Jul_2024 (bin_prefix);
GO

CREATE NONCLUSTERED INDEX IX_Bines_idcomercio
ON Compras.Bines (bin_prefix);
GO

CREATE NONCLUSTERED INDEX IX_Compras_comercios_fecha
ON Compras.Comercios (idcomercio);
GO

CREATE NONCLUSTERED INDEX IX_En_Jul_2024_idcategoria
ON Periodo.En_Jul_2024 (Categoria);
GO

UPDATE STATISTICS Periodo.En_Jul_2024 WITH FULLSCAN;
GO


/*==================================consultas========================================*/
create or alter proc usp_Transacciones
as 
begin
select
	*
from 
	Ventas.Transacciones
order by Q_TRX desc

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

create or alter proc usp_total_transaction
as
select
	count(*)as total
from
	Periodo.En_Jul_2024
go

exec usp_total_transaction


alter table Periodo.En_Jul_2024 
alter column bin_prefix char(6) not null
go

create or alter proc usp_transaccion_filtros
@nombre varchar(20)='',
@bin	varchar(6) ='',
@tracxio varchar(10)=''
as
begin
select 
	c.idcomercio,
	COUNT(e.id_tra) as Q_trx,
	format(COUNT(e.id_tra)*100.0/sum(COUNT(e.id_tra))over(),'N2')+'%' PQ_trx 
from 
	Compras.Comercios c 
	join Compras.Bines b
	on c.idcomercio=b.idcomercio 
	join Periodo.En_Jul_2024 e
	on e.bin_prefix=b.bin_prefix
where
	(c.nombre=@nombre or @nombre='')
end
go

exec usp_transaccion_comercio
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
		FORMAT(COUNT(e.id_tra)*100.0
		/SUM(COUNT(e.id_tra))over(),
		'N2')+ '%' as PQ_trx
	from
		Compras.Comercios c join Compras.Bines b
		on c.idcomercio=b.idcomercio join Periodo.En_Jul_2024 e
		on b.bin_prefix = e.bin_prefix
	group by 
		c.idcomercio
	order by c.idcomercio asc 
go


exec usp_transac_acquirer 
go


CREATE OR ALTER PROC usp_transac_acquirer_filtro
  @bin    CHAR(6)     = '',   -- filtrar sólo este BIN (vacío = todos)
  @trax        VARCHAR(10) = '',   -- filtrar sólo esta transacción (vacío = todas)
  @top_bin  BIT         = 0     -- 1 = muestra todos los BINs ordenados desc; 0 = agrega por comercio
AS
BEGIN
  IF @top_bin = 1
  BEGIN
    -- Devuelve todos los BINs ordenados por número de transacciones (descendente)
    SELECT
      c.idcomercio,
      COUNT(e.id_tra) AS Q_trx,
	  FORMAT(
      COUNT(e.id_tra) * 100.0
      / SUM(COUNT(e.id_tra)) OVER(),
      'N2'
    ) + '%' AS PQ_trx
    FROM Periodo.En_Jul_2024 e
    JOIN Compras.Bines b
      ON b.bin_prefix = e.bin_prefix
	join Compras.Comercios c
	  on b.idcomercio = c.idcomercio
    WHERE
      (@bin = '' OR b.bin_prefix = @bin)
      AND (@trax     = '' OR e.id_tra     = @trax)
    GROUP BY c.idcomercio,c.nombre,b.bin_prefix
    ORDER BY COUNT(e.id_tra) desc;

    RETURN;
  END

  -- Si @solo_top_bin = 0, agrega por comercio y muestra porcentaje
  SELECT
    c.idcomercio,
    COUNT(e.id_tra) AS Q_trx,
    FORMAT(
      COUNT(e.id_tra) * 100.0
      / SUM(COUNT(e.id_tra)) OVER(),
      'N2'
    ) + '%' AS PQ_trx
  FROM Compras.Comercios c
  JOIN Compras.Bines      b
    ON c.idcomercio = b.idcomercio
  JOIN Periodo.En_Jul_2024 e
    ON b.bin_prefix = e.bin_prefix
  WHERE
    (@bin = '' OR b.bin_prefix = @bin)
    AND (@trax     = '' OR e.id_tra     = @trax)
  GROUP BY
    c.idcomercio
  ORDER BY
    COUNT(e.id_tra) desc;
END;
GO

exec usp_transac_acquirer_filtro @bin='',@trax='TX1000123',@top_bin=0
go

CREATE OR ALTER PROC usp_transac_acquirer_filtro
  @bin       CHAR(6)     = '',    -- filtrar por BIN (vacío = todos)
  @trax      VARCHAR(10) = '',    -- filtrar por ID de transacción (vacío = todos)
  @top_bin   BIT         = 0,     -- 1 = ordenar por cantidad desc.; 0 = por comercio asc.
  @offset    INT         = 0,     -- para paginación: número de filas a saltar
  @limit     INT         = 50     -- para paginación: número de filas a traer
AS
BEGIN
  SET NOCOUNT ON;

  IF @top_bin = 1
  BEGIN
    SELECT
      c.idcomercio,
      COUNT(e.id_tra) AS Q_trx,
      FORMAT(
        COUNT(e.id_tra)*100.0
        / SUM(COUNT(e.id_tra)) OVER(),
        'N2'
      ) + '%' AS PQ_trx
    FROM Compras.Comercios    AS c
    JOIN Compras.Bines       AS b  ON c.idcomercio = b.idcomercio
    JOIN Periodo.En_Jul_2024 AS e  ON b.bin_prefix      = e.bin_prefix
    WHERE
      (@bin  = ''   OR b.bin_prefix  = @bin)
      AND (@trax = '' OR e.id_tra = @trax)
    GROUP BY
      c.idcomercio
    ORDER BY
      COUNT(e.id_tra) DESC
    OFFSET @offset ROWS
    FETCH NEXT @limit ROWS ONLY;
    RETURN;
  END

  SELECT
    c.idcomercio,
    COUNT(e.id_tra) AS Q_trx,
    FORMAT(
      COUNT(e.id_tra)*100.0
      / SUM(COUNT(e.id_tra)) OVER(),
      'N2'
    ) + '%' AS PQ_trx
  FROM Compras.Comercios    AS c
  JOIN Compras.Bines       AS b  ON c.idcomercio = b.idcomercio
  JOIN Periodo.En_Jul_2024 AS e  ON b.bin_prefix      = e.bin_prefix
  WHERE
    (@bin  = ''   OR b.bin_prefix  = @bin)
    AND (@trax = '' OR e.id_tra = @trax)
  GROUP BY
    c.idcomercio
  ORDER BY
    COUNT(e.id_tra) desc
  OFFSET @offset ROWS
  FETCH NEXT @limit ROWS ONLY;
END;
GO


select * from Periodo.En_Jul_2024 p
	where  (p.fecha between '2024-07-13' and  '2024-08-13') and
	p.bin_prefix='100030'
	
	group by
	p.bin_prefix,
	p.id_tra,
	p.fecha,
	p.categoria,
	p.monto
go

select * from Periodo.En_Jul_2024
go

INSERT INTO Periodo.En_Jul_2024 (id_tra, fecha, categoria, monto, bin_prefix)
VALUES
  ('TX9999605','2024-02-01','correcta',   125.50,'100030'),
  ('TX9999606','2024-02-02','cancelada',   340.00,'100030'),
  ('TX9999607','2024-02-03','correcta',    75.25,'100030'),
  ('TX9999608','2024-02-04','correcta',  50.10,'100030'),
  ('TX9999609','2024-02-05','incompleta',  200.00,'100030'),
  ('TX9999610','2024-02-06','correcta',   410.75,'100030'),
  ('TX9999611','2024-02-07','cancelada',  150.30,'100030'),
  ('TX9999612','2024-02-08','correcta',   320.90,'100030'),
  ('TX9999613','2024-02-09','incompleta',  60.40,'100030'),
  ('TX9999614','2024-02-10','incompleta',   95.00,'100030'),
  ('TX9999615','2024-02-11','correcta',   280.20,'100030'),
  ('TX9999616','2024-02-12','cancelada',  130.50,'100030'),
  ('TX9999617','2024-02-13','correcta',    75.60,'100030'),
  ('TX9999618','2024-02-14','incompleta',  40.80,'100030'),
  ('TX9999619','2024-02-15','correcta',  165.45,'100030')
go

insert into Compras.Comercios values
('654665869','test')
go

insert into Compras.Bines values
('100030','654665869')
go

create or alter proc usp_bines
as
select 
	b.bin_prefix
from 
	Compras.Bines b
go

exec usp_bines
go

CREATE OR ALTER PROC usp_nro_transaccion
  @prefijo VARCHAR(10) = '',
  @offset  INT         = 0,
  @limit   INT         = 50
AS
BEGIN
  SELECT
    p.id_tra
  FROM Periodo.En_Jul_2024 AS p
  WHERE
    (@prefijo = '' OR p.id_tra LIKE @prefijo + '%')
  ORDER BY p.id_tra
  OFFSET @offset ROWS
  FETCH NEXT @limit ROWS ONLY;
END;
GO


exec usp_nro_transaccion @prefijo='' ,@limit=10 
go