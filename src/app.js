import React from "react";
import axios from "./axios_csurf";
import Profile from "./user-profile";
import ProfileImage from "./user-profile-image";
import UploadProfileImage from "./upload-profile-image";
import kebabToCamel from "./helpers";
import errorHandler from "./error-handler";

import {
    PageWrapper,
    GlobalStyle,
    Header,
    Logo,
    Search,
    TopNav,
    TopSection,
    Link,
    Title,
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
            isUploadImageVisible: false
        };
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get(`/user`);
            this.upsertState("user", data[0]);
        } catch (err) {
            errorHandler(err);
        }
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
                    <TopSection>
                        <Title>
                            {this.state.user.firstname}{" "}
                            {this.state.user.lastname}
                        </Title>
                    </TopSection>
                    <Profile
                        user={user}
                        profileImage={
                            <ProfileImage
                                profileImageUrl={user.profileImageUrl}
                                toggleUploadImage={() =>
                                    this.toggleUploadImage()
                                }
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
                </PageWrapper>
                <Footer>Copyright Kim Skovhus Andersen</Footer>
            </React.Fragment>
        );
    }
}

export default App;
