#!/bin/bash

echo "Compilando exe..."
pkg server.js --targets node18-win-x64 --output dist/fsi-puntos

echo "Creando carpeta dist..."
mkdir -p dist

echo "Copiando archivos..."
cp config.json dist/
cp -R public dist/

echo "Listo."