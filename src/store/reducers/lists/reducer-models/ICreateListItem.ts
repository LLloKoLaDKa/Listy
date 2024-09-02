import ListItem from "models/store/ListItem.ts";

export interface ICreateListItem {
    listId: string,
    newItem: ListItem
}