# Stage 1: build del jar
FROM maven:3.9.4-eclipse-temurin-21 AS builder
WORKDIR /workspace

# Copia solo il pom per sfruttare la cache delle dipendenze
COPY pom.xml .
# Pre-scarica le dipendenze
RUN mvn dependency:go-offline -B

# Copia il sorgente e compila
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: runtime
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# 1) Installa i certificati di sistema
RUN apk add --no-cache ca-certificates

# 2) Copia il tuo cert di Supabase nel trust store
COPY certs/supabase-ca.crt /usr/local/share/ca-certificates/par-supabase.crt
RUN update-ca-certificates

# 3) Forza Java a usare IPv4 (evitiamo il tentativo IPv6 e il "Network unreachable")
ENV JAVA_TOOL_OPTIONS="-Djava.net.preferIPv4Stack=true"

# 4) Copia il JAR compilato dallo stage builder
COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]