import ListItem from "models/store/ListItem.ts";

export default class List {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public index: number,
        public pinIndex?: number,
        public items: ListItem[] = []
    ) { }
}