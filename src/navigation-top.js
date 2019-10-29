import React from "react";
import FindPeople from "./find-people";
import { GlobalStyle, Header, Logo, TopNav, Photo, Link } from "./theme";
import {
    ChevronDown,
    Bell,
    Search as SearchIcon,
    User as UserIcon,
    MessageCircle
} from "./icons";

const TopNavigation = ({ profile, photos }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Header>
                <Logo />
                <FindPeople type="text" />

                <Link>
                    <SearchIcon />
                </Link>

                <TopNav>
                    <Link>
                        <Photo
                            topNav
                            src={photos.profilePhotoUrl}
                            title="Profile"
                        />
                        {profile.firstName}
                    </Link>
                    <Link>
                        <span>Home</span>
                    </Link>
                    <Link>
                        <UserIcon title="Friend requests" />
                    </Link>
                    <Link>
                        <MessageCircle title="Messages" />
                    </Link>
                    <Link>
                        <Bell title="Notifications" />
                    </Link>
                    <Link>
                        <ChevronDown title="Account Settings" />
                    </Link>
                </TopNav>
            </Header>
        </React.Fragment>
    );
};

export default TopNavigation;
