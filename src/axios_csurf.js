import axios from "axios";

const giraffe = axios.create({
    xsrfCookieName: "csurftoken",
    xsrfHeaderName: "csrf-token"
});

export default giraffe;
