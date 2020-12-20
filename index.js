const fs = require("fs");

const pick = (path) => {
  const file = fs.existsSync(path) ? require(path) : {};
  const book = {
    ...file,
    close() {
      fs.writeFile(path, JSON.stringify(this), () => {
        console.log("data written");
      });
    },
  };
  return book;
};

module.exports = {
  pick: pick,
};
