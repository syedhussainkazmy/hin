const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeCommit = n => {
    if (n === 0) {
        return git.push("origin", "main");
    }

    const DATE = moment()
        .subtract(getRandomInt(0, 365), "days")
        .format();

    const data = { date: DATE };

    jsonfile.writeFile(FILE_PATH, data, () => {
        git
            .add([FILE_PATH])
            .commit(DATE, { "--date": DATE }, () => {
                makeCommit(n - 1);
            });
    });
};

makeCommit(300);