@echo off
TITLE Tableau de Bord Decisionnel du CIAT - ISEP Amadou Traware
color 0A

echo ===============================================================================
echo   CENTRE D'INNOVATION, D'APPLICATION ET DE TRANSFERT (CIAT) - ISEP DIAMNIADIO
echo   Lancement Automatique du Tableau de Bord Decisionnel et de l'Assistant IA
echo ===============================================================================
echo.
echo [1/3] Acces au dossier de l'application...
cd /d "%~dp003_Application_Dashboard"

echo [2/3] Verification et demarrage du serveur local...
start /b node server.js

echo [3/3] Ouverture automatique dans votre navigateur...
ping 127.0.0.1 -n 2 >nul
start http://localhost:3000/

echo.
echo ===============================================================================
echo   Le Dashboard CIAT est pret !
echo   Lien direct : http://localhost:3000/
echo   Pour fermer, appuyez sur une touche ou fermez cette fenetre.
echo ===============================================================================
pause
