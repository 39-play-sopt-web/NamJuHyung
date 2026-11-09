function solution(num_list) {
    const even = num_list.filter(n => n % 2 === 0).join("");
    const odd = num_list.filter(n => n % 2 !== 0).join("");
    const answer = Number(even) + Number(odd);
    return answer;
}