import React, { Fragment } from "react";
import classes from "./Page.module.css";

const Page = ({ hero, content, pageType }) => {
    let elem;
    if (pageType == "chat") {
        elem = <div className={classes.ChatPageWrapper}>{content}</div>;
    } else {
        elem = (
            <Fragment>
                {!hero ? (
                    <div className={classes.ProfilePageWrapper} first>
                        <div className={classes.ProfileInnerPage}>
                            {content}
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        {hero}
                        <div className={classes.ProfilePageWrapper}>
                            <div className={classes.ProfileInnerPage}>
                                {content}
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
    return elem;
};

export default Page;
