#!/bin/bash
set -e

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &
SERVER_PID=$!

# Wait for SQL Server to start
echo "Waiting for SQL Server to start..."
sleep 30

# Try to connect and create database
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1;" > /dev/null 2>&1; then
        echo "SQL Server is ready"
        
        # Create the database
        /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" << EOF
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TodoDb')
BEGIN
    CREATE DATABASE TodoDb;
    PRINT 'Database TodoDb created';
END
ELSE
BEGIN
    PRINT 'Database TodoDb already exists';
END
GO
EOF
        
        echo "Database setup complete"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Attempt $RETRY_COUNT: Waiting for SQL Server..."
    sleep 5
done

# Keep SQL Server running
wait $SERVER_PID
