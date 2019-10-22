import React from "react";

import CuteAnimals from "./cute-animals";

// Stateless Functional Component
const HelloWorld = () => {
    let chocolate = "chocolate";

    const sayHello = () => {
        console.log("Say hello");
    };

    const [greeting, setGreeting] = React.useState("Hello Function Component!");
    return (<React.Fragment>
        Hellow World!
        <h1>{greeting}</h1>
        <input type="text" value={greeting} onChange={event => setGreeting(event.target.value)}/>
        <CuteAnimals sayHello={sayHello} chocolate={chocolate}/>
    </React.Fragment>);
};

export default HelloWorld;
