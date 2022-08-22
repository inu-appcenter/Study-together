# Study-together
- Tech stack: Node.js, MongoDB
- [Notion](https://www.notion.so/cdbe44135c3f4e96b13d4df184ea92c0)

## 소통을 위한 커밋 규칙
- feat: 새로운 기능의 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드의 구조는 변화없이 스타일 변경(Ex: 변수 이름을 loginUser대신에 login_user로 바꿨을때)
- refactor: 코드 리펙토링
- chore: 기타 변경

Ex) feat: 로그인 기능 추가

## 설계 구조(예시 이미지)
~~~
/index.js(서버 시작)
/routes.js(API 목록)
/controller.js(API의 알고리즘)
/model(DB의 스키마 정보)
  /user.js(유저)
  /group(모임 하나의 데이터)
    /group_info.js(모임 정보)
    /post.js(모임의 글)
  /post.js(모임 모집 글)
/uploads(업로드 데이터)
  /images
~~~
- routes<br>
![image](https://user-images.githubusercontent.com/67142421/184523799-481ce73e-2e16-44de-bae4-63858f50e617.png)
- controller<br>
![image](https://user-images.githubusercontent.com/67142421/184523782-17b246e4-3d0b-4283-bc48-15b8dcec2d70.png)
- model<br>
![image](https://user-images.githubusercontent.com/67142421/184523813-36318265-6a5e-41cc-978e-93e25e1e3f03.png)
- index.js<br>
![image](https://user-images.githubusercontent.com/67142421/184523847-d86e38d9-4ee3-45c6-864a-6085527009db.png)
