FROM eclipse-temurin:21-jre

ARG JAR_FILE=build/libs/*.jar

WORKDIR /app

COPY ${JAR_FILE} app.jar

EXPOSE 8081

ENV ACTIVE_PROFILE prod,secret

ENTRYPOINT ["java","-Dspring.profiles.active=${ACTIVE_PROFILE}","-jar","app.jar"]
