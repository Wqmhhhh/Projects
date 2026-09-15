const fs = require("fs");
const { join } = require("path");
fs.readFile(path.join(__dirname, "./成绩.txt"), "utf-8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  const arr = data.split(" ");
  const ArrNew = [];
  arr.forEach((i) => {
    ArrNew.push(i.replace("=", ":"));
  });
  // 注意要将数组转为指定格式字符串后再存入文件
  fs.writeFile(
    join(__dirname, "./成绩.txt"),
    ArrNew.join("\r\n"),
    "utf-8",
    function (err) {
      if (err) console.log(err);
    },
  );
});
