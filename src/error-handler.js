// const fs = require("fs"); @ doesnt work with babel

export const errorHandler = err => {
    console.log(err);
    // fs.writeFileSync(
    //     `${__dirname}/errors.json`,
    //     JSON.stringify(errors, null, 4)
    // );
};
