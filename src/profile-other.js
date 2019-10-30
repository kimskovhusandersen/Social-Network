import React from "react";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
import { Text, Title, Button } from "./theme";
import ProfilePhoto from "./profile-photo";
import FriendshipButton from "./friendship-button";

class ProfileOther extends React.Component {
    constructor(props) {
        super(props);
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
            otherProfileId: null
        };
    }

    async componentDidUpdate() {
        const {
            id: userId,
            history,
            match: {
                params: { id: otherProfileId }
            }
        } = this.props;

        if (otherProfileId != this.state.otherProfileId) {
            this.setState({ otherProfileId });
        }

        if (userId == otherProfileId) {
            return history.push("/");
        }
        if (otherProfileId !== this.state.profile.id) {
            this.upsertState("profile", {
                id: otherProfileId
            });

            const [{ data: profile }, { data: photo }] = [
                await axios.get(`/api/profiles/${otherProfileId}`),
                await axios.get(`/api/profile-photo/${otherProfileId}`)
            ];

            photo[0] &&
                this.upsertState("photos", {
                    profilePhotoUrl: photo[0].url
                });

            profile[0] && this.upsertState("profile", profile[0]);
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
        const { profile, photos, otherProfileId } = this.state;
        return (
            <React.Fragment>
                <Title>Details About You</Title>
                <ProfilePhoto src={photos.profilePhotoUrl} />
                <FriendshipButton otherProfileId={this.props.match.params.id} />
                <Text>
                    Name: {profile.firstName} {profile.lastName}
                </Text>
                <Text>Email: {profile.email}</Text>

                <Text>{profile.aboutMe}</Text>
            </React.Fragment>
        );
    }
}

export default ProfileOther;
