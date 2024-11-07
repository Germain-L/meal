# First stage: build the Go application
FROM golang:1.23 AS builder
WORKDIR /app

# Copy go.mod and go.sum files and download dependencies
COPY go.mod go.sum ./
RUN go mod download && go mod verify && go mod tidy

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Second stage: add migrate and setup environment
FROM alpine:latest

# Define migrate version, OS, and architecture
ARG MIGRATE_VERSION=4.15.2
ARG OS=linux
ARG ARCH=amd64

# Install necessary packages and download migrate tool
RUN apk --no-cache add ca-certificates curl && \
    curl -L "https://github.com/golang-migrate/migrate/releases/download/v${MIGRATE_VERSION}/migrate.${OS}-${ARCH}.tar.gz" -o migrate.tar.gz && \
    tar -xzf migrate.tar.gz && \
    mv migrate /usr/local/bin/migrate && \
    chmod +x /usr/local/bin/migrate && \
    rm migrate.tar.gz

WORKDIR /root/

# Copy the compiled Go application and migration files from the builder stage
COPY --from=builder /app/main .
COPY --from=builder /app/sql/migrations sql/migrations

# Run database migrations and start the Go application
CMD ["sh", "-c", "/usr/local/bin/migrate -path sql/migrations -database \"$DATABASE_URL\" up && ./main"]
