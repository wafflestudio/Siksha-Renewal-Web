# Siksha Web

'서울대학교 식단 알리미 : 식샤' 의 웹사이트 Github Repository 입니다.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- .env.development.local
- .env.production.local
  - env 파일은 dm으로 말씀해주세요!

### Installation

1. 리포지토리 복제:
   ```bash
   git clone https://github.com/wafflestudio/Siksha-Renewal-Web.git
   ```
2. 프로젝트 디렉토리로 이동:
   ```bash
   cd Siksha-Renewal-Web
   ```
3. yarn 의존성 설치:
   ```bash
   npm i -g yarn #yarn 설치되지 않은 경우
   yarn install
   ```

### Running Locally

프로젝트 디렉토리에서 아래 명령어 수행:
```bash
yarn run dev
```
로컬호스트 링크 [http://localhost:3000](http://localhost:3000) 를 열어서 확인 가능합니다..

### Building for Production

프로젝트를 빌드하기 위해서는 아래 명령어 사용:
```bash
yarn build
```

이후 아래의 명령어를 입력해줍니다.:
```bash
yarn start
```

### Deployment

현재는 AWS를 사용해 배포를 하고 있습니다. 배포서버는 dev/master 브랜치를 반영하는 Development 서버, prod 브랜치를 반영하는 Production 서버로 나뉩니다.:
- Production: [https://siksha.wafflestudio.com/](https://siksha.wafflestudio.com/)
  - [CloutFront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=ap-northeast-2#/distributions/E3NQOV6KLVI7OZ)
  - [S3](https://ap-northeast-2.console.aws.amazon.com/s3/buckets/siksha.wafflestudio.com?region=ap-northeast-2)
  - [라우팅용 Lambda edge Function](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/siksha-frontend-route?tab=code)
- Development: [https://siksha-dev.wafflestudio.com/](https://siksha-dev.wafflestudio.com/)
  - [CloutFront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=ap-northeast-2#/distributions/E1VY1M8HHPU8UB)
  - [S3](https://ap-northeast-2.console.aws.amazon.com/s3/buckets/siksha-dev.wafflestudio.com?region=ap-northeast-2&bucketType=general&tab=objects)
  - [라우팅용 Lambda edge Function](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/siksha-frontend-route-dev?tab=code)
- 각 주소에 대해 간단히 설명하면 CloudFront -> 캐시서버, S3 -> Next.js의 정적 파일이 올라가는 곳, Lambda edge function -> 사용자가 접속시 실행되는 함수 정도로 알고 계시면 될거 같습니다!
- 이후 AWS에서 설정 관리를 위해서 IAM권한 받아서 aws 계정 생성하는 것을 추천드립니다.

현재는 Github Action을 사용해 앱을 자동으로 배포하고 있습니다. 이에관한 workflow 명령어는 `.github/workflows` 디렉토리에서 확인 가능합니다.

### Environment Variables

배포시 필요한 환경 변수는 GitHub Secrets로 관리되고 있습니다.
- 로컬에서 동작시킬경우, 소셜로그인을 위해 앞선 언급대로 로컬에 env 파일 설정이 필요합니다.

### Current Status

- 미개발 상태에서 시작해서 기능적인 부분은 전부 완성했으나, 기술적 부채들을 해결할 필요가 있습니다.
  - App router로의 마이그레이션
  - css 리팩토링
  - s3 + lambda -> docker + ec2를 사용한 배포방식 변경
  - SEO + 성능 개선 + Firebase analytics 설정
- 추가로 새로운 피쳐 개발(아마 식샤 사장님앱)도 진행해야 합니다.

### References
[Apple login 설정시 주의점](/docs/apple-login.md)


[프로젝트 컨벤션](/docs/convention.md)
