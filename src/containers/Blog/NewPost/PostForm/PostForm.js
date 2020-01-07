import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../../../store/actions";

import Input from "../../../../components/UI/Input/Input";

import classes from "./PostForm.module.css";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            postForm: {
                body: {
                    elementType: "textarea",
                    elementConfig: {
                        type: "textarea",
                        placeholder: `What's on your mind, ${this.props.profile.first_name}?`
                    },
                    value: "",
                    valueType: "body",
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false
        };
        this.state = this.defaultState;
    }

    inputChangeHandler(event, name) {
        const updatedPostForm = {
            ...this.state.postForm,
            [name]: {
                ...this.state.postForm[name],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.postForm[name].validation
                ),
                touched: true
            }
        };
        let formIsValid = true;
        for (let key in updatedPostForm) {
            formIsValid = updatedPostForm[key].valid && formIsValid;
        }

        this.setState({ postForm: updatedPostForm, formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return isValid;
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        return isValid;
    }

    postHandler(event) {
        event.preventDefault();

        const formData = {};
        for (let key in this.state.postForm) {
            formData[key] = this.state.postForm[key].value;
        }
        this.props.onAddPost(formData);
        this.setState({
            ...this.defaultState
        });
    }

    render() {
        const formElementsArray = Object.keys(this.state.postForm).map(key => ({
            ...this.state.postForm[key],
            name: key
        }));

        let form = (
            <form onSubmit={e => this.postHandler(e)}>
                {formElementsArray.map(el => (
                    <Input
                        key={el.name}
                        elementType={el.elementType}
                        elementConfig={el.elementConfig}
                        value={el.value}
                        valueType={el.valueType}
                        changed={e => this.inputChangeHandler(e, el.name)}
                        invalid={!el.valid}
                        shouldValidate={!!el.validation}
                        touched={el.touched}
                    />
                ))}

                <button disabled={!this.state.formIsValid}>Post</button>
            </form>
        );

        if (this.props.loading) {
            form = "spinner";
        }

        return <div className={classes.PostForm}>{form}</div>;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(actions.addPost(post))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm);
