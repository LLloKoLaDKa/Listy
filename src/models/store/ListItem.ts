import {NewGuid} from "tools/guid/guidGenerator.ts";

export default class ListItem {
    constructor(
        public listId: string,
        public text: string = '',
        public price: number | undefined = undefined,
        public checked: boolean = false,
        public id: string = NewGuid(),
    ) {}
}