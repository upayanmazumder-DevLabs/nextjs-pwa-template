#!/bin/sh
set -e

# Write the VAPID public key to runtime-config.json at container start
echo "{\n  \"VAPID_PUBLIC_KEY\": \"${VAPID_PUBLIC_KEY:-}\"\n}" > /workspace/app/public/runtime-config.json

# Start PM2 as before
exec "$@"
