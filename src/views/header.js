import React from "react";
import FindPeople from "../find-people";
import {
    StyledHeader,
    InnerHeader,
    LogoWrapper,
    Logo,
    TopNav,
    TopNavProfilePhotoWrapper
} from "../style/theme";
import {
    ChevronDown,
    Bell,
    User as UserIcon,
    MessageCircle
} from "../style/icons";

const Header = ({ profile, photos }) => {
    return (
        <React.Fragment>
            <StyledHeader>
                <InnerHeader>
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>
                    <form action="/search/top/">
                        <input type="text" placeholder="Search" name="search" />
                        <button>SI</button>
                    </form>
                    <TopNav>
                        <li>
                            <TopNavProfilePhotoWrapper href="/">
                                <span>
                                    <img src={photos.profilePhotoUrl} />
                                </span>
                                <span>{profile.firstName}</span>
                            </TopNavProfilePhotoWrapper>
                        </li>
                        <li>
                            <a href="/">Home</a>
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
                    </TopNav>
                </InnerHeader>
            </StyledHeader>
        </React.Fragment>
    );
};

export default Header;
