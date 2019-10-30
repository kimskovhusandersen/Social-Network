import React from "react";
import { Text, StyledFooter } from "./theme";

const Footer = ({ profile, photos }) => {
    return (
        <StyledFooter>
            <Text secondary>Copyright Kim Skovhus Andersen</Text>
        </StyledFooter>
    );
};

export default Footer;
