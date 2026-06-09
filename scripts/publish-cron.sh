#!/bin/bash
# Helper script to execute article publisher from scheduled tasks/cron jobs
# Automatically resolves the project root directory relative to this script

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."

cd "$PROJECT_ROOT"

echo "=================================================="
echo "Timestamp: $(date)"
echo "Working directory: $(pwd)"
echo "=================================================="

# Run the publication CLI
npx tsx scripts/publish-cli.ts
