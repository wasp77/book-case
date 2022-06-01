const fs = require("fs");

const syncRead = (path) => {
  const data = fs.readFileSync(path, { encoding: "utf8" });
  const json = JSON.parse(data);
  return json;
};

const asyncRead = async (path) =>
  new Promise((res) => {
    fs.readFile(path, "utf8", (_, data) => {
      const json = JSON.parse(data);
      res(json);
    });
  });

const syncWrite = (path, data) => {
  fs.writeFileSync(path, data);
};

const asyncWrite = async (path, data) =>
  new Promise((res) =>
    fs.writeFile(path, data, () => {
      res();
    })
  );

const readFileAsync = async (path) => {
  try {
    return await asyncRead(path);
  } catch (_) {
    return {};
  }
};

const readFileSync = (path) => {
  try {
    return syncRead(path);
  } catch (_) {
    return {};
  }
};

/**
 * There has to be a better way to support sync vs async reads.
 */
const syncShelf = (path, read, write) => {
  const file = read(path);
  const book = {
    ...file,
    close() {
      return write(path, JSON.stringify(this));
    },
  };
  return book;
};

const asyncShelf = async (path, read, write) => {
  const file = await read(path);
  const book = {
    ...file,
    async close() {
      return await write(path, JSON.stringify(this));
    },
  };
  return book;
};

const pick = (path, { sync } = {}) =>
  sync
    ? syncShelf(path, readFileSync, syncWrite)
    : asyncShelf(path, readFileAsync, asyncWrite);

module.exports = {
  pick,
};
