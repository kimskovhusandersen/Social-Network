import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
import AboutMe from "./about-me";
import AboutMeHandler from "./about-me-handler";
import FindPeople from "./find-people";
import Footer from "./footer";
import Profile from "./profile";
import ProfileOther from "./profile-other";
import ProfilePhoto from "./profile-photo";
import ProfilePhotoHandler from "./profile-photo-handler";
import ProfileTopSection from "./profile-top-section";
import Users from "./users";
import { ChevronDown, Bell, User as UserIcon, MessageCircle } from "./icons";
import {
    GlobalStyle,
    PageWrapper,
    NavWrapper,
    Logo,
    TopNav,
    Photo,
    TopNavItem
} from "./theme";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: {
                id: null,
                email: "",
                firstName: "",
                middleName: "",
                lastName: "",
                birthdayDay: null,
                birthdayMonth: null,
                birthdayYear: null,
                gender: "",
                currentCity: "",
                hometown: "",
                relationshipStatus: "",
                interestedIn: "",
                aboutMe: "",
                favoriteQuotes: ""
            },
            photos: {
                profilePhotoUrl: ""
            },
            isPhotoUploaderVisible: false,
            isAboutMeVisible: true,
            isAboutMeFormVisible: false
        };
    }

    async componentDidMount() {
        const [{ data: profile }, { data: photo }] = [
            await axios.get(`/api/my-profile`),
            await axios.get(`/api/my-profile-photo`)
        ];
        if (photo[0]) {
            this.upsertState("photos", {
                profilePhotoUrl: photo[0].url
            });
        }
        if (profile[0]) {
            this.upsertState("profile", profile[0]);
        }
    }
    async toggle(e, prop) {
        if (Array.isArray(prop)) {
            prop.forEach(p => {
                this.setState({
                    [p]: !this.state[p]
                });
            });
        } else {
            this.setState({
                [prop]: !this.state[prop]
            });
        }
    }
    upsertState(prop, newProps) {
        for (let [key, value] of Object.entries(newProps)) {
            if (value != null) {
                this.setState(prevState => ({
                    [`${prop}`]: {
                        ...prevState[`${prop}`],
                        [`${kebabToCamel(key)}`]: `${value}`
                    }
                }));
            }
        }
    }

    render() {
        const {
            isAboutMeVisible,
            isAboutMeFormVisible,
            isPhotoUploaderVisible,
            photos,
            profile
        } = this.state;
        if (profile.id === null) {
            return null;
        }
        return (
            <React.Fragment>
                <GlobalStyle />
                <NavWrapper>
                    <Logo />
                    <FindPeople type="text" />
                    <TopNav>
                        <TopNavItem>
                            <Photo
                                small
                                src={
                                    photos.profilePhotoUrl ||
                                    "default-avatar.jpg"
                                }
                                title="Profile"
                            />
                            {profile.firstName}
                        </TopNavItem>
                        <TopNavItem>
                            <span>Home</span>
                        </TopNavItem>
                        <TopNavItem>
                            <UserIcon title="Friend requests" />
                        </TopNavItem>
                        <TopNavItem>
                            <MessageCircle title="Messages" />
                        </TopNavItem>
                        <TopNavItem>
                            <Bell title="Notifications" />
                        </TopNavItem>
                        <TopNavItem>
                            <ChevronDown title="Account Settings" />
                        </TopNavItem>
                    </TopNav>
                </NavWrapper>
                <PageWrapper>
                    <BrowserRouter>
                        <React.Fragment>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        toggle={(e, prop) =>
                                            this.toggle(e, prop)
                                        }
                                        profileTopSection={
                                            <ProfileTopSection
                                                profile={profile}
                                                profilePhoto={
                                                    <ProfilePhoto
                                                        url={
                                                            photos.profilePhotoUrl ||
                                                            "default-avatar.jpg"
                                                        }
                                                        toggle={(e, prop) =>
                                                            this.toggle(e, prop)
                                                        }
                                                    />
                                                }
                                            />
                                        }
                                        profile={profile}
                                        aboutMe={
                                            isAboutMeVisible && (
                                                <AboutMe
                                                    aboutMe={profile.aboutMe}
                                                    toggle={(e, prop) =>
                                                        this.toggle(e, prop)
                                                    }
                                                />
                                            )
                                        }
                                    />
                                )}
                            />
                        </React.Fragment>
                        <React.Fragment>
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <ProfileOther
                                        profileId={profile.id}
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                        </React.Fragment>
                        <React.Fragment>
                            <Route
                                path="/users"
                                render={props => (
                                    <Users
                                        id={profile.id}
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                        </React.Fragment>
                    </BrowserRouter>
                    {isPhotoUploaderVisible && (
                        <ProfilePhotoHandler
                            toggle={(e, prop) => this.toggle(e, prop)}
                            upsertState={(prop, newProps) =>
                                this.upsertState(prop, newProps)
                            }
                        />
                    )}
                    {isAboutMeFormVisible && (
                        <AboutMeHandler
                            aboutMe={profile.aboutMe}
                            upsertState={(prop, newProps) =>
                                this.upsertState(prop, newProps)
                            }
                            toggle={(e, prop) => this.toggle(e, prop)}
                        />
                    )}
                </PageWrapper>
                <Footer>Copyright Kim Skovhus Andersen</Footer>
            </React.Fragment>
        );
    }
}

export default App;
