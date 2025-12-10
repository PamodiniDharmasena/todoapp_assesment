#!/bin/bash

# Wait for SQL Server to start
echo "Waiting for SQL Server to be ready..."
sleep 30

# Create the database using sqlcmd
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SqlPass@123456 << EOF
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TodoDb')
BEGIN
    CREATE DATABASE TodoDb;
    PRINT 'Database TodoDb created successfully';
END
ELSE
BEGIN
    PRINT 'Database TodoDb already exists';
END
GO
EOF

echo "Database initialization complete"
