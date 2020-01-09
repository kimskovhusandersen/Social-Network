import React, { useState, useEffect } from "react";
import { useRelativeTime } from "../../../helpers";

const RelativeTime = ({ timestamp }) => {
    const [now, setNow] = useState(Date.now());

    const [relativeTime, setRelativeTime] = useState(
        useRelativeTime(timestamp)
    );

    useEffect(() => {
        (async () => {
            setRelativeTime(await useRelativeTime(timestamp));
            setTimeout(() => {
                setNow(Date.now());
            }, 1000);
        })();
    }, [now]);

    return relativeTime;
};

export default RelativeTime;
