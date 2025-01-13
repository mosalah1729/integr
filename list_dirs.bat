@echo off
setlocal enabledelayedexpansion

set "depth=6"   :: Change this value to increase the depth level
set "indent=    "

call :printDir "%cd%" 0
exit /b

:printDir
set "currentDir=%1"
set /a "currentDepth=%2"

for /d %%D in ("%currentDir%\*") do (
    set "dirName=%%~nxD"
    echo !indent:~0,%currentDepth%! !dirName!
    if !currentDepth! lss %depth% (
        call :printDir "%%D" !currentDepth!+1
    )
)
exit /b
