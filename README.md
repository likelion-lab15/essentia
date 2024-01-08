# 💎 Onyx 향수 거래 플랫폼
<div align ="center">
  
  ![macbook](https://github.com/likelion-lab15/essentia/assets/96248861/ef709214-fb93-4082-84d3-8b4774ba03e2)

**Onyx [🔗 지금 이용해보러가기](https://main--ttp-onyx.netlify.app/)**
</div>

- TEST ID : s1@market.com
- TEST PASSWORD : 11111111

## 프로젝트 소개
- **Onyx**는 구매자와 판매자가 향수를 안전하게 거래할 수 있도록 중계를 해주는 플랫폼입니다.
- 사용하지 않는 향수가 있다면 **Onyx**에서 제품을 검색하여 누구나 판매할 수 있습니다.
- 원하는 향수의 중고 제품을 조회하고 구매할 수 있습니다.
- 거래를 위해 서로의 개인 정보를 공유할 필요가 없고, 메세지를 보내 가격을 흥정할 필요도 없습니다.
- 거래가 체결된 상품은 **Onyx** 검수센터에서 전문 검수팀이 철저한 검수한 후 발송됩니다.

## 개발 기간
- 기획 & 디자인 : 2023.11.20 ~ 2023.11.30 (11days)
- UI 구현 : 2023.12.01 ~ 2023.12.03 (3days)
- 기능 구현 : 2023.12.~ ing

## 작업 방식
- 오전/오후 스크럼 2회 (10:30 ~ 11:00)
- 예상치 못한 버그 발생은 깃 이슈 작성

## 함께한 팀원
<div align= "center">
  
  |김진우|김도현|현지수|
  |:---:|:---:|:---:|
  |<img width="160" alt="image" src="https://github.com/likelion-lab15/essentia/assets/96248861/fb756391-c25f-4161-b192-db9c833f346c">|<img width="160" alt="image" src="https://github.com/likelion-lab15/essentia/assets/96248861/074ed18f-8ee4-4822-b6f7-cdd08484b455">|<img width="160" alt="image" src="https://github.com/likelion-lab15/essentia/assets/96248861/c8ffd8df-153b-4773-9480-27ba3e7880f1">|
  |[@rlawlsdn263](https://github.com/rlawlsdn263/)|[@kimzeze](https://github.com/kimzeze/)|[@hyunzsu](https://github.com/hyuzsu/)|

</div>

## 프로젝트 목표
- 새로운 기술스택 경험해보기
- PR, 깃이슈 열심히 작성하기
- 완결보다 완성하기

## 기술스택
<div align= "center">
  <span>
  <img src="https://img.shields.io/badge/-React-%2361DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=3178C6&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-E00033?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">
  </span>
</div>

<br>
<br>
<details>
  <summary><b>❓ 왜 NextJS를 선택했나요?</b></summary>
<div markdown="1">
  
  팀원 모두가 NextJS에 대한 경험이 없었지만 이번 팀프로젝트를 통해서 함께 학습해보고 경험해보자는 취지였습니다.
  그리고 아래의 NextJS 특징에 집중했습니다.
  
  - pages 폴더 아래에 파일이름으로 라우팅해줘서 직관적이다.
  - 새로고침하지 않아도 수정사항만 빠르게 반영한다.
  - 로딩한 페이지가 꼭 필요로 하는 파일만 로드해, 첫 화면 렌더링이 빠르다.
  - 서버 사이드 렌더링이 가능하다.
  - 다음 페이지의 코드를 미리 가져와 페이지 전환이 빠르다.
  
</div>
</details>

## 역할 분담
### 김진우 (Leader)
- 프로젝트 구축
- 메인 페이지
- 로그인 페이지
- 마이 페이지
  
### 김도현
- 프로젝트 디자인
- 스크럼 회의 진행 및 기록
- 메인 페이지
- 제품상세 페이지
- 제품 구매 페이지

### 현지수
- 프로젝트 디자인
- 메인 페이지
- 제품 목록 페이지
- 제품 판매 페이지
  
## 폴더구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜axios.ts
 ┣ 📂app
 ┃ ┣ 📂admin
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂edituser
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┃ ┣ 📂buyhistory
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂sellhistory
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜BuyHistoryTable.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Membership.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MoreButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SellHistoryTable.tsx
 ┃ ┃ ┃ ┃ ┗ 📜_index.ts
 ┃ ┃ ┃ ┣ 📂_functions
 ┃ ┃ ┃ ┃ ┗ 📜getHistoryData.ts
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂myreview
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂wishlist
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜UserName.tsx
 ┃ ┃ ┃ ┗ 📜_index.ts
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂products
 ┃ ┃ ┣ 📂[_id]
 ┃ ┃ ┃ ┣ 📂buy
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂editsell
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂sell
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂_sections
 ┃ ┃ ┃ ┃ ┣ 📜ProductDetail.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProductInfo.tsx
 ┃ ┃ ┃ ┃ ┗ 📜_index.ts
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜Products.tsx
 ┃ ┃ ┃ ┗ 📜_index.ts
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂review
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signin
 ┃ ┃ ┣ 📂_functions
 ┃ ┃ ┃ ┣ 📜postUserSignin.ts
 ┃ ┃ ┃ ┗ 📜_index.ts
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂_sections
 ┃ ┃ ┣ 📂PerfumeCarousel
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┗ 📜PerfumeCarouselSwiper.tsx
 ┃ ┃ ┃ ┗ 📜PerfumeCarousel.tsx
 ┃ ┃ ┣ 📜BrandListSection.tsx
 ┃ ┃ ┣ 📜HeroSection.tsx
 ┃ ┃ ┣ 📜MagazineSection.tsx
 ┃ ┃ ┗ 📜_index.ts
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📜AddressModal.tsx
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜FilterList.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜InputField.tsx
 ┃ ┣ 📜ProductCard.tsx
 ┃ ┣ 📜ScrollTopButton.tsx
 ┃ ┣ 📜SearchBar.tsx
 ┃ ┗ 📜_index.ts
 ┣ 📂constants
 ┃ ┣ 📜brandList.ts
 ┃ ┣ 📜naviList.ts
 ┃ ┣ 📜shoppingInfoList.ts
 ┃ ┣ 📜userInfoList.ts
 ┃ ┗ 📜_index.ts
 ┣ 📂containers
 ┃ ┣ 📜Filter.tsx
 ┃ ┗ 📜_index.ts
 ┣ 📂hooks
 ┃ ┣ 📜useOutsideClick.ts
 ┃ ┣ 📜useTokens.ts
 ┃ ┗ 📜_index.ts
 ┣ 📂stores
 ┃ ┣ 📜useProductStore.ts
 ┃ ┣ 📜useReviewStore.ts
 ┃ ┣ 📜useTokenStore.ts
 ┃ ┣ 📜useUserStore.ts
 ┃ ┗ 📜_index.ts
 ┗ 📂utils
 ┃ ┣ 📜cn.ts
 ┃ ┗ 📜_index.ts
```


## 목차
- [메인페이지](#main-page)
- [회원가입 페이지](#signup-page)
- [로그인 페이지](#signin-page)
- [마이 페이지](#my-page)
- [상품 리스트 페이지](#products-page)
- [상세 페이지](#detail-page)
- [구매 페이지](#buy-page)
- [주문 페이지](#order-page)
- [판매 페이지](#sell-page)
- [Header](#header)

## 📃 페이지 구성
## <a id="main-page"></a>1. 메인페이지
![main](https://github.com/likelion-lab15/essentia/assets/96248861/7acc66cf-a66e-4233-884a-58b3f2e51fbb)

- 서비스를 접속하면 가장 처음 나타나는 화면입니다.
- 메인배너, 상품추천, 매거진, 브랜드 리스트 4개의 섹션으로 구분되어있습니다.
  
### 메인페이지에서 사용한 기능
- `keyframe`을 이용한 무한 롤링 배너 기능
- `Swiper` 를 사용하여 이미지 캐러셀 기능
- 브랜드 이름을 클릭하면 상세페이지로 이동하는 기능

### 앞으로 개발할 기능
- [상품 추천] 지정한 카테고리의 상품만 슬라이드로 보여야 합니다.
- [상품 추천] 상품을 누르면 해당 상품의 상세페이지로 이동해야합니다.
- [매거진] 매거진 리스트 페이지로 이동할 수 있어야합니다.
- [매거진] 매거진을 클릭하면 해당 매거진 상세페이지로 이동해야합니다.
- [브랜드 리스트] 브랜드 명을 클릭하면 해당 브랜드 필터가 적용된 상품 리스트 페이지로 이동해야합니다.

## <a id="signup-page"></a>2. 회원가입 페이지
![회원가입 ](https://github.com/likelion-lab15/essentia/assets/96248861/03a37ee8-1774-43de-9592-71db3d78e654)

- 회원 정보를 입력하여 회원가입을 할 수 있습니다.
- 이메일, 비밀번호, 이름, 휴대폰번호, 생년월일, 주소를 입력해야하며 각 조건에 따라 유효성 검사를 합니다.
  
### 회원가입 페이지에서 사용한 기능
- 이메일, 비밀번호, 비밀번호 확인, 이름, 휴대폰번호, 생년월일, 주소의 유효성 검사를 하여 만족하지 못할 경우 오류로 표시하는 기능
- DAUM API를 사용하여 도로명 주소 검색하고 선택시 주소 Input에 자동 입력되는 기능

### 앞으로 개발할 기능
- 이메일 중복확인의 여부를 사용자에게 알려야 합니다.
- 이메일 중복확인을 통과한 후 값을 변경하면 다시 중복 확인을 필수로 해야합니다.
- 비밀번호와 비밀번호 확인란을 정확히 입력 후 비밀번호를 변경하면 비밀번호 확인과의 일치 여부를 다시 체크해야합니다.
- 도로명 주소 검색 후 선택하지 않고 닫을 경우 오류가 발생합니다.
- 상세 주소는 최대 입력가능한 글자를 제한해야합니다.

## <a id="signin-page"></a>3. 로그인 페이지
![로그인](https://github.com/likelion-lab15/essentia/assets/96248861/fde542b0-e447-4264-974c-79946450b7c5)

- 가입한 이메일 주소와 패스워드를 입력하면 로그인을 할 수 있습니다.
  
### 회원가입 페이지에서 사용한 기능
- 입력한 이메일 주소와 비밀번호를 전송하여 로그인에 성공할 경우 메인페이지로 이동합니다.

### 앞으로 개발할 기능
- 이메일 유효성 검사가 필요합니다. (ex. 이메일 형식으로 입력해주세요)
- 비밀번호 유효성 검사가 필요합니다. (ex. 비밀번호는 특수문자가 포함되어야합니다)
- 가입한 회원 정보를 통해 이메일 또는 비밀번호를 찾을 수 있어야합니다.
- 연동된 SNS를 통해 회원가입 또는 로그인이 가능해야합니다.

## <a id="my-page"></a>4. 마이페이지
### 4-1. 마이페이지 전체보기
![image](https://github.com/likelion-lab15/essentia/assets/96248861/5214a175-5b98-45b0-a4b7-642da6898d2b)

- 왼쪽 카테고리를 통해 사용자의 쇼핑정보(구매내역, 판매내역, 관심상품, 리뷰)와 회원정보(회원정보수정)에 접근할 수 있습니다.
- 사용자의 멤버쉽과 사용가능한 쿠폰, 마일리지를 확인할 수 있습니다.
- 최근 구매내역과 판매내역을 볼 수 있습니다. (더보기를 통해 해당 카테고리로 이동할 수 있습니다.)
  
### 4-2. 마이페이지 구매내역
![마이페이지 구매내역](https://github.com/likelion-lab15/essentia/assets/96248861/22073a63-748e-4ae0-b25a-1cfe69601411)

- 사용자가 구매한 상품을 조회할 수 있습니다. (구매일자, 상품정보, 결재금액, 리뷰 작성유무)
- 구매한 상품에 대해 리뷰를 작성할 수 있습니다.

### 4-3. 마이페이지 판매내역
![마이페이지 판매내역](https://github.com/likelion-lab15/essentia/assets/96248861/1e70fc08-6d7d-4864-a9fc-0de4b24b0dc0)

- 사용자가 판매등록한 상품을 조회또는 수정(삭제)할 수 있습니다. (등록일, 상품정보, 판매금액, 상품관리)
- 사용자가 판매하는 상품의 금액과 용량을 수정할 수 있습니다.

### 4-4. 마이페이지 판매내역
![마이페이지 관심상품](https://github.com/likelion-lab15/essentia/assets/96248861/62aa74cb-1a8b-456f-90c2-063fe91cd354)

- 사용자가 상품 상세페이지에서 위시리스트에 추가한 상품 목록을 확인할 수 있습니다.
- 상품 우측 상단의 하트 표시를 누르면 위시리스트에서 제거할 수 있습니다.

### 4-5. 마이페이지 리뷰
![image](https://github.com/likelion-lab15/essentia/assets/96248861/2fc9ce12-c3e7-4bd3-99e6-96d5ebc000e4)

- 사용자가 작성한 리뷰 목록을 확인할 수 있습니다.

### 4-6. 마이페이지 회원정보 수정
![image](https://github.com/likelion-lab15/essentia/assets/96248861/da8d8388-4c47-4801-8b70-f99b06178e89)

- 사용자가 가입할 때 입력했던 회원정보를 확인 또는 수정할 수 있습니다.

### 마이페이지에서 사용한 기능
- 사용자가 구매, 판매한 상품의 데이터를 불러오는 기능
- 구매한 상품에 대해 리뷰 작성유무를 체크하는 기능
- 구매한 상품에 대해 리뷰를 작성하는 기능
- 판매등록한 상품을 수정하거나 삭제하는 기능
- 회원정보를 조회하고 수정하는 기능

### 앞으로 개발할 기능
- [공통] 상품 정보를 클릭하면 해당 상품의 상세페이지로 이동할 수 있어야 합니다.
- [전체보기] 구매 금액에 따라 Membership과 마일리지가 수정되어야 합니다.
- [구매내역 또는 리뷰] 작성 완료한 리뷰를 수정할 수 있어야합니다.
- [회원정보 수정] 각 입력에 대해 유효성 검사가 필요합니다.
- [회원정보 수정] 현재 비밀번호를 입력하여 일치하지 않으면 수정되지 않아야 합니다.

## <a id="products-page"></a>5. 상품 리스트 페이지
![상품리스트](https://github.com/likelion-lab15/essentia/assets/96248861/5bf77c92-e0c5-446d-9092-dab4e353b235)

- 등록된 향수 상품들을 볼 수 있습니다.
- 브랜드 별로 필터를 사용하여 향수 목록을 볼 수 있습니다.
- 금액순으로 향수 상품들을 정렬할 수 있습니다.
- 페이지당 12개의 제품을 확인할 수 있으며 페이지네이션으로 구성되어 있습니다.
- 제품 사진이나 글을 클릭하면 해당 제품의 상세페이지로 이동합니다.
  
### 상품 리스트 페이지에서 사용한 기능
- 불러온 향수 상품 데이터를 로컬에서 정렬해서 보여주는 기능 (금액순)
- 좌측 브랜드 리스트를 누르면 해당 브랜드의 제품만 보여주는 기능
- 불러온 제품들을 12개씩 페이지네이션으로 보여주는 기능
- 상품을 클릭하면 클릭한 상품의 상세페이지로 이동하는 기능

### 앞으로 개발할 기능
- 현재 구현된 기능 리팩토링

## <a id="detail-page"></a>6. 상세 페이지
### 6-1. 상세페이지 정보
![상세 Info](https://github.com/likelion-lab15/essentia/assets/96248861/18da4078-41ef-4c1f-a1e4-7f8cab748339)

- 상품 리스트에서 클릭한 상품의 상세정보를 보여줍니다. (브랜드, 상품명, 판매중인 용량, 발매가)
- 원하는 사이즈를 선택하고 구매페이지로 이동하거나 판매페이지로 이동할 수 있습니다. (사이즈 미선택시 이동 불가)
- 위시 리스트에 상품을 추가할 수 있습니다.


### 6-2. 상세페이지 상세
![상세 페이지 상세](https://github.com/likelion-lab15/essentia/assets/96248861/e46f047d-5459-404f-b5f2-4771cc6172c6)

- 상단 네비게이션을 클릭하여 원하는 섹션으로 스크롤 이동할 수 있습니다.
- 해당 제품의 리뷰를 5개씩 보여줍니다. (작성일자, 작성자, 제목, 내용)
- 관련된 제품 추천 캐러셀을 통해 다른 상품으로 접근할 수 있습니다.
  
### 상세 페이지에서 사용한 기능
- 사용자가 상품리스트에서 클릭한 상품의 데이터를 불러오는 기능
- 사이즈를 선택하여 구매하기 또는 판매하기로 원하는 데이터를 전달하는 기능
- 해당 상품을 위시리스트에 추가할 수 있는 기능
- 네비게이션을 통해 원하는 섹션에 이동하는 기능
- 리뷰를 5개씩 보여주는 페이지네이션 기능

### 앞으로 개발할 기능
- [정보] 위시리스트에 이미 추가된 상품인지 확인할 수 있어야 합니다.
- [정보] 이미 위시리시트에 추가된 상품이라면 제거할 수 있어야 합니다.
- [상세] 대표 상품 하위에 있는 리뷰들을 대표 상품에서 조회해야합니다.
- [상새] 유사한 상품들을 이미지 캐러셀로 불러와 이동할 수 있어야 합니다.

## <a id="buy-page"></a>7. 구매하기 페이지
![image](https://github.com/likelion-lab15/essentia/assets/96248861/82cbe9fe-a561-4f8a-b174-2b163555e5fa)
![image](https://github.com/likelion-lab15/essentia/assets/96248861/a078eba3-8ec7-47c1-bdf4-24f00403c98d)


- 클릭하여 들어온 상품의 정보를 보여줍니다. (브랜드, 이름, 사진, 원하는 사이즈)
- 판매 등록되어 있는 향수들의 리스트를 보여줍니다. (등록된 상품이 없을 경우 사용자에게 알려줍니다)
- 등록된 상품 중 최저가를 표시해줍니다.
- 구매하기를 누르면 해당 상품을 주문할 수 있는 페이지로 이동합니다.
  
### 구매하기 페이지에서 사용한 기능
- 상품 상세페이지에서 클릭한 향수의 정보를 불러오는 기능
- 판매 등록된 상품의 가격 중 가장 저렴한 가격을 보여주는 기능
- 구매하기를 누르면

### 앞으로 개발할 기능
- 남은용량, 판매금액, 구매일자 기준으로 정렬할 수 있어야 합니다.
- 등록된 상품 개수가 5개 이상일 때 더보기 버튼이 활성화 되어야 합니다.

## <a id="order-page"></a>8. 주문 페이지
![image](https://github.com/likelion-lab15/essentia/assets/96248861/f0d62e27-92df-4a04-83fa-10de2598c888)

- 구매하기 페이지에서 선택한 제품의 정보를 볼 수 있습니다.
- 체크박스를 통해 구매 의사를 다시 한번 더 확인합니다.
- 배송 정보를 확인하고 수정할 수 있습니다.
- 최종 결제 금액을 확인할 수 있습니다.
  
### 주문 페이지에서 사용한 기능
- 구매하기 페이지에서 사용자가 선택한 제품의 정보를 가져오는 기능
- 로그인된 사용자의 정보를 가져오는 기능
- 해당 제품을 구매하는 기능

### 앞으로 개발할 기능
- 체크박스를 모두 클릭하지 않을 경우 구매 결정하기를 누를 수 없어야 합니다.
- 사용자가 직접 배송정보를 수정할 수 있어야 합니다.
- 배송비 또는 쿠폰, 멤버쉽에 따라 결제금액이 달라져야 합니다.

## <a id="sell-page"></a>9. 판매 등록 페이지
![판매 등록 페이지](https://github.com/likelion-lab15/essentia/assets/96248861/bd330bfe-5793-472c-957b-7aba13dfc625)

- 사용자가 원하는 제품을 판매할 수 있습니다. (남은용량, 구매일자, 가격 입력)
- 자신이 판매하는 상품의 이미지를 업로드할 수 있습니다.
  
### 판매 페이지에서 사용한 기능
- 상세 페이지에서 선택한 제품의 정보를 불러오는 기능
- 이미지 여러장 업로드 기능
- 제품 판매 등록 기능
- 상세 설명 길이 유효성 검사


### 앞으로 개발할 기능
- 선택한 옵션보다 더 많은 용량은 판매할 수 없어야합니다. (50ml선택 -> 50ml 이하만 입력가능)

## <a id="header"></a>10. Header
### 9-1. Header 네비게이션
![헤더- 네비게이션](https://github.com/likelion-lab15/essentia/assets/96248861/eacb6c8e-86a0-4e2c-8909-ca808f56aec0)

- 로고를 누르면 홈으로 이동합니다.
- SHOP 버튼을 누르면 상품 리스트페이지로 이동합니다.
- 로그인했을 경우 마이페이지로 이동, 위시리스트로 이동, 로그아웃 기능이 있습니다.
- 비회원일 경우 로그인 페이지로 이동합니다.

### 9-2. Header 검색

![헤더 - 검색기능](https://github.com/likelion-lab15/essentia/assets/96248861/7db7aad0-e600-4e0e-89e9-41118bb657e9)

- Header를 접근할 수 있는 모든 페이지에서 검색 기능을 사용할 수 있습니다.
  
### Header에서 사용한 기능
- Link를 사용한 페이지 이동 기능
- 로그인하지 않았을 때는 마이페이지 아이콘 클릭시 로그인 페이지로 이동, 로그인 아이콘 렌더링, 클릭시 로그인 페이지
- 로그인 했을 때는 마이페이지 아이콘 클릭시 마이페이지로 이동, 로그아웃 아이콘 렌더링, 클릭시 로그아웃
- 키워드 검색으로 나타나는 제품을 클릭시 해당 제품 상세페이지로 이동하는 기능
  
### 앞으로 개발할 기능
- 키워드 검색시 검색 목록이 일정개수 이상이면 스크롤 바 또는 더보기가 생기도록 해야합니다.
- MEN, WOMEN 같은 네비게이션을 누르면 필터된 상품 리스트 페이지로 이동해야합니다.



