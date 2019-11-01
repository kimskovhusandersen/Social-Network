import React from "react";
import axios from "./axios_csurf";
import { useFetchData, kebabToCamel } from "./helpers";
import { Text, Title, Button } from "./theme";
import ProfilePhoto from "./profile-photo";
import FriendshipButton from "./friendship-button";
import ErrorBoundary from "./error-boundary";

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
                favoriteQuotes: ""
            },
            otherProfilePhotos: {
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

        const [otherProfile, otherProfilePhoto] = [
            await useFetchData(`/api/profiles/${otherProfileId}`),
            await useFetchData(`/api/profile-photo/${otherProfileId}`)
        ];
        if (!otherProfile) {
            return this.props.history.push("/");
        }
        otherProfile && this.upsertState("otherProfile", otherProfile);
        otherProfilePhoto &&
            this.upsertState("otherProfilePhotos", {
                profilePhotoUrl: otherProfilePhoto.url
            });
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
        const { otherProfile, otherProfilePhotos } = this.state;
        return (
            <React.Fragment>
                <Title>Details About You</Title>
                <ProfilePhoto src={otherProfilePhotos.profilePhotoUrl} />
                <ErrorBoundary>
                    {otherProfile.id !== null && (
                        <FriendshipButton otherProfileId={otherProfile.id} />
                    )}
                </ErrorBoundary>
                <Text>
                    Name: {otherProfile.firstName} {otherProfile.lastName}
                </Text>
                <Text>Email: {otherProfile.email}</Text>

                <Text>{otherProfile.aboutMe}</Text>
            </React.Fragment>
        );
    }
}

export default ProfileOther;
