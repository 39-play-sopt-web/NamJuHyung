//filter: 콜백이 true를 return한 요소만 모아서 새 배열 생성
function solution(names){
  return names.filter((_,i) => i % 5 === 0);
}