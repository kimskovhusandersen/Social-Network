import React, { useState, useEffect } from "react";
import { useRelativeTime } from "../../../helpers";

const RelativeTime = ({ timestamp }) => {
    const [now, setNow] = useState(Date.now());

    const [relativeTime, setRelativeTime] = useState(
        useRelativeTime(timestamp)
    );

    useEffect(() => {
        let isCancelled = false;
        (async () => {
            setRelativeTime(await useRelativeTime(timestamp));
            setTimeout(() => {
                if (!isCancelled) {
                    setNow(Date.now());
                }
            }, 1000);
        })();

        return () => {
            isCancelled = true;
        };
    }, [now]);

    return relativeTime;
};

export default RelativeTime;
