USE [Sorolayon1]
GO

/****** Object: SqlProcedure [dbo].[GetQuestions] Script Date: 11/24/2013 10:38:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP PROCEDURE [dbo].[GetQuestions];


GO
CREATE PROCEDURE [dbo].[GetQuestions]
	
AS
	SELECT top 10 * from Questions order by newid()
RETURN 0
