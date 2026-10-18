//reduce: 배열을 처음부터 끝까지 돌면서 하나의 값으로 줄여 주는 메서드
function solution(num_list) {
    return num_list.length >= 11 ? num_list.reduce((acc, cur) => acc + cur, 0) : num_list.reduce((acc, cur) => acc * cur, 1);
}