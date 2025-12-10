-- Create the TodoDb database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TodoDb')
BEGIN
    CREATE DATABASE TodoDb;
END
GO

USE TodoDb;
GO
