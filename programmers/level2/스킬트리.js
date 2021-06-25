const solution = (skill, skill_trees) => {
  let answer = 0;

  const skillArr = Array.from(skill);

  for(let i = 0; i < skill_trees.length; i++) {
    const skill_tree = Array.from(skill_trees[i]);
    let index = 0;

    let valid = true;
    
    for(let j = 0; j < skill_tree.length; j++) {
      if (!skillArr.includes(skill_tree[j])) continue;
      if (skillArr[index] !== skill_tree[j]) {
        valid = false;
        break;
      } else index += 1;
    }

    if (valid) {
      answer += 1;
    }
  }
  return answer;
};