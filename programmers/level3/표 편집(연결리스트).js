// 핵심

// 효율성을 위해 이중 연결 리스트 사용 => 삭제시 배열을 사용했을 때보다 효율적

// head, tail 갱신은 삭제나 복구 시 항상 해주어 예외를 막아야 함.

// * 문제에 나와있듯이,, 삭제 시 포인터 변경해야하고, 복구 시에만 포인터 변경되지 않음

class Node {
  data = null;
  prev = null;
  next = null;

  constructor(data) {
    this.data = data;
  }
};

class LinkedList {
  head = null;
  tail = null;
  size = 0;

  isEmpty = () => this.size === 0;

  /**
   * 특정 크기 만큼 이동 / 앞 또는 뒤
   */
  moveFront = (pointer, index) => {
    for(let i = 0; i < index; i++) {
      pointer = pointer.prev;
    }
    return pointer;
  };

  moveBack = (pointer, index) => { 
    for(let i = 0; i < index; i++) {
      pointer = pointer.next;
    }
    return pointer;
  };

  insert = (data) => {
    let node = new Node(data);

    if (!this.head) {
      this.tail = this.head = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.size += 1;

    return node;
  };

  /**
   * 현재 포인터 위치의 노드 제거
   */
  delete = (pointer) => {
    this.size -= 1;

    if (pointer.next && pointer.prev) {
      pointer.prev.next = pointer.next;
      pointer.next.prev = pointer.prev;
      return pointer.next;
    }

    if (pointer === this.head) {
      this.head = pointer.next;
      this.head.prev = null;
      return this.head;
    }

    if (pointer === this.tail) {
      this.tail = pointer.prev;
      this.tail.next = null;
      return this.tail;
    }
  };

  /**
   * 스택에 있는 거 빼옴
   */
  undo = (node) => {
    if (node.prev) {
      node.prev.next = node;
    } else this.head = node;

    if (node.next) {
      node.next.prev = node;
    } else this.tail = node;
  };
};

function solution(n, k, cmd) {
  const linkedList = new LinkedList();
  let p = null;

  for(let i = 0; i < n; i++) {
    const node = linkedList.insert(i);
    
    if (i === k) p = node;
  }

  const stack = [];

  for(let i = 0; i < cmd.length; i++) {
    const [c, num] = cmd[i].split(" ");

    if (c === 'D') {
      p = linkedList.moveBack(p, parseInt(num));
    } else if (c === 'U') {
      p = linkedList.moveFront(p, parseInt(num));
    } else if (c === 'C') {
      stack.push(p);
      p = linkedList.delete(p);
    } else if(c === 'Z'){
      const node = stack.pop();
      linkedList.undo(node);
    }
  }

  const answer = Array(n).fill('X');
  p = linkedList.head;

  while (p) {
    answer[p.data] = 'O';
    p = p.next;
  }

  return answer.join('');
};