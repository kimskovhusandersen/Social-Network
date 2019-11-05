import React from "react";
import { TimelineWrapper, PageItem } from "../style/theme";
import { Clock } from "../style/icons";
import { AboutMeWrapper } from "../style/about-me";
import RelativeTime from "./relative-time";
import PhotoCollage from "./photo-collage";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { profile, photos } = this.props;
        const { aboutMeHandler, photoUploader } = this.props;
        if (!profile) {
            return null;
        }
        return (
            <React.Fragment>
                <TimelineWrapper>
                    <div>
                        <PageItem>
                            <AboutMeWrapper>
                                <div>{aboutMeHandler}</div>
                                <p>
                                    <Clock width="16" height="16" />
                                    Joined{" "}
                                    <RelativeTime
                                        timestamp={profile.createdAt}
                                    />
                                </p>
                            </AboutMeWrapper>
                        </PageItem>
                        <PageItem>
                            <div>
                                <span>
                                    <a>Photos</a>
                                </span>
                                <span>
                                    <a>Add photo</a>
                                </span>
                            </div>
                            <PhotoCollage cols="3" />
                        </PageItem>
                    </div>

                    <div>
                        {!!photoUploader && (
                            <PageItem>{photoUploader}</PageItem>
                        )}
                        <PageItem>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </PageItem>
                    </div>
                </TimelineWrapper>
            </React.Fragment>
        );
    }
}

export default Profile;
