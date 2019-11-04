import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useFetchData } from "./helpers";
// views
import Footer from "./views/footer";
import FindFriends from "./find-friends";
import Page from "./views/page";
import Photo from "./views/photo";
import Photos from "./views/photos";
import Header from "./views/header";
import Hero from "./views/hero";
import Profile from "./views/profile";
// controllers & other
import AboutMeHandler from "./about-me-handler";

import ProfileOther from "./profile-other";
import ProfilePhotoHandler from "./profile-photo-handler";
// style
import { GlobalStyle } from "./style/theme";

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
                aboutMe: "Add a short bio to tell people more about yourself.",
                favoriteQuotes: ""
            },
            photos: {
                profilePhotoUrl: "/default-avatar.jpg"
            },
            isPhotoUploaderVisible: false,
            isAboutMeVisible: true,
            isAboutMeFormVisible: false
        };
    }

    async componentDidMount() {
        const [profile, photo] = [
            await useFetchData("/api/my-profile"),
            await useFetchData(`/api/my-profile-photo`)
        ];
        photo &&
            this.upsertState("photos", {
                profilePhotoUrl: photo.url
            });
        profile && this.upsertState("profile", profile);
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
                    [prop]: {
                        ...prevState[prop],
                        [key]: value
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
                <BrowserRouter>
                    <GlobalStyle />
                    <Header
                        profile={profile}
                        photos={photos}
                        toggle={(e, prop) => this.toggle(e, prop)}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Page
                                hero={
                                    <Hero
                                        profile={profile}
                                        toggle={(e, prop) =>
                                            this.toggle(e, prop)
                                        }
                                    />
                                }
                                content={
                                    <Profile
                                        aboutMeHandler={
                                            <AboutMeHandler
                                                createdAt={profile.createdAt}
                                                aboutMe={profile.aboutMe}
                                                isAboutMeVisible={
                                                    isAboutMeVisible
                                                }
                                                isAboutMeFormVisible={
                                                    isAboutMeFormVisible
                                                }
                                                upsertState={(prop, newProps) =>
                                                    this.upsertState(
                                                        prop,
                                                        newProps
                                                    )
                                                }
                                                toggle={(e, prop) =>
                                                    this.toggle(e, prop)
                                                }
                                            />
                                        }
                                        profile={profile}
                                        photos={photos}
                                    />
                                }
                            />
                        )}
                    />
                    <Route
                        path="/find-friends"
                        render={() => <Page content={<FindFriends />} />}
                    />
                    <Route
                        path="/friends"
                        render={() => (
                            <Page
                                hero={
                                    <Hero
                                        profile={profile}
                                        toggle={(e, prop) =>
                                            this.toggle(e, prop)
                                        }
                                    />
                                }
                                content={<Friends />}
                            />
                        )}
                    />
                    <Route
                        path="/photo/:id"
                        render={props => (
                            <Photo
                                profile={profile}
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route
                        path="/photos"
                        render={() => (
                            <Page
                                hero={
                                    <Hero
                                        profile={profile}
                                        toggle={(e, prop) =>
                                            this.toggle(e, prop)
                                        }
                                    />
                                }
                                content={
                                    <Photos
                                        hero={
                                            <Hero
                                                profile={profile}
                                                toggle={(e, prop) =>
                                                    this.toggle(e, prop)
                                                }
                                            />
                                        }
                                    />
                                }
                            />
                        )}
                    />
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
                    {isPhotoUploaderVisible && (
                        <ProfilePhotoHandler
                            toggle={(e, prop) => this.toggle(e, prop)}
                            upsertState={(prop, newProps) =>
                                this.upsertState(prop, newProps)
                            }
                        />
                    )}
                    <Footer>Copyright Kim Skovhus Andersen</Footer>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default App;
