import React, { useState, useRef } from "react";
import SearchTop from "./search-top";
import { HeaderWrapper, StyledHeader, Logo } from "../style/header";
import {
    ChevronDown,
    Bell,
    User as UserIcon,
    MessageCircle
} from "../style/icons";

const Header = ({ profile, photos }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [isResultWrapperVisible, setIsResultWrapperVisible] = useState(false);
    const handleSearch = values => {
        setSearchResult(values);
        !!values && values.length
            ? setIsResultWrapperVisible(true)
            : setIsResultWrapperVisible(false);
    };
    const resultWrapper = useRef();

    return (
        <HeaderWrapper>
            <StyledHeader>
                <Logo />
                <div>
                    <SearchTop
                        profileId={profile.id}
                        handleSearch={(e, values) => handleSearch(e, values)}
                    />
                    {!!isResultWrapperVisible && (
                        <span ref={resultWrapper}>
                            {!!searchResult &&
                                searchResult.map(profile => {
                                    return (
                                        <a
                                            key={profile.id}
                                            href={`/user/${profile.id}`}
                                        >
                                            {profile.firstName}{" "}
                                            {profile.lastName}
                                        </a>
                                    );
                                })}
                        </span>
                    )}
                </div>
                <ul>
                    <li>
                        <a href="/">
                            <img src={photos.profilePhotoUrl} />
                            <span>{profile.firstName}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/find-friends">Home</a>
                    </li>
                    <li>
                        <a href="/friends/requests">
                            <UserIcon title="Friend requests" />
                        </a>
                    </li>
                    <li>
                        <a href="/messages">
                            <MessageCircle title="Messages" />
                        </a>
                    </li>
                    <li>
                        <a href="/notifications">
                            <Bell title="Notifications" />
                        </a>
                    </li>
                    <li>
                        <a href="settings">
                            <ChevronDown title="Account Settings" />
                        </a>
                    </li>
                </ul>
            </StyledHeader>
        </HeaderWrapper>
    );
};

export default Header;
