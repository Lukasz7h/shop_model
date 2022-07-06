import { ChildStuff } from "src/entities/child-stuff.entity";
import { ManStuff } from "src/entities/man-stuff.entity";
import { WomanStuff } from "src/entities/woman.entity";
import { Repository } from "typeorm";
export declare class GetRepo {
    private manStuff;
    private womanStuff;
    private childStuff;
    constructor(manStuff: Repository<ManStuff>, womanStuff: Repository<WomanStuff>, childStuff: Repository<ChildStuff>);
    chooseGroup(group: string): {
        repo: any;
        newProduct: any;
    };
}
