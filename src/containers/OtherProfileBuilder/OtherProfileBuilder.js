import React from "react";
import { useFetchData } from "../../helpers";
// views
import Page from "../../components/Page/Page";
import ProfileBuilder from "../ProfileBuilder/ProfileBuilder.js";
import FriendshipButton from "../../components/friendship-button";
// controllers
import BioHandler from "../BioHandler/BioHandler";

class OtherProfileBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            otherProfile: {
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
                aboutMe: "This user hasn*",
                favoriteQuotes: "",
                url: "/default-avatar.jpg"
            },
            otherPhotos: {
                profilePhotoUrl: ""
            },
            isAboutMeVisible: true
        };
    }

    async componentDidMount() {
        const { profileId } = this.props;
        const { id: otherProfileId } = this.props.match.params;

        if (profileId == otherProfileId) {
            return this.props.history.push("/");
        }

        const data = await useFetchData(`/api/profiles/${otherProfileId}`);
        if (!data) {
            return this.props.history.push("/");
        }
        data && this.upsertState("otherProfile", data);
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
        const { otherProfile, otherPhotos, isAboutMeVisible } = this.state;
        if (!otherProfile) {
            return null;
        }
        return (
            <React.Fragment>
                <Page
                    content={
                        <ProfileBuilder
                            aboutMeHandler={
                                <BioHandler
                                    createdAt={otherProfile.createdAt}
                                    aboutMe={otherProfile.aboutMe}
                                    isAboutMeVisible={isAboutMeVisible}
                                />
                            }
                            FriendshipButton={
                                <FriendshipButton
                                    otherProfileId={otherProfile.id}
                                />
                            }
                            photos={otherPhotos}
                            profile={otherProfile}
                        />
                    }
                />
            </React.Fragment>
        );
    }
}

export default OtherProfileBuilder;
