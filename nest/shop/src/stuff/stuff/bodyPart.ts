
export const thatBodyPart = (part: string) => {

    let that: string;
    switch(part)
    {
        case "head":
            that = "Głowa";
        break;
        case "corpus":
            that = "Korpus";
        break;
        case "legs":
            that = "Nogi";
        break;
        case "feet":
            that = "Stopy";
        break;
    }

    return that;
}