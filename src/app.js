import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { useFetchData } from "./helpers";

// hoc
import ProfileLayout from "./hoc/ProfileLayout/ProfileLayout";
import ChatLayout from "./hoc/ChatLayout/ChatLayout";
import TimeLineLayout from "./hoc/TimeLineLayout/TimeLineLayout";
import FindFriendsLayout from "./hoc/FindFriendsLayout/FindFriendsLayout";

// containers
import BioHandler from "./containers/BioHandler/BioHandler.js";
import ProfileBuilder from "./containers/ProfileBuilder/ProfileBuilder";
import OtherProfileBuilder from "./containers/OtherProfileBuilder/OtherProfileBuilder";
import FriendsBuilder from "./containers/FriendsBuilder/FriendsBuilder";

// components
import AuthLogout from "./components/auth-logout";
import Toolbar from "./components/Toolbar/Toolbar";
import Photo from "./components/photo";

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
            isPhotoUploaderVisible: true,
            isAboutMeVisible: true,
            isAboutMeFormVisible: false
        };
    }

    async componentDidMount() {
        const [profile, photo] = [
            await useFetchData("/api/my-profile"),
            await useFetchData(`/api/my-profile-photo`)
        ];

        if (photo && profile) {
            this.setState({
                ...this.state,
                profilePhotoUrl: photo.url,
                profile
            });
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
            profile,
            photos,
            isAboutMeVisible,
            isAboutMeFormVisible,
            isPhotoUploaderVisible
        } = this.state;

        let toolbar,
            profileLayout,
            timeLineLayout,
            chatLayout,
            photoLayout,
            authLayout;

        if (profile && photos) {
            toolbar = (
                <Toolbar
                    profile={profile}
                    photos={photos}
                    toggle={(e, prop) => this.toggle(e, prop)}
                />
            );
            profileLayout = (
                <ProfileLayout
                    profile={profile}
                    photos={photos}
                    isAboutMeVisible={isAboutMeVisible}
                    isAboutMeFormVisible={isAboutMeFormVisible}
                    isPhotoUploaderVisible={isPhotoUploaderVisible}
                    upsertState={(prop, newProps) =>
                        this.upsertState(prop, newProps)
                    }
                    toggle={(e, prop) => this.toggle(e, prop)}
                />
            );
            timeLineLayout = <TimeLineLayout />;
            chatLayout = <ChatLayout profile={profile} />;
            chatLayout = <Photo />;
        }

        authLayout = <AuthLogout />;

        return (
            <Fragment>
                {toolbar}
                <Switch>
                    <Route exact path="/" render={() => timeLineLayout} />
                    <Route path="/profile" render={() => profileLayout} />
                    <Route path="/user/:id" render={props => profileLayout} />
                    <Route path="/friends" render={() => profileLayout} />
                    <Route path="/photos" render={() => profileLayout} />
                    <Route path="/photo/:id" render={props => photoLayout} />
                    <Route path="/find-friends" component={FindFriendsLayout} />
                    <Route path="/messages" render={() => chatLayout} />
                    <Route path="/logout" render={() => authLayout} />
                </Switch>
            </Fragment>
        );
    }
}

export default App;
