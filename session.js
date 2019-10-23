const addUser = (req, userdata) => {
    return new Promise((resolve, reject) => {
        const { id, firstname, lastname, email } = userdata;
        req.session.user = { id, firstname, lastname, email };
        req.session.user.id
            ? resolve(req.session.user)
            : reject(new Error("Couldn't insert new user into session"));
    });
};

module.exports = { addUser };
