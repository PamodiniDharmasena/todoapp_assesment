#!/bin/bash
set -e

echo "Waiting for MSSQL database to be ready..."
until /opt/mssql-tools18/bin/sqlcmd -S mssql -U sa -P "$SA_PASSWORD" -Q "SELECT 1" -b 2>/dev/null || /opt/mssql-tools/bin/sqlcmd -S mssql -U sa -P "$SA_PASSWORD" -Q "SELECT 1" -b 2>/dev/null; do
    >&2 echo "MSSQL is unavailable - sleeping"
    sleep 2
done

>&2 echo "MSSQL is up - executing migrations"

# Run EF Core migrations
dotnet ef database update --startup-project . || true

echo "Starting application..."
exec dotnet todoapp_backend.dll
