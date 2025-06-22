#!/bin/bash
# Test script to verify WASM build setup

echo "Testing WebAssembly build setup..."

# Check if build files exist
if [ ! -f "build.js" ]; then
    echo "❌ build.js not found"
    exit 1
fi

if [ ! -f "build.sh" ]; then
    echo "❌ build.sh not found"
    exit 1
fi

if [ ! -f "env_check.sh" ]; then
    echo "❌ env_check.sh not found"
    exit 1
fi

if [ ! -f "vcpkg.json" ]; then
    echo "❌ vcpkg.json not found"
    exit 1
fi

echo "✅ All build files found"

# Check if C++ source files exist
CPP_FILES=(
    "cpp/src/data_preprocessing.cpp"
    "cpp/src/dfs.cpp" 
    "cpp/src/main.cpp"
)

for file in "${CPP_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ $file not found"
        exit 1
    fi
done

echo "✅ All C++ source files found"

# Check if package.json has the right scripts
if ! grep -q "build:wasm" package.json; then
    echo "❌ build:wasm script not found in package.json"
    exit 1
fi

if ! grep -q "gh-pages" package.json; then
    echo "❌ gh-pages dependency not found in package.json"
    exit 1
fi

echo "✅ Package.json configured correctly"

# Check if GitHub Actions workflow exists
if [ ! -f ".github/workflows/gh-pages.yml" ]; then
    echo "❌ GitHub Actions workflow not found"
    exit 1
fi

echo "✅ GitHub Actions workflow found"

echo ""
echo "🎉 All setup checks passed!"
echo ""
echo "Next steps:"
echo "1. Make sure you have Emscripten installed locally for development"
echo "2. Set VCPKG_ROOT environment variable"
echo "3. Run 'npm run build:wasm' to test the WebAssembly build"
echo "4. Run 'npm run build' to build the complete project"
echo "5. Commit and push to trigger GitHub Actions deployment"
