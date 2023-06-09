function solution(types) {
  const SIZE_OF_TYPE = {
    BOOL: 1,
    SHORT: 2,
    FLOAT: 4,
    INT: 8,
    LONG: 16
  };
  const UNIT = 8;
  const LIMIT_SIZE = 128;

  const N = types.length;
  let memory = '';

  for (let i = 0; i < N; i++) {
    const type = types[i];
    const M = memory.length;

    if (type === 'BOOL') {
      memory += '#';
    } else if (type === 'LONG') {
      const SIZE = SIZE_OF_TYPE[type];
      const k = M % UNIT === 0 ? 0 : UNIT - (M % UNIT);
      memory = memory.padEnd(M + k, '.') + '#'.repeat(SIZE);
    } else {
      const SIZE = SIZE_OF_TYPE[type];
      const k = M % SIZE === 0 ? 0 : SIZE - (M % SIZE);
      memory = memory.padEnd(M + k, '.') + '#'.repeat(SIZE);
    }
  }

  const M = memory.length;
  memory = memory.padEnd(M + (M % UNIT === 0 ? 0 : UNIT - (M % UNIT)), '.');

  return memory.length <= LIMIT_SIZE ? format(memory) : 'HALT';

  function format(memory) {
    const M = memory.length;
    let newMemory = '';
    for (let i = 0; i < M; i++) {
      newMemory += memory[i];
      if ((i + 1) % UNIT === 0) {
        newMemory += ',';
      }
    }
    return newMemory.slice(0, newMemory.length - 1);
  }
}
