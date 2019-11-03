import React from "react";
import {
    TopSection,
    SecondarySection,
    HeroImg,
    HeroProfilePhoto,
    HeroName,
    SecondaryNav,
    TimelineWrapper,
    TimelineSmallItem,
    TimelineLargeItem
} from "../style/theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { profile, photos, toggle } = this.props;
        if (!profile) {
            return null;
        }
        console.log(profile.firstName);
        return (
            <React.Fragment>
                <TopSection>
                    <HeroImg src="https://picsum.photos/1500/500" alt="" />
                    <HeroProfilePhoto
                        onClick={e => toggle(e, "isPhotoUploaderVisible")}
                        src={profile.url}
                        alt="profile-photo"
                    />
                    <HeroName>
                        {profile.firstName} {profile.lastName}
                    </HeroName>
                </TopSection>
                <SecondarySection>
                    <SecondaryNav>
                        <li>&nbsp;</li>
                        <li>
                            <a href="/timeline">Timeline</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/photos">Photos</a>
                        </li>
                        <li>
                            <a href="/friends">Friends</a>
                        </li>
                    </SecondaryNav>
                </SecondarySection>
                <TimelineWrapper>
                    <div>
                        <TimelineSmallItem>
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
                        </TimelineSmallItem>
                    </div>
                    <div>
                        <TimelineLargeItem>
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
                        </TimelineLargeItem>
                    </div>
                </TimelineWrapper>
            </React.Fragment>
        );
    }
}

export default Profile;
