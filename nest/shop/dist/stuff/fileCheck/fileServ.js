"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotos = exports.checkFiles = void 0;
const fs_1 = require("fs");
const uuid_1 = require("uuid");
function checkFiles(photos) {
    const canMimetype = ["image/jpeg", "image/jpg", "image/png"];
    let flag = true;
    photos.files.forEach(e => {
        if (!canMimetype.find(x => e.mimetype === x))
            flag = false;
    });
    return flag;
}
exports.checkFiles = checkFiles;
function getPhotos(photos) {
    const photosArray = [];
    photos.files.forEach(element => {
        const fileName = (0, uuid_1.v4)() + element.originalname;
        photosArray.push(fileName);
        const ws = (0, fs_1.createWriteStream)('./photos/' + fileName);
        ws.write(element.buffer);
    });
    return photosArray;
}
exports.getPhotos = getPhotos;
//# sourceMappingURL=fileServ.js.map