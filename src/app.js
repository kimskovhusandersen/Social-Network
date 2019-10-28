import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
import AboutMe from "./about-me";
import AboutMeHandler from "./about-me-handler";
import Footer from "./footer";
import Profile from "./profile";
import ProfileOther from "./profile-other";
import ProfilePhoto from "./profile-photo";
import ProfilePhotoHandler from "./profile-photo-handler";
import ProfileTopSection from "./profile-top-section";
import TopNavigation from "./navigation-top";
import { PageWrapper } from "./theme";
import { ThemeProvider } from "styled-components";

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
            isAboutMeFormVisible: false,
            theme: "light"
        };
        this.theme = {};
    }

    setTheme() {
        const { theme } = this.state;
        if (theme == "light") {
            this.theme = {
                primaryBackground: "white",
                primaryColor: "black",
                secondaryBackground: "ghostwhite",
                secondaryColor: "#111",
                primaryHoverBackground: "Royalblue",
                primaryHoverColor: "white",
                secondaryHoverBackground: "Royalblue",
                secondaryHoverColor: "white",
                borderColor: "#999"
            };
        } else if (theme == "dark") {
            this.theme = {
                primaryBackground: "black",
                primaryColor: "white",
                secondaryBackground: "#111",
                secondaryColor: "#eee",
                primaryHoverBackground: "Royalblue",
                primaryHoverColor: "white",
                secondaryHoverBackground: "Royalblue",
                secondaryHoverColor: "white",
                borderColor: "#ccc"
            };
        }
    }

    async componentDidMount() {
        this.setTheme();
        const [{ data: profile }, { data: photo }] = [
            await axios.get(`/api/my-profile`),
            await axios.get(`/api/my-profile-photo`)
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
            isAboutMeVisible,
            isAboutMeFormVisible,
            isPhotoUploaderVisible,
            photos,
            profile
        } = this.state;
        return (
            <React.Fragment>
                <ThemeProvider theme={this.theme}>
                    <TopNavigation profile={profile} photos={photos} />
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
                                                                photos.profilePhotoUrl
                                                            }
                                                            toggle={(e, prop) =>
                                                                this.toggle(
                                                                    e,
                                                                    prop
                                                                )
                                                            }
                                                        />
                                                    }
                                                />
                                            }
                                            profile={profile}
                                            aboutMe={
                                                isAboutMeVisible && (
                                                    <AboutMe
                                                        aboutMe={
                                                            profile.aboutMe
                                                        }
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
                                    exact
                                    path="/user/:id"
                                    render={props => (
                                        <ProfileOther
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
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
