@echo off
echo Initializing Git...
if not exist .git (
    git init
    echo Git initialized.
) else (
    echo Git already initialized.
)

echo Setting branch to main...
git branch -M main

echo Configuring Remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Dhanush-creates/b2gai.git
echo Remote origin set to https://github.com/Dhanush-creates/b2gai.git

echo Building client...
cd client
call npm install
call npm run build
cd ..

echo Moving built files to root...
move client\dist\* . >nul 2>&1

echo Adding files...
git add .

echo Committing...
git commit -m "Deploy to GitHub Pages"

echo Pushing to GitHub...
git push -u origin main
echo Done. GitHub Pages URL: https://dhanush-creates.github.io/b2gai/
pause
