@echo off
echo Initializing Git...
if not exist .git (
    git init
    echo Git initialized.
) else (
    echo Git already initialized.
)

echo Configuring Remote...
git remote remove origin 2>nul
git remote add origin https://github.com/tnsanjai29/B2Gserver.git
echo Remote origin set to https://github.com/tnsanjai29/B2Gserver.git

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit of GOV-AID project"

echo Pushing to GitHub...
git push -u origin master
if errorlevel 1 (
    git push -u origin main
)
echo Done.
pause
