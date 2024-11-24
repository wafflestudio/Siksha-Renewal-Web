# Multi-stage build

# 1단계: 환경 설정 및 dependancy 설치
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app

# Dependancy install을 위해 package.json, package-lock.json, yarn.lock 복사 
COPY package.json yarn.lock ./ 

# Dependancy 설치 (새로운 lock 파일 수정 또는 생성 방지)
RUN yarn --frozen-lockfile 

###########################################################

# 2단계: next.js 빌드 단계
FROM node:22-alpine AS builder

# Docker를 build할때 개발 모드 구분용 환경 변수를 명시함
ARG ENV_MODE 
ENV ENV_MODE=${ENV_MODE}

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app

# node_modules 등의 dependancy를 복사함.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# env는 github action에서 설정한 환경변수를 받아옴
RUN if [ "$ENV_MODE" = "production" ]; then yarn build; else yarn devbuild; fi

###########################################################

# 3단계: next.js 실행 단계
FROM node:22-alpine AS runner

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app

# container 환경에 시스템 사용자를 추가함
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# next.config.js에서 output을 standalone으로 설정하면 
# 빌드에 필요한 최소한의 파일만 ./next/standalone로 출력이 된다.
# standalone 결과물에는 public 폴더와 static 폴더 내용은 포함되지 않으므로, 따로 복사를 해준다.
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

### aws-lambda-adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

# 컨테이너의 수신 대기 포트를 3000으로 설정
USER nextjs
EXPOSE 3000
ENV PORT 3000

# node로 애플리케이션 실행
CMD ["node", "server.js"] 

# standalone으로 나온 결과값은 node 자체적으로만 실행 가능
# CMD ["npm", "start"]
