@echo off
cd /d "%~dp0"

echo Inicializando repositório Git...
git init

echo Adicionando repositório remoto...
git remote add origin https://github.com/Guilhermebarbo/Viana-Pedroso.git

echo Adicionando todos os arquivos...
git add .

echo Criando primeiro commit...
git commit -m "Primeira versão do sistema de envio"

echo Definindo branch principal como main...
git branch -M main

echo Enviando para o GitHub...
git push -u origin main

echo ====================================
echo Projeto enviado com sucesso!
pause
