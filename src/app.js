import React from "react";
import axios from "./axios_csurf";
import Profile from "./profile";
import ProfileImage from "./profile-image";
import UploadProfileImage from "./upload-profile-image";
import kebabToCamel from "./helpers";
import errorHandler from "./error-handler";

import { CodeWrapper, Logo, Title } from "./theme";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                about: {
                    bio: ""
                },
                addresses: [
                    {
                        street: "",
                        number: null,
                        postalCode: null,
                        city: "",
                        state: "",
                        country: ""
                    }
                ],
                birthdayDay: null,
                birthdayYear: null,
                birthdayMonth: null,
                email: "",
                firstname: "",
                id: null,
                lastname: "",
                profileImageUrl: ""
            },
            isUploadImageVisible: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get(`/user`);
        data.name != "error"
            ? this.upsertState("user", data[0])
            : errorHandler(data);

        console.log(this.state.user);
    }
    toggleUploadImage() {
        this.setState({
            isUploadImageVisible: !this.state.isUploadImageVisible
        });
    }
    upsertState(prop, newProps) {
        for (let [key, value] of Object.entries(newProps)) {
            this.setState(prevState => ({
                [`${prop}`]: {
                    ...prevState[`${prop}`],
                    [`${kebabToCamel(key)}`]: `${value}`
                }
            }));
        }
    }

    render() {
        const { user, isUploadImageVisible } = this.state;
        return (
            <CodeWrapper>
                <Logo />
                <Title>Welcome to Social Media!</Title>
                <Profile
                    user={user}
                    profileImage={
                        <ProfileImage
                            profileImageUrl={user.profileImageUrl}
                            toggleUploadImage={() => this.toggleUploadImage()}
                        />
                    }
                />

                {isUploadImageVisible && (
                    <UploadProfileImage
                        upsertState={(prop, newProps) =>
                            this.upsertState(prop, newProps)
                        }
                    />
                )}
            </CodeWrapper>
        );
    }
}

export default App;
