@echo off
TITLE Tableau de Bord Decisionnel du CIAT - ISEP Amadou Traware
color 0A

echo ===============================================================================
echo   CENTRE D'INNOVATION, D'APPLICATION ET DE TRANSFERT (CIAT) - ISEP DIAMNIADIO
echo   Lancement Automatique du Tableau de Bord Decisionnel et de l'Assistant IA
echo ===============================================================================
echo.
echo [1/3] Verification de l'environnement d'execution...
cd /d "%~dp0..\03_Application_Dashboard"

echo [2/3] Demarrage du serveur HTTP local sur le port 3000...
start /b node server.js

echo [3/3] Ouverture de l'application dans votre navigateur par defaut...
timeout /t 2 /nobreak >nul
start http://localhost:3000/

echo.
echo ===============================================================================
echo   Le Dashboard CIAT est actif sur : http://localhost:3000/
echo   Pour arreter le serveur, fermez simplement cette fenetre de commande.
echo ===============================================================================
pause
