USE [Sorolayon1]
GO

/****** Object: Table [dbo].[ResultInfo] Script Date: 11/24/2013 10:37:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].[ResultInfo];


GO
CREATE TABLE [dbo].[ResultInfo] (
    [ID]         INT           IDENTITY (1, 1) NOT NULL,
    [UserId]     VARCHAR (30)  NOT NULL,
    [CustomerId] VARCHAR (20)  NOT NULL,
    [score]      INT           NULL,
    [phone]      VARCHAR (15)  NULL,
    [email]      VARCHAR (50)  NULL,
    [UserName]   VARCHAR (100) NULL,
    [time]       INT           NULL
);


