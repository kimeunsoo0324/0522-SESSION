const title = document.querySelector(".section-title h1");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");

const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

const fetchFollowers = async () => {
    const response = await fetch(url); // url에 접근하여 데이터 가져오기
    const data = await response.json();

	  return data;
 };

const displayFollowers = (followers) => {
    let newFollowers = followers
      .map((person) => {
          const { avatar_url, login, html_url } = person;
              // map 함수를 활용하여 각 팔로워들의 정보를 보여주는 코드를 작성하세요.
              // avatar_url은 프로필 사진 url, login은 팔로워의 이름, html_url은 팔로워의 github 주소입니다.
              return `<article class="card">
              <img src=${avatar_url}, alt='person'/>
              <h4>${login}</h4>
              <a href=${html_url} class="btn">view profile</a>
              </article>`;
              // 잘 모르겠다면 5/11 정기세션 실습 문제 2번 코드를 참고해보세요!
      });
  
      newFollowers = newFollowers.join('');
      container.innerHTML = newFollowers;
  };

  // displayButtons 함수는 주석 달기
  const displayButtons = (container, pages, activeIndex) => {
    let btns = pages.map((_, pageIndex) => {
          // activeIndex와 pageIndex 번호가 같으면 active-btn 클래스를, 같지 않으면 ’’(빈 문자열)을 적용할 수 있도록 삼항연산자를 이용하여 작성
          return `<button class="page-btn ${activeIndex === pageIndex ? "active-btn" : ""}" data-index="${pageIndex}">
              ${pageIndex + 1}</button>`; // map 함수를 활용하여 페이지 버튼을 보여주는 코드, 배열 값 +1인 값이 버튼이 됨
            });
    btns.push(`<button class="next-btn">next</button>`); // next 버튼을 누르면 배열의 맨 끝에 값을 추가
    btns.unshift(`<button class="prev-btn">prev</button>`); // prev 버튼을 누르면 배열의 맨 앞에 값을 추가
  
    container.innerHTML = btns.join(""); // 배열의 모든 요소를 연결해 하나의 문자열로 만듦
  };

  // 버튼에 이벤트 달기
  btnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-container")) return;
  
    if (e.target.classList.contains("page-btn")) {
      index = parseInt(e.target.dataset.index);
    }

    // Next 버튼을 누르면 index가 증가하고, Prev 버튼을 누르면 index가 감소하도록 조건문을 작성하세요.
    // 주의) 인덱스의 범위는 0 이상 10 이하입니다.

    if(e.target.classList.contains("next-btn")) {
        index++;
        if(index > pages.length - 1){
            index = 0;
        }
    }

    if(e.target.classList.contains("prev-btn")) {
        index--;
        if(index < 0){
            index = pages.length - 1;
        }
    }
      setupUI();
  });

  let pages = []; // 팔로워 정보를 10개씩 나눠서 저장할 배열

  // paginate() 함수는 팔로워 전체를 입력으로 받아 10명씩 나눠서 저장하는 함수입니다.
  const paginate = (followers) => {
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(followers.length / itemsPerPage);

    const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
		
    return followers.slice(start, start + itemsPerPage); // slice 함수에 올바른 파라미터를 넣어주세요.
   });

  return newFollowers;
 };

  let index = 0;

  const init = async () => {
	  const followers = await fetchFollowers(); // fetchFollowers 함수의 반환값을 followers에 저장하기
	  title.textContent = "Pagination"; // Loading -> Pagination 텍스트 수정

    pages = paginate(followers);
    setupUI();
 };

init();

const setupUI = () => {
  displayFollowers(pages[index]); 
  displayButtons(btnContainer, pages, index);
};