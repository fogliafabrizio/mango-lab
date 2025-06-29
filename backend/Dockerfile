# ------------------------
# Stage 1: build con Maven
# ------------------------
FROM maven:3.8.8-eclipse-temurin-21 AS builder
WORKDIR /app

# 1) Copia solo i file di Maven per cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2) Copia il sorgente e compila
COPY src ./src
RUN mvn clean package -DskipTests -B

# ------------------------------
# Stage 2: runtime leggero Alpine
# ------------------------------
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# 3) Copia il JAR prodotto
COPY --from=builder /app/target/*.jar ./app.jar

# 4) Esponi porta
EXPOSE 8080

# 5) Avvia l’app
ENTRYPOINT ["java","-jar","app.jar"]
