# AWS Distribution

## 개요

AWS배포방식에 대해 정리한 문서입니다.

### 기본 구조

- 현재 배포의 기본 구조는 아래 그림과 같습니다.
- 현재 웹버전 이용자수가 많지 않아 캐싱에 제약이 있고, cold start문제가 있더라도 docker 배포 환경으로 비용이 거의 들지 않는 람다를 선택했지만, 추후 이용자수가 많아지면 lambda 대신 다른 방법을 사용하는 것도 좋을거 같습니다.

### Github Actions

- .github/workflows에 Lambda Deploy Dev(Prod)로 yml파일이 있고, 이를 기반으로 모든 배포가 진행됩니다.
- 크게 환경변수 설정 -> AWS 자격증명 설정 -> 도커 빌드 및 ECR 리포지토리에 업로드 -> 람다 함수 업데이트 -> ECR 리포지토리 정리 순으로 진행됩니다.

### Docker Build

- Next.js 예제 + 블로그 내용을 참고해서 만들었지만, 일부 버전에서 차이가 발생합니다.
  - node 버전을 최신 LTS버전(22)으로 교체했습니다.
  - dev server와 prod server에 동시 배포를 위해 빌드시 environment 변수를 받아올 수 있도록 설정했습니다.
  - lambda에서 next.js 실행을 위해 [aws-lambda-adapter](https://github.com/awslabs/aws-lambda-web-adapter)를 추가했습니다.

### Elastic Container Registry(ECR)

- ECR은 도커 이미지를 저장하기 위한 리포지토리입니다.
- Github Action 실행시 생성된 도커파일이 자동으로 업로드됩니다.
- 배포과정에서 최신 도커파일을 제외한 나머지 파일은 자동으로 삭제되도록 설정했습니다.

### Lambda

- [서버리스 환경](https://www.redhat.com/ko/topics/cloud-native-apps/what-is-serverless)에서 코드를 배포할 수 있게 해주는 서비스입니다.
- 주로 코드를 직접 업로드하여 사용하는것이 일반적이나, Lambda의 경우 Docker파일 배포도 지원합니다.
- 람다함수는 ECR 리포지토리에 업로드된 도커파일 참조하여 서비스를 사용자에게 제공하게 됩니다.
- Cold start문제를 줄이기 위해 람다 실행시 메모리 용량은 1024MB, 타임아웃은 10초로 설정했습니다.
  - 학교안에서 접속 시도시 5.5초정도 지연 발생했습니다.
- [Lambda 배포시 Docker 파일은 Readonly가되기 때문에](https://stackoverflow.com/questions/66698034/aws-lambda-read-only-file-system-error-using-docker-image-to-store-ml-model) 빌드타임에서의 캐싱(ex: getStaticProps)을 제외한 추가적인 런타임에서의 캐싱 상호작용은 불가능합니다.

### CloudFront

- 웹페이지의 컨텐츠 배포를 최적화해주는 [CDN](https://aws.amazon.com/ko/what-is/cdn/) 서비스입니다.
- Lambda함수를 분산배포하고, Route 53에 등록된 도메인을 받아서 식샤 도메인을 통해 Lambda 함수에 접근할 수 있도록 합니다.
- Lambda 배포된 서버와 직접 통신해야하기 때문에 cashing등 다른 역할은 수행하지 않도록 설정했습니다.

### Route 53

- 식샤 도메인을 제공해주는 서비스입니다.
- 일반적으로 건들일은 없으나, SEO 등에서 레코드 인증이 필요한 경우등에 이 서비스에서 관리하면 됩니다.
