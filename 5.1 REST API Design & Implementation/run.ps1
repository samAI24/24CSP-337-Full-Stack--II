# Blog Scheduler Launcher Script for Windows PowerShell
$ErrorActionPreference = "Continue"

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "       Blog Scheduler Spring Boot 3 Launcher        " -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Check if Java is installed
$javaCmd = Get-Command java -ErrorAction SilentlyContinue
if (-not $javaCmd) {
    Write-Host "[X] 'java' command not found in PATH. Please ensure JDK 17+ is installed." -ForegroundColor Red
    exit 1
}

$javaHome = Split-Path (Split-Path $javaCmd.Source -Parent) -Parent
if ($env:JAVA_HOME -ne $javaHome) {
    $env:JAVA_HOME = $javaHome
}

Write-Host "[OK] Java detected." -ForegroundColor Green

# 2. Check if global Maven exists
$mvnCmd = Get-Command mvn -ErrorAction SilentlyContinue
if ($null -ne $mvnCmd) {
    Write-Host "[OK] Global Maven detected. Starting Spring Boot application..." -ForegroundColor Green
    & $mvnCmd.Source spring-boot:run
    exit 0
}

# 3. Handle local Maven setup
Write-Host "[!] Global 'mvn' command not found in PATH." -ForegroundColor Yellow
Write-Host "[i] Setting up local Apache Maven 3.9.6..." -ForegroundColor Cyan

$projectDir = Get-Location
$toolsDir = Join-Path $projectDir ".maven"
$mvnZip = Join-Path $toolsDir "apache-maven-3.9.6-bin.zip"
$mvnHome = Join-Path $toolsDir "apache-maven-3.9.6"
$mvnExe = Join-Path $mvnHome "bin\mvn.cmd"

if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir | Out-Null
}

if (-not (Test-Path $mvnExe)) {
    Write-Host " -> Downloading Apache Maven 3.9.6..." -ForegroundColor Cyan
    $url = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $url -OutFile $mvnZip

    Write-Host " -> Extracting Maven package..." -ForegroundColor Cyan
    Expand-Archive -Path $mvnZip -DestinationPath $toolsDir -Force
    Remove-Item $mvnZip -Force
    Write-Host "[OK] Local Maven installed in .maven/" -ForegroundColor Green
} else {
    Write-Host "[OK] Local Maven found in .maven/" -ForegroundColor Green
}

Write-Host "[>] Launching Spring Boot application with local Maven..." -ForegroundColor Green
& $mvnExe spring-boot:run
