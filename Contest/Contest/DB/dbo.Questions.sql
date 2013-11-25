USE [Sorolayon1]
GO

/****** Object: Table [dbo].[Questions] Script Date: 11/24/2013 10:37:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].[Questions];


GO
CREATE TABLE [dbo].[Questions] (
    [Id]   INT           NOT NULL,
    [Text] VARCHAR (MAX) NOT NULL,
    [Op1]  VARCHAR (255) NOT NULL,
    [Op2]  VARCHAR (255) NOT NULL,
    [Op3]  VARCHAR (255) NOT NULL,
    [Op4]  VARCHAR (255) NOT NULL,
    [Ans]  TINYINT       NOT NULL
);


