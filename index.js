const fs = require("fs");

const pick = (path) => {
  const file = fs.existsSync(path) ? require(path) : {};
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
