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

# Copia il jar compilato
COPY --from=builder /workspace/target/*.jar app.jar

# Se necessario: configura user non-root (opzionale)
# RUN addgroup -S app && adduser -S app -G app
# USER app

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]