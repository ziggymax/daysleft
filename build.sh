#!/bin/sh

SCRIPTDIR="$(dirname "$0")"
DIRNAME="$(realpath $SCRIPTDIR)"
echo "Running build script in ${DIRNAME}"
cd "$DIRNAME" || exit 1

npm install
npm run build && echo "Build completed successfully"
