import React, { Component } from "react";
import { Search } from "../../../style/icons";
import axios from "../../../axios_csurf";
import classes from "./SearchBar.module.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            isSearchResultVisible: false
        };
    }

    async handleSearch(e) {
        let data = null;
        let searchResult = null;
        if (e.target.value == "") {
            return this.setState({
                ...this.state,
                searchResult: [],
                isSearchResultVisible: false
            });
        }
        ({ data } = await axios.get(`/api/profiles/search/${e.target.value}`));
        if (Array.isArray(data)) {
            searchResult = [...data];
        } else if (typeof data === "object") {
            searchResult = [data];
        }
        let isSearchResultVisible = searchResult.length > 0;
        this.setState({
            ...this.state,
            searchResult,
            isSearchResultVisible
        });
    }

    render() {
        let result = null;
        if (this.state.searchResult) {
            result = this.state.searchResult.map(profile => {
                return (
                    <a key={profile.id} href={`/user/${profile.id}`}>
                        {profile.first_name} {profile.last_name}
                    </a>
                );
            });
        }
        let searchResult = null;
        if (this.state.isSearchResultVisible) {
            searchResult = (
                <div className={classes.SearchResultWrapper}>{result}</div>
            );
        }
        return (
            <div className={classes.SearchBarWrapper}>
                <div className={classes.SearchBar}>
                    <input
                        autoComplete="off"
                        onChange={e => this.handleSearch(e)}
                        name="search"
                        placeholder="Search..."
                    />
                    <Search />
                </div>
                {searchResult}
            </div>
        );
    }
}

export default SearchBar;
