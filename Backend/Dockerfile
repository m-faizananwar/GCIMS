# Build stage
FROM gcc:13-bullseye as builder

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    git \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . .

# Create build directory and build
RUN mkdir -p build && cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && \
    make

# Runtime stage - lightweight image
FROM debian:bullseye-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Copy built executable from builder
COPY --from=builder /app/build/GCIMS /app/GCIMS

# Copy data files if needed
COPY --from=builder /app/*.json /app/
COPY --from=builder /app/*.csv /app/

# Expose the port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Run the application
CMD ["./GCIMS"]
