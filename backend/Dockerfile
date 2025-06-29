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

# Stage 2: runtime su Debian (glibc) invece di Alpine
FROM eclipse-temurin:21-jdk              # variante Debian-based
WORKDIR /app

# Installa i certificati di sistema
RUN apt-get update \
 && apt-get install -y ca-certificates \
 && update-ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Forza Java su IPv4 (opzionale)
ENV JAVA_TOOL_OPTIONS="-Djava.net.preferIPv4Stack=true"

# Copia il JAR compilato
COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8080   # Render scannerà la porta interna attiva
ENTRYPOINT ["java","-jar","app.jar", "--debug"]