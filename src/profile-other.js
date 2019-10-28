import React from "react";
import axios from "./axios_csurf";
import { kebabToCamel } from "./helpers";
import { Text, Title } from "./theme";
import ProfilePhoto from "./profile-photo";

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
            }
        };
    }

    async componentDidUpdate() {
        const {
            id: userId,
            history,
            match: {
                params: { id: profileId }
            }
        } = this.props;

        if (userId == profileId) {
            return history.push("/");
        }
        if (profileId !== this.state.profile.id) {
            this.upsertState("profile", {
                id: profileId
            });

            const [{ data: profile }, { data: photo }] = [
                await axios.get(`/api/profiles/${profileId}`),
                await axios.get(`/api/profile-photo/${profileId}`)
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
        const { profile, photos } = this.state;
        return (
            <React.Fragment>
                <Title>Details About You</Title>
                <React.Fragment>
                    Profile Photo: <ProfilePhoto src={photos.profilePhotoUrl} />
                </React.Fragment>
                <Text>
                    Name: {profile.firstName} {profile.lastName}
                </Text>
                <Text>Email: {profile.email}</Text>
                <Text>
                    Birthday:
                    {profile.birthdayDay}/{profile.birthdayMonth}/
                    {profile.birthdayYear}
                </Text>
                <Text>{profile.aboutMe}</Text>
            </React.Fragment>
        );
    }
}

export default ProfileOther;
