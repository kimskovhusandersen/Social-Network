import React from "react";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
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

        const [{ data: otherProfile }, { data: otherProfilePhoto }] = [
            await axios.get(`/api/profiles/${otherProfileId}`),
            await axios.get(`/api/profile-photo/${otherProfileId}`)
        ];

        otherProfile[0] && this.upsertState("otherProfile", otherProfile[0]);
        otherProfilePhoto[0] &&
            this.upsertState("otherProfilePhotos", {
                profilePhotoUrl: otherProfilePhoto[0].url
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
