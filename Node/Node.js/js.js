function showDetails(job, hobby) {
  console.log(`姓名: ${this.name}, 年龄: ${this.age}, 职业: ${job}, 爱好: ${hobby}`);
}
let person = {name: '小明', age: 20};
showDetails.call(person, '程序员', '阅读');