USE [Sorolayon1]
GO

/****** Object: SqlProcedure [dbo].[AddResult] Script Date: 11/24/2013 10:38:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP PROCEDURE [dbo].[AddResult];


GO
CREATE PROCEDURE [dbo].[AddResult]
	@UserId  varchar(30) = '',
	@UserName varchar(max) = 0,
	@CustomerId varchar(15) ='',
	@Score int = 0,
	@time int = 0,
	@Phone varchar(15) ='',
	@Email varchar(50) =''
AS
	insert into ResultInfo values (@UserId,@CustomerId,@Score,@Phone,@Email,@UserName,@time)
RETURN 0
