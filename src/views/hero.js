import React from "react";
import {
    TopSectionWrapper,
    TopSection,
    HeroWrapper,
    SecondarySection,
    HeroImg,
    HeroProfilePhoto,
    HeroName,
    SecondaryNav
} from "../style/hero";

const Hero = ({ profile, toggle, photos }) => {
    return (
        <React.Fragment>
            <TopSectionWrapper>
                <TopSection>
                    <HeroWrapper>
                        <HeroImg src="https://picsum.photos/1500/500" alt="" />
                        {toggle ? (
                            <HeroProfilePhoto
                                onClick={e =>
                                    toggle(e, "isPhotoUploaderVisible")
                                }
                                src={photos.profilePhotoUrl || profile.url}
                                alt="profile-photo"
                            />
                        ) : (
                            <HeroProfilePhoto
                                src={profile.url}
                                alt="profile-photo"
                            />
                        )}

                        <HeroName>
                            {profile.firstName} {profile.lastName}
                        </HeroName>
                    </HeroWrapper>
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
                                <a href="/friends">Friends</a>
                            </li>
                            <li>
                                <a href="/photos">Photos</a>
                            </li>
                        </SecondaryNav>
                    </SecondarySection>
                </TopSection>
            </TopSectionWrapper>
        </React.Fragment>
    );
};

export default Hero;
