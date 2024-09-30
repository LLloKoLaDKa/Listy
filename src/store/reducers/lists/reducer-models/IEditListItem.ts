import ListItem from "models/store/ListItem.ts";

export interface IEditListItem {
    listId: string,
    newItem: ListItem
}