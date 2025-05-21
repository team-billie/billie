# 📚포팅 메뉴얼

## 📑목차

### [1. 기술 스택 & 버전 정보](#기술-스택-버전-정보)

### [2. 빌드 방법](#빌드-방법)

### [3. 환경 변수](#환경-변수)

### [4. 외부 서비스 정보](#외부-서비스-정보)

---

## 🛠기술 스택 & 버전 정보

### 1. 프로젝트 협업 툴

**이슈 관리**: JIRA

**형상 관리**: Gitlab

**커뮤니케이션**: Notion, Mattermost, Discord

**설계**: ERDCloud

**디자인**: Figma

### 2. 개발환경

#### IDE

**VS Code**: 1.100.2

**IntelliJ**: 2025.1.1.1

#### DB

**MySQL**: 8.0

**Cassandra**: 4.0

**ElasticSearch**: 8.12.2

**Redis**: 8.0.0

#### CI/CD

**Jenkins**: 2.508

**Docker**: 28.1.1

### 3. 상세

#### Backend

##### Spring Boot

**JDK**: 21

**Spring Boot**: 3.4.5

**QueryDSL**: 5.0.0

**JWT**: 0.12.6

**OAuth 2.0**

**Lombok**: 1.18.30

**Vertex AI**: 1.20.1

**Protobuf**: 4.30.2

**AWS Java SDK :: Services :: Amazon S3**: 1.12.609

##### AI

**Python**: 3.11

**fastapi**: 0.110.2

**uvicorn[standard]**: 0.29.0

**torch**: 2.2.2

**transformers**: 4.40.1

**pillow**: 10.3.0

**scipy**: 1.13.0

**numpy**: 1.26.4

**httpx**: 0.27.0

#### Frontend

**@react-google-maps/api**: 2.20.6

**@stomp/stompjs**: 7.1.1

**@tanstack/react-query**: 5.76.1

**@tanstack/react-query-devtools**: 5.76.1

**axios**: 1.9.0

**framer-motion**: 12.12.1

**lucide-react**: 0.503.0

**next**: 14.2.28

**next-pwa**: 5.6.0

**react**: 18

**react-dom**: 18

**react-draggable**: 4.4.6

**react-hook-form**: 7.56.3

**react-intersection-observer**: 9.16.0

**react-kakao-maps-sdk**: 1.1.27

**react-timestamp**: 6.0.0

**sockjs-client**: 1.6.1

**swiper**: 11.2.6

**zustand**: 5.0.4

**@tailwindcss/forms**: 0.5.10

**@types/node**: 20

**@types/react**: 18

**@types/react-dom**: 18

**@types/sockjs-client**: 1.5.4

**daisyui**: 5.0.30

**eslint**: 8

**eslint-config-next**: 14.2.28

**postcss**: 8

**tailwindcss**: 3.4.1

**typescript**: 5

#### Server

**AWS**: 6.8.0-1021-aws

**Nginx**: 1.27.5

---

## ⚙빌드 방법

### ◼BE

#### Spring Boot

1. MySQL, Cassandra, ElasticSearch, RabbitMQ 실행 확인

2. `backend/nextdoor` 디렉토리로 이동

3. `./gradlew bootRun --args-"--spring.profiles.active=dev,secret"` 명령어 실행

#### AI

1. `ai/nextdoor` 디렉토리로 이동

2. `pip install --no-cache-dir -r requirements.txt` 명령어 실행

3. `uvicorn app.main:app --host 0.0.0.0 --port 8000` 명령어 실행

### ◻FE

1. `frontend/nextdoor` 디렉토리로 이동

2. `npm install` 실행

3. `npm run dev` 실행

---

## 🌞환경 변수

### ◼BE

#### Spring Boot

application-secret.yaml

```yaml
spring:
  datasource:
    hikari:
      username: [MySQL username]
      password: [MySQL password]
    url : [MySQL URL]

  cassandra:
    username: [Cassandra username]
    password: [Cassandra password]

  rabbitmq:
    username: [RabbitMQ username]
    password: [RabbitMQ password]

  elasticsearch:
    uris: [ElasticSearch URI]
    username: [ElasticSearch username]
    password: [ElasticSearch password]

  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: [카카오 로그인 client ID]
            client-secret: [카카오 로그인 client secret]
            authorization-grant-type: authorization_code
            redirect-uri: [카카오 로그인 redirect URI]
            scope:
              - profile_nickname
              - profile_image
              - account_email
              - gender
              - birthday
            client-name: Kakao
            client-authentication-method: client_secret_post
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id

custom:
  google:
    ai:
      gemini:
        project-id: [Google Cloud Platform project ID]
  fintech:
    apiKey: [SSAFY 핀테크 API key]

cloud:
  aws:
    credentials:
      access-key: [AWS S3 access key]
      secret-key: [AWS S3 secret key]
```

### ◻FE

.env

```
# API 서버 주소 (Spring Boot 서버)
NEXT_PUBLIC_API_URL=http://[백엔드 도메인]

# WebSocket 서버 주소 (ChatWebSocketConfig에 정의된 URL)
NEXT_PUBLIC_WS_URL=ws://[백엔드 도메인]

# 지도 
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[Google Maps API key]
```

## 💻외부 서비스 정보

#### AWS S3

- 이미지 파일 저장을 위해 AWS S3 저장소 필요

#### 카카오 로그인

- 카카오 소셜 로그인을 위해 카카오 로그인 신청 필요

#### Google Maps

- 지도 표시를 위해 Google Maps API key 발급 필요
