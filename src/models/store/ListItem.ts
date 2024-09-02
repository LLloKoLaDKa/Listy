import {NewGuid} from "tools/guid/guidGenerator.ts";

export default class ListItem {
    constructor(
        public text: string,
        public id: string = NewGuid()
    ) {}
}