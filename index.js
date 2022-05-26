const fs = require("fs");
const readFile = async (path) =>
  fs.existsSync(path)
    ? new Promise((res) => {
        fs.readFile(path, "utf8", (_, data) => {
          const json = JSON.parse(data);
          console.log("init");
          console.log(typeof json);
          res(json);
        });
      })
    : {};

const pick = async (path) => {
  const file = await readFile(path);
  const book = {
    ...file,
    close() {
      return new Promise((res) =>
        fs.writeFile(path, JSON.stringify(this), () => {
          console.log("data written");
          res();
        })
      );
    },
  };
  return book;
};

module.exports = {
  pick,
};
