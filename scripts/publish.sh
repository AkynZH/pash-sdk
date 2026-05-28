#!/bin/bash
set -e

echo "→ Running tests..."
npm test

echo "→ Building..."
npm run build

echo "→ Regenerating SYSTEM_PROMPT.md..."
npm run prompt

echo "→ Bundle sizes:"
echo "  CJS:     $(wc -c < dist/pash.cjs.js | xargs) bytes"
echo "  ESM:     $(wc -c < dist/pash.esm.js | xargs) bytes"
echo "  Browser: $(wc -c < dist/pash.browser.js | xargs) bytes (min)"

echo ""
CURRENT=$(node -p "require('./package.json').version")
read -p "Version (current: $CURRENT): " VERSION

if [ -z "$VERSION" ]; then
  echo "Version required. Aborted."
  exit 1
fi

npm version "$VERSION" --no-git-tag-version
git add -A
git commit -m "chore: release v$VERSION"
git tag "v$VERSION"
git push origin main --follow-tags

npm publish

echo ""
echo "✓ Published pash-sdk@$VERSION"
echo "  npm:    https://www.npmjs.com/package/pash-sdk"
echo "  GitHub: https://github.com/YOUR/pash/releases/tag/v$VERSION"
