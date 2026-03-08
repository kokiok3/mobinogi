# 도커 이미지를 만들기 위해서는 Dockerfile이 필요하다.

# 사용할 Image선택
FROM node:20

# 워킹 디렉토리 지정
WORKDIR /app


# 앱 의존성 복사 및 설치
COPY package*.json ./
COPY apps/crawler/package*.json ./apps/crawler/
COPY packages/shared/package*.json ./packages/shared/

# Puppeteer를 위한 리눅스 라이브러리 설치 (필수)
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils
    
RUN npm install

# 전체 소스 코드 복사
COPY . .

# 빌드실행
RUN npm run build:c2

# 실행
EXPOSE 8000
CMD ["npm", "run", "start:c"]