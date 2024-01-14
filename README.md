## Siksha Web

'서울대학교 식단 알리미 : 식샤' 의 웹사이트 Github Repository 입니다.

## 인수인계
안녕하세요 siksha web frontend 개발자 TheoLee72 이재운입니다.
인수인계를 위해 이렇게 readme 파일을 작성하게 되었습니다.

readme 파일에서는 권한 설정과 직관적으로 알기 어려운 로직 구조등을 설명드릴 예정입니다.
개별 코드에 대한 설명은 코드 옆 주석으로 작성드리겠습니다.

### aws console
aws console을 통해 배포상태를 확인해볼 수 있습니다. 저희는 배포가 두가지로 나뉩니다.
- production
- development

web도 prod 배포와 dev 배포가 따로 있어서 각각 주소가 다르며 백도 마찬가지로 prod api랑 dev api랑 호출 주소가
다릅니다. (각 배포 상태에 따라 다른 주소로 api call하는 로직은 constants/constants.ts에 구현되어 있습니다.)

aws console에 접근하여 배포상태를 확인하기 위해서는 와플스튜디오 iam계정으로 aws를 로그인해야합니다. 
저희 PO님께 제가 쓰던 iam 계정을 넘기고 갈테니 연락해서 일단 받으시되 와플스튜디오 운영진 측에
연락하셔서 개인 iam 계정을 발급받는 것을 추천드립니다.

### 배포
앞서 배포에 prod 배포와 dev 배포가 있다고 말씀드렸습니다. 각 배포의 url은
- prod: https://siksha.wafflestudio.com/
- dev: https://siksha-dev.wafflestudio.com/

입니다. 식샤에서 배포는 모두 github action으로 자동배포 되고 있습니다. (그 자동배포되는 로직은
.github/workflows/aws-dev.yml과 aws-prod.yml에 적혀 있습니다.)
배포에 필요한 환경변수들은 모두 github secret으로 관리되고 있습니다. prod배포와 dev배포의
차이점은 카카오 redirecturi와 cloudfront 뿐입니다. 

사실 배포쪽은 건드리실 게 없을 것 같습니다!

### 카카오
카카오 로그인을 위한 카카오 설정은 모두 카카오 developer에 들어가서 po님께 식샤 권한을 받으면 
확인하실 수 있습니다. restapi와 redirecturi만 보시면 될 것 같습니다. 이것도 이미 잘 되어 있습니다.

### 현재 상황 
현재 상황은 웹에서 보이는 인터페이스는 완벽하게 완료한 상황입니다. 하지만 구글 로그인이
구현되지 않은 점과 쓸모 없는 legacy 코드, 또한 불명확한 명명법, 커뮤니티 탭 미구현
, 애매한 모바일 뷰 등 웹이 나아가야 할 개발양은 여전히 많습니다. 화이팅하시길 바랍니다!
