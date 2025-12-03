
# Single-stage build and run (gcc:13)
FROM gcc:13

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    git \
    python3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . .

# Build the project
RUN mkdir -p build && cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && \
    make

# Expose the port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Run the application
CMD ["/app/build/GCIMS"]
