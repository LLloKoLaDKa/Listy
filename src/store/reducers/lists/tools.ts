import {IListsState} from "store/reducers/lists/index.ts";
import List from "models/store/List.ts";
import ListItem from "models/store/ListItem.ts";

export function synchronizeOpenedList(state: IListsState, updatedList: List)  {
    if (state.openedList && state.openedList.id == updatedList.id) {
        state.openedList = updatedList
    }
}

export function synchronizeOpenedListItem(state: IListsState, updatedListItem: ListItem)  {
    if (state.openedList && state.openedList.id == updatedListItem.listId) {
        state.openedList.items = [
            ...state.openedList.items.filter(x => x.id != updatedListItem.listId),
            updatedListItem
        ];
    }
}