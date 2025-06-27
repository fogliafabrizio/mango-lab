# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine
ARG JAR_FILE=target/*.jar

# Copia il jar prodotto dalla build Maven
COPY ${JAR_FILE} /app.jar

# Espone la porta standard
EXPOSE 8080

# Avvia l’app
ENTRYPOINT ["java","-jar","/app.jar"]
