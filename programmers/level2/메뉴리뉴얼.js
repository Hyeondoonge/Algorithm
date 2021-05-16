// 핵심
// 1. 제한사항의 입력 범위가 작은 수이기 때문에 완탐으로 구현
// 2. 최종 결과는 오름차순으로 정렬되야하므로 문자들을 정렬하고 조합 시작

const orderCount = {}; // 메뉴에 따른 주문 회수
let newComb = [];
let allCourse = [];

const dfs = (order, index, d) => {
    if(allCourse.includes(d)) {
        const comb = newComb.join('');
        if(orderCount[comb] == undefined) {
            orderCount[comb] = 1;
        }
        else orderCount[comb] = orderCount[comb] + 1;
        // newComb가 만들어질 때 마다 주문 회수를 갱신한다.
    }
    
    for(let i = index + 1; i < order.length; i++) {
        newComb.push(order[i]);
        dfs(order, i, d + 1);
        newComb.pop();
    }
}

function solution(orders, course) {
    var answer = [];
    allCourse = course;

    for(let i= 0; i < orders.length; i++) {
        orders[i] = orders[i].split('').sort().join('');
        dfs(orders[i], -1, 0);
    }
    
    const maxOrders = {}; // 코스 종류에 대응되는 주문 수
    
    for(let key in orderCount) {
        if(maxOrders[key.length] == undefined) {
            maxOrders[key.length] = [{
                    menu: key,
                    count: orderCount[key],
                }
            ]
        } else {
            if (orderCount[key] > maxOrders[key.length][0].count) {
                maxOrders[key.length] = [{
                    menu: key,
                    count: orderCount[key],
                }]; // 현재 주문으로 갱신
            } else if(orderCount[key] == maxOrders[key.length][0].count) {
                maxOrders[key.length].push({
                    menu: key,
                    count: orderCount[key],
                }) // 동일함으로 푸시
            }
        }
    }
    
    for(let c in maxOrders) {
        maxOrders[c].forEach((m) => {
            if(m.count > 1) answer.push(m.menu);
        })
    }
    
    answer.sort();

    return answer;
}