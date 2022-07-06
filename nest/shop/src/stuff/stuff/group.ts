
export const thatGroup = (group: string) => {

    let that: string;
    switch(group)
    {
        case "Mężczyźni":
            that = "men";
        break;
        case "Kobiety":
            that = "woman";
        break;
        case "Dzieci":
            that = "child";
        break;
    }

    return that;
}