const rowsPerPage = 5; //한 페이지에 담을 개수
const rows = document.querySelectorAll('#my-table>tbody>tr');
// console.log(rows);

//pageNation 버튼 개수
const rowsCount = rows.length;
const pageCount = Math.ceil(rowsCount/rowsPerPage);//page 숫자 만들기 위한 계산 변수
const numbers = document.querySelector('#numbers');

//화살표 버튼
const prev = document.querySelector('.nav .fa-arrow-left');
const next = document.querySelector('.nav .fa-arrow-right');

let pageActiveIdx = 0;
let maxPageNum = 5;


//for문
for(let i=1; i <= pageCount;i++){
    numbers.innerHTML += `<li><a href="#">${i}</a></li>`;
};
const numberBtn = numbers.querySelectorAll('a');
// console.log(numberBtn);

for(nb of numberBtn){
    nb.style.display='none';
};

numberBtn.forEach((item,index)=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();

        //table 출력 함수
        displayRow(index);
        // console.log(index);
    });
});

const displayRow = (index)=>{
    //slice => slice(start, end번호 뒷자리까지);
    let rowsArray = [...rows];
    // console.log(rowArray);
    for(ra of rowsArray){
        ra.style.display='none';
    }
    let start = index*rowsPerPage;
    let end = start + rowsPerPage;
    let newRows = rowsArray.slice(start, end);

    for(nr of newRows){
        nr.style.display = "";
    }

    for(nb of numberBtn){
        nb.classList.remove('active');
    }
    numberBtn[index].classList.add('active');
}
displayRow(0);

//페이지네이션 그룹표시
const displayPage = (num)=>{
    for(nb of numberBtn){
        nb.style.display='none';
    }
    let totalPageCount = Math.ceil(pageCount/maxPageNum);

    let pageArray = [...numberBtn];

    let start = num*maxPageNum;
    let end = start + maxPageNum;
    let pageListArray = pageArray.slice(start, end);

    for(item of pageListArray){
        item.style.display = 'block';
    }

    if(pageActiveIdx == 0){
        prev.style.display = 'none';
    }
    else{
        prev.style.display = 'block';
    }
    if(pageActiveIdx == totalPageCount -1){
        next.style.display = 'none';
    }
    else{
        next.style.display = 'block';
    }
};
displayPage(0);

next.addEventListener('click', ()=>{
    let nextPageNum = pageActiveIdx*maxPageNum+maxPageNum;
    displayRow(nextPageNum);
    ++pageActiveIdx;
    displayPage(pageActiveIdx);
});

prev.addEventListener('click', ()=>{
    let nextPageNum = pageActiveIdx*maxPageNum-maxPageNum;
    displayRow(nextPageNum);
    --pageActiveIdx;
    displayPage(pageActiveIdx);
});