const getLevel = (proficiency: number) => {
    switch (proficiency) {
        case 1:
            return "Amateur";
        case 2:
            return "Semi-pro";
        case 3:
            return "Professional";
        default:
            return "Unknown";
    }
};

export default getLevel;
