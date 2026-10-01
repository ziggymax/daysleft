#!/bin/sh

SCRIPTDIR="$(dirname "$0")"
DIRNAME="$(realpath $SCRIPTDIR)"
echo "Running build script in ${DIRNAME}"
cd "$DIRNAME" || exit 1

npm install
npm run build || exit 1

# Stamp the build with the date of the newest commit (day zero-padded so it always fills the 30 X's).
BUILD_DATE=$(git log -1 | sed -n 's/^Date: *//p' | sed 's/^\(... ...\) \([1-9]\) /\1 0\2 /')
sed -i "s/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/$BUILD_DATE/" ../index.html

echo "Build completed successfully (build date: ${BUILD_DATE})"
