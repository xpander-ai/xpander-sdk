#!/bin/bash

# Format Python files with Black
echo "🐍 Formatting Python files with Black..."
black .

# Format other files with Prettier (if available)
if command -v npx >/dev/null 2>&1; then
    echo "💅 Formatting other files with Prettier..."
    npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md,yml,yaml}"
else
    echo "⚠️  Prettier not available (install Node.js and run: npm install -g prettier)"
fi

echo "✅ Formatting complete!"
