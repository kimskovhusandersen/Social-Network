import React from "react";
import axios from "./axios_csurf";
import kebabToCamel from "./helpers";
import errorHandler from "./error-handler";
import Bio from "./user-bio";
import ProfileImage from "./user-profile-image";
import Profile from "./user-profile";
import ProfileImageUploader from "./profile-image-uploader";

import {
    PageWrapper,
    GlobalStyle,
    Header,
    Logo,
    Search,
    TopNav,
    Link,
    Footer
} from "./theme";

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
            isImageUploaderVisible: false,
            isBioEditorVisible: false
        };
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get(`/user`);
            console.log("LOGGING IN MOUNT", data);
            this.upsertState("user", data[0]);
        } catch (err) {
            errorHandler(err);
        }
    }
    toggle(prop) {
        this.setState({
            [prop]: !this.state[prop]
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
        console.log(this.state.user);
    }

    render() {
        const { user, isUploadImageVisible } = this.state;
        return (
            <React.Fragment>
                <GlobalStyle />
                <Header>
                    <Logo />
                    <Search type="text" />
                    <TopNav>
                        <Link>Profile</Link>
                        <Link>Home</Link>
                        <Link>Notifications</Link>
                        <Link>Account Settings</Link>
                    </TopNav>
                </Header>
                <PageWrapper>
                    <Profile
                        user={user}
                        bio={
                            <Bio toggleVisibility={prop => this.toggle(prop)} />
                        }
                        profileImage={
                            <ProfileImage
                                profileImageUrl={user.profileImageUrl}
                                toggleVisibility={prop => this.toggle(prop)}
                            />
                        }
                    />

                    {isUploadImageVisible && (
                        <ProfileImageUploader
                            upsertState={(prop, newProps) =>
                                this.upsertState(prop, newProps)
                            }
                        />
                    )}
                </PageWrapper>
                <Footer>Copyright Kim Skovhus Andersen</Footer>
            </React.Fragment>
        );
    }
}

export default App;
