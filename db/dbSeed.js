const pollsRaw = require("../poll master.json");
const namesRaw = require("../names.json");
const dbManager = require("./dbManager");

// let polls = [
//   {
//     _id: "123",
//     title: "test poll1",
//     options: [
//       { prompt: "option1", votes: 0 },
//       { prompt: "option2", votes: 3 },
//     ],
//   },
//   {
//     _id: "sampleId2",
//     title: "test poll2",
//     options: [
//       { prompt: "option1", votes: 3 },
//       { prompt: "option2", votes: 5 },
//     ],
//   },
// ];

let polls = pollsRaw.map((el) => {
  let options = [];
  let totalVotes = 0;
  for (let i = 1; i < 6; i++) {
    if (el[`option${i}`]) {
      options.push({ prompt: el[`option${i}`], votes: el[`option${i}Vote`] });
      totalVotes += el[`option${i}Vote`];
    }
  }

  //randomly assign the post to one of the owner
  // let x = Math.floor((Math.random() * 999));
  return {
    title: el.title,
    options: options,
    // owner: `${x}@${x}.com`,
    owner: "1@1.com",
    totalVotes: totalVotes,
    public: el.public,
    createdAt: Number(el.createdAt),
    ttl: Number(el.ttl),
  };
});

let allUsers = [];
for (let i = 0; i < namesRaw.length; i++) {
  let userObejct = {
    _id: i + "@" + i + ".com",
    firstName: namesRaw[i].firstName,
    lastName: namesRaw[i].lastName,
    password: `${i}`,
    createdPolls: [],
    votedPolls: {},
  };

  allUsers.push(userObejct);
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

//maybe try having the for-loop outside?
// when I tried
//await dbManager.create("polls", polls[0]);
// this is giving me an error
(async () => {
  for (let i = 0; i < polls.length; i++) {
    let res = await dbManager.create("polls", polls[i]);
    polls[i]._id = res.insertedId;
    let randomUser = allUsers[randomNumber(allUsers.length)];
    randomUser.createdPolls.push(res.insertedId);
  }
  for (let i = 0; i < allUsers.length; i++) {
    let rn = randomNumber(100);
    for (let j = 0; j < rn; j++) {
      let randomPoll = polls[randomNumber(polls.length)];
      allUsers[i].votedPolls[randomPoll._id] = randomNumber(randomPoll.options.length);
    }
    await dbManager.create("users", allUsers[i]);
  }
})();
// polls.forEach(async (el) => {
//   await dbManager.create("polls", el);
// });

// (async () => {
//   let polls = await dbManager.read("Polls", {});
//   console.log(polls.map((el) => el._id.toString()));
// })();
