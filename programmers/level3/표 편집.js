function solution(n, k, cmd) {
  const linkedList = {};

  linkedList['head'] = { prev: null, next: null };
  linkedList['head'].next = linkedList['tail'] = { prev: linkedList['head'], next: null };

  for (let i = 0; i < n; i++) {
    const node = {
      prev: linkedList['tail'].prev,
      next: linkedList['tail'],
      element: i
    };
    linkedList['tail'].prev = linkedList['tail'].prev.next = node;
  }

  let current = null;

  for (let i = 0, node = linkedList['head'].next; i <= k; i++, node = node.next) {
    current = node;
  }

  const history = [];

  for (let i = 0; i < cmd.length; i++) {
    const [type, param] = cmd[i].split(' ');

    switch (type) {
      case 'U':
        up(param);
        break;
      case 'D':
        down(param);
        break;
      case 'C':
        remove();
        break;
      case 'Z':
        restore();
        break;
    }
  }

  let answer = '';
  let last = null;

  for (let i = 0, node = linkedList['head'].next; node !== null; i++, node = node.next) {
    if (isTail(node)) {
      answer += 'X'.repeat(n - last.element - 1);
      continue;
    }

    if (!last) {
      answer += 'X'.repeat(node.element) + 'O';
    } else {
      answer += 'X'.repeat(node.element - last.element - 1) + 'O';
    }
    last = node;
  }

  return answer;

  function up(move) {
    move = Number(move);
    for (let i = 0, node = current; i <= move; i++, node = node.prev) {
      current = node;
    }
  }

  function down(move) {
    move = Number(move);
    for (let i = 0, node = current; i <= move; i++, node = node.next) {
      current = node;
    }
  }

  function remove() {
    history.push(current);
    current.prev.next = current.next;
    current.next.prev = current.prev;

    if (isTail(current.next)) {
      current = current.prev;
    } else {
      current = current.next;
    }
  }

  function restore() {
    const node = history.pop();
    node.prev.next = node;
    node.next.prev = node;
  }

  function isTail(node) {
    return !node.next;
  }
}
