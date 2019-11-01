export const getProfiles = () => {
    const profiles = [
        { id: 1, firstName: "Kim" },
        { id: 2, firstName: "Kim" },
        { id: 3, firstName: "Kim" }
    ];
    return {
        type: "GET_PROFILES",
        data: profiles
    };
};
