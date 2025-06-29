# Stage 1: build con Maven
FROM maven:3.8.8-eclipse-temurin-21 AS builder
WORKDIR /app

# 1) Copia solo il pom per sfruttare la cache
COPY pom.xml .
# (eventualmente anche i file di settings se ne usi)
RUN mvn dependency:go-offline -B

# 2) Copia il sorgente e builda
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: runtime leggero
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# 3) Copia il JAR dal builder
COPY --from=builder /app/target/*.jar ./app.jar

EXPOSE 8080

# 4) Avvia l’app
ENTRYPOINT ["java","-jar","app.jar"]
