import React from "react";
import { PageWrapper, Page, TimelineWrapper, PageItem } from "../style/theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { hero, profile, photos, aboutMeHandler } = this.props;
        if (!profile) {
            return null;
        }
        console.log(profile.firstName);
        return (
            <React.Fragment>
                {hero}
                <PageWrapper>
                    <Page>
                        <TimelineWrapper>
                            <div>
                                <PageItem>{aboutMeHandler}</PageItem>
                                <PageItem>
                                    <div>
                                        <span>
                                            <a>Photos</a>
                                        </span>
                                        <span>
                                            <a>Add photo</a>
                                        </span>
                                    </div>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                    <a>
                                        <img
                                            src="https://picsum.photos/85/85"
                                            alt=""
                                        />
                                    </a>
                                </PageItem>
                            </div>

                            <div>
                                <PageItem>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book. It has
                                    survived not only five centuries, but also
                                    the leap into electronic typesetting,
                                    remaining essentially unchanged. It was
                                    popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop
                                    publishing software like Aldus PageMaker
                                    including versions of Lorem Ipsum.
                                </PageItem>
                            </div>
                        </TimelineWrapper>
                    </Page>
                </PageWrapper>
            </React.Fragment>
        );
    }
}

export default Profile;
