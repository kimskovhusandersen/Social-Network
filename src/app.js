import React from "react";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
import { errorHandler } from "./error-handler";
import AboutMe from "./about-me";
import AboutMeHandler from "./about-me-handler";
import ProfilePhoto from "./profile-photo";
import Profile from "./profile";
import ProfilePhotoHandler from "./profile-photo-handler";

import {
    PageWrapper,
    GlobalStyle,
    Header,
    Logo,
    Search,
    TopNav,
    Link,
    Footer
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
            await axios.get(`/profiles`),
            await axios.get(`/profile-photo`)
        ];
        this.upsertState("photos", {
            profilePhotoUrl: photo[0].url
        });
        this.upsertState("profile", profile[0]);
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
            profile,
            photos,
            isPhotoUploaderVisible,
            isAboutMeVisible,
            isAboutMeFormVisible
        } = this.state;
        return (
            <React.Fragment>
                <GlobalStyle />
                <Header>
                    <Logo />
                    <Search type="text" />
                    <TopNav>
                        <Link>Profile</Link>
                        <Link>Home</Link>
                        <Link>Notifications</Link>
                        <Link>Account Settings</Link>
                    </TopNav>
                </Header>
                <PageWrapper>
                    <Profile
                        toggle={(e, prop) => this.toggle(e, prop)}
                        profile={profile}
                        aboutMe={
                            isAboutMeVisible && (
                                <AboutMe
                                    aboutMe={profile.aboutMe}
                                    toggle={(e, prop) => this.toggle(e, prop)}
                                />
                            )
                        }
                        profilePhoto={
                            <ProfilePhoto
                                profilePhotoUrl={photos.profilePhotoUrl}
                                toggle={(e, prop) => this.toggle(e, prop)}
                            />
                        }
                    />

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
