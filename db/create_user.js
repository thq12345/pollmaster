//This will generate a json file "mockUsers.json"
(() => {
  const fs = require("fs");

  const namesRaw = require("../names.json");
  let allUsers = [];
  for (let i =0; i < namesRaw.length; i++) {

    let userObejct = {
      _id: i+"@"+i+".com",
      firstName: namesRaw[i].firstName,
      lastName: namesRaw[i].lastName,
      password: `${i}`,
      createdPolls: [],
      votedPolls: {},
    };

    allUsers.push(userObejct);
  }

  fs.writeFileSync("../mockUsers.json", JSON.stringify(allUsers));



})();