import {createWriteStream} from 'fs';
import { v4 as uuid } from "uuid";

// sprawdzamy czy wartości przesyłanych plików się zgadzają i jeśli tak zapisujemy je
export function checkFiles(photos): boolean
{
    const canMimetype: string[] = ["image/jpeg", "image/jpg", "image/png"];
    let flag: boolean = true;

    photos.files.forEach(e => {
        if(!canMimetype.find(x => e.mimetype === x)) flag = false;
    });
    return flag;
}

export function getPhotos(photos): string[]
{
    const photosArray: string[] = [];

    photos.files.forEach(element => {
        const fileName: string = uuid()+element.originalname;
        photosArray.push(fileName);

        const ws = createWriteStream('./src/stuff/photos/'+fileName);
        ws.write(element.buffer, (err) => {})
    });

    return photosArray;
}