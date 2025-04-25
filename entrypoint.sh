#!/bin/sh

echo "JWT_SECRET: $JWT_SECRET"

if [ -z "$JWT_SECRET" ]; then
  echo "❌ JWT_SECRET não está definida!"
  exit 1
fi

echo "✅ JWT_SECRET detectada, iniciando app..."
npm run start:prod