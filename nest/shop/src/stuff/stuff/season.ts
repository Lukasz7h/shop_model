export const thatSeason = (season: string) => {

    let that: string;
    switch(season)
    {
        case "spring":
            that = "Wiosna";
        break;
        case "summer":
            that = "Lato";
        break;
        case "fall":
            that = "Jesień";
        break;
        case "winter":
            that = "Zima";
        break;
    }

    return that;
}