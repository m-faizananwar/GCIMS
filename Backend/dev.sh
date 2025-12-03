#!/bin/bash
# Local development and testing script

set -e

echo "=== GCIMS Backend Development Script ==="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

case "${1:-help}" in
  build)
    echo -e "${BLUE}Building project...${NC}"
    mkdir -p build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Debug ..
    make -j$(nproc)
    echo -e "${GREEN}Build complete! Executable: ./build/GCIMS${NC}"
    ;;
  
  run)
    echo -e "${BLUE}Running server...${NC}"
    if [ ! -f build/GCIMS ]; then
      echo -e "${BLUE}Binary not found, building first...${NC}"
      cd build
      cmake -DCMAKE_BUILD_TYPE=Debug ..
      make -j$(nproc)
      cd ..
    fi
    ./build/GCIMS
    ;;
  
  release)
    echo -e "${BLUE}Building release version...${NC}"
    mkdir -p build-release
    cd build-release
    cmake -DCMAKE_BUILD_TYPE=Release ..
    make -j$(nproc)
    echo -e "${GREEN}Release build complete! Executable: ./build-release/GCIMS${NC}"
    ;;
  
  test)
    echo -e "${BLUE}Testing API endpoints...${NC}"
    if ! command -v curl &> /dev/null; then
      echo "curl not found, please install it"
      exit 1
    fi
    
    BASE_URL="${2:-http://localhost:8080}"
    
    echo "Testing: GET $BASE_URL/"
    curl -s "$BASE_URL/" | head -20
    echo -e "\n"
    
    echo "Testing: GET $BASE_URL/cars (first 100 chars)"
    curl -s "$BASE_URL/cars" | head -c 100
    echo -e "\n\nUse \`curl -s $BASE_URL/cars | jq\` for full output"
    ;;
  
  docker-build)
    echo -e "${BLUE}Building Docker image...${NC}"
    docker build -t gcims-api:latest .
    echo -e "${GREEN}Docker image built: gcims-api:latest${NC}"
    ;;
  
  docker-run)
    echo -e "${BLUE}Running Docker container...${NC}"
    docker run -p 8080:8080 gcims-api:latest
    ;;
  
  clean)
    echo -e "${BLUE}Cleaning build artifacts...${NC}"
    rm -rf build build-release
    echo -e "${GREEN}Clean complete${NC}"
    ;;
  
  help|*)
    echo "Usage: $0 <command> [args]"
    echo ""
    echo "Commands:"
    echo "  build          - Build project (Debug mode)"
    echo "  run            - Build and run server locally"
    echo "  release        - Build project (Release mode with optimizations)"
    echo "  test [URL]     - Test API endpoints (default: http://localhost:8080)"
    echo "  docker-build   - Build Docker image"
    echo "  docker-run     - Run Docker container locally"
    echo "  clean          - Remove build artifacts"
    echo "  help           - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build                              # Debug build"
    echo "  $0 run                                # Build and run locally"
    echo "  $0 test                               # Test against local server"
    echo "  $0 test https://gcims-api.onrender.com # Test against Render"
    echo "  $0 docker-build                       # Build Docker image"
    ;;
esac
