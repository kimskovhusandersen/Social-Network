import React from "react";
import axios from "axios";
export default class CuteAnimals extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Ivana"
        };
    }

    componentDidMount() {
        axios.get("/chocloate").then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

        setTimeout(() => {
            this.setState({name: "Kim"});
        }, 2000);
    }

    handleClick(e) {
        console.log(e);
        this.setState({name: "David"});
    }

    render() {
        return (<React.Fragment>
            <h1>Cute Animals</h1>
            <p>State: {this.state.name}</p>
            <p>Props: {this.props.chocolate}</p>
            <button onClick={() => this.handleClick()}>Click me!</button>
            <button onClick={this.handleClick.bind(this)}>Click me!</button>

            <button onClick={this.props.sayHello}>Click me!</button>
        </React.Fragment>);
    }
}
