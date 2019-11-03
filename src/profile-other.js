import React from "react";
import { useFetchData, kebabToCamel } from "./helpers";
// views
import Profile from "./views/profile";
import ProfilePhoto from "./views/profile-photo";
// controllers
import FriendshipButton from "./friendship-button";

class ProfileOther extends React.Component {
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
                aboutMe: "",
                favoriteQuotes: "",
                url: "/default-avatar.jpg"
            },
            otherPhotos: {
                profilePhotoUrl: ""
            }
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
        console.log(this.state);
    }

    render() {
        const { otherProfile, otherPhotos } = this.state;
        return (
            <React.Fragment>
                <Profile
                    profile={otherProfile}
                    FriendshipButton={
                        <FriendshipButton otherProfileId={otherProfile.id} />
                    }
                    profilePhoto={
                        <ProfilePhoto src={otherPhotos.profilePhotoUrl} />
                    }
                />
            </React.Fragment>
        );
    }
}

export default ProfileOther;
