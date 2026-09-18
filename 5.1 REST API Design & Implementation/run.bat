@echo off
setlocal enabledelayedexpansion
set "POWERSHELL_EXE=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"

echo ====================================================
echo        Blog Scheduler Spring Boot 3 Launcher
echo ====================================================

:: Use JAVA_HOME first when it points to a valid JDK
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
    echo [Java] Detected through JAVA_HOME.
    goto check_maven
)

:: 1. Check if java is already in PATH
where java >nul 2>nul
if %errorlevel% equ 0 (
    echo [✓] Java detected in system PATH.
    goto check_maven
)

echo [!] 'java' is not in system PATH. Searching standard JDK installation folders...

set "FOUND_JAVA="

:: Search standard Windows JDK directories
for %%D in (
    "C:\Program Files\Java\jdk*"
    "C:\Program Files\Eclipse Adoptium\jdk*"
    "C:\Program Files\Amazon Corretto\jdk*"
    "C:\Program Files\Microsoft\jdk*"
    "C:\Program Files\Zulu\jdk*"
    "C:\Program Files (x86)\Java\jdk*"
    "%USERPROFILE%\.jdks\*"
) do (
    if exist "%%~fD\bin\java.exe" (
        set "FOUND_JAVA=%%~fD"
        goto java_found
    )
)

:java_found
if defined FOUND_JAVA (
    echo [✓] Found JDK at: !FOUND_JAVA!
    set "JAVA_HOME=!FOUND_JAVA!"
    set "PATH=!FOUND_JAVA!\bin;!PATH!"
    goto check_maven
)

echo.
echo [X] Java (JDK 17+) was not found on your system.
echo.
echo Please install JDK 17:
echo 1. Download OpenJDK 17 or Eclipse Temurin 17 from: https://adoptium.net/
echo 2. Run the installer and check the option "Add to PATH" and "Set JAVA_HOME".
echo 3. Open a new terminal and run .\run.bat again.
echo.
pause
exit /b 1

:check_maven
:: 2. Check if global mvn is installed
where mvn >nul 2>nul
if %errorlevel% equ 0 (
    echo [✓] Global Maven detected. Launching Spring Boot...
    mvn spring-boot:run
    exit /b 0
)

echo [!] Global 'mvn' command not found in PATH.
echo [i] Setting up local Apache Maven 3.9.6...

if not exist ".maven" mkdir ".maven"

if not exist ".maven\apache-maven-3.9.6\bin\mvn.cmd" (
    echo  -^> Downloading Apache Maven 3.9.6...
    "%POWERSHELL_EXE%" -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip' -OutFile '.maven\apache-maven-3.9.6-bin.zip'"
    echo  -^> Extracting Maven package...
    "%POWERSHELL_EXE%" -Command "Expand-Archive -Path '.maven\apache-maven-3.9.6-bin.zip' -DestinationPath '.maven' -Force"
    del ".maven\apache-maven-3.9.6-bin.zip"
    echo [✓] Local Maven installed in .maven/
)

echo [➜] Launching Spring Boot application...
".maven\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
