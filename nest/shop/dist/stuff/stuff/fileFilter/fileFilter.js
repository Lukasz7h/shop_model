"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterForFilesOfProducts = exports.filesArr = void 0;
const stuff_service_1 = require("../stuff.service");
let filesCount;
let allowFilesMimetypes = ["image/png", "image/jpeg", "image/jpg"];
exports.filesArr = {
    files: []
};
async function filterForFilesOfProducts(req, file, call) {
    let res = false;
    if (req.body.filesCount) {
        filesCount = parseInt(req.body.filesCount);
        exports.filesArr.files.push(file);
        if (exports.filesArr.files.length == filesCount) {
            let flag = true;
            exports.filesArr.files.forEach(_file => {
                const isWellMimetype = allowFilesMimetypes.find(mimetype => mimetype === _file.mimetype);
                if (!isWellMimetype)
                    flag = false;
            });
            if (flag) {
                for (let i = 0; i < filesCount - 1; i++) {
                    file = exports.filesArr.files[i];
                    call(null, true);
                }
            }
            else {
                call(null, false);
            }
            ;
            res = flag;
        }
        ;
        if (exports.filesArr.files.length == filesCount) {
            stuff_service_1.photoWell.flag = res;
            call(null, res);
        }
    }
}
exports.filterForFilesOfProducts = filterForFilesOfProducts;
//# sourceMappingURL=fileFilter.js.map