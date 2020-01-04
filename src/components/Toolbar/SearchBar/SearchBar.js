import React, { Fragment, Component } from "react";
import { Search } from "../../../style/icons";
import axios from "../../../axios_csurf";
import classes from "./SearchBar.module.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        };
    }

    async handleSearch(e) {
        let data = null;
        let searchResult = null;
        if (e.target.value == "") {
            return this.setState({
                ...this.state,
                searchResult: []
            });
        }
        ({ data } = await axios.get(`/api/profiles/search/${e.target.value}`));
        if (Array.isArray(data)) {
            searchResult = [...data];
        } else if (typeof data === "object") {
            searchResult = [data];
        }
        this.setState({
            ...this.state,
            searchResult
        });
    }

    render() {
        let result = null;
        if (this.state.searchResult) {
            result = this.state.searchResult.map(profile => {
                return (
                    <div
                        className={classes.SearchResultWrapper}
                        key={profile.id}
                    >
                        <a href={`/user/${profile.id}`}>
                            {profile.first_name} {profile.last_name}
                        </a>
                    </div>
                );
            });
        }
        return (
            <Fragment>
                <input
                    autoComplete="off"
                    className={classes.SearchBar}
                    onChange={e => this.handleSearch(e)}
                    name="search"
                    placeholder="Search..."
                />
                <Search />
                {result}
            </Fragment>
        );
    }
}

export default SearchBar;
