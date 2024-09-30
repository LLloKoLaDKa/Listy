import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import List from "models/store/List.ts";
import {RootState} from "store/index.ts";
import {sortByIndex, sortByIndexDesc} from "helpers/ListsHelper.ts";
import {IEditListName} from "store/reducers/lists/reducer-models/IEditListName.ts";
import {IEditListDescription} from "store/reducers/lists/reducer-models/IEditListDescription.ts";
import {ICreateListItem} from "store/reducers/lists/reducer-models/ICreateListItem.ts";
import {ICheckedListItem} from "store/reducers/lists/reducer-models/ICheckedListItem.ts";
import {synchronizeOpenedList, synchronizeOpenedListItem} from "store/reducers/lists/tools.ts";
import {IEditListItem} from "store/reducers/lists/reducer-models/IEditListItem.ts";
import ListItem from "models/store/ListItem.ts";

export interface IListsState {
    lists: List[],
    openedList: List | undefined,
    editableList: ListItem | undefined,
}

const initialState: IListsState = {
    lists: [],
    openedList: undefined,
    editableList: undefined
}

export const listsSlicer = createSlice({
    name: 'lists',
    initialState: initialState,
    reducers:{
        setLists: (state: IListsState, action: PayloadAction<List[]>) => {
            state.lists = action.payload;
        },
        addList: (state: IListsState, action: PayloadAction<List>) => {
            state.lists.push(action.payload);
        },
        removeList: (state: IListsState, action: PayloadAction<string>) => {
            state.lists = state.lists.filter(l => l.id !== action.payload)
        },
        setOpenedList: (state: IListsState, action: PayloadAction<string>) => {
            state.openedList = state.lists.find(l => l.id === action.payload)
        },
        editListName: (state: IListsState, action: PayloadAction<IEditListName>) => {
            const list = state.lists.find(l => l.id == action.payload.id)
            if (!list) return;

            list.name = action.payload.newName;
        },
        editListDescription: (state: IListsState, action: PayloadAction<IEditListDescription>) => {
            const list = state.lists.find(l => l.id == action.payload.id)
            if (!list) return;

            list.description = action.payload.newDescription;
        },
        pinList: (state: IListsState, action: PayloadAction<string>) => {
            const pinned = state.lists.find(l => l.id === action.payload)
            if (!pinned) return;

            state.lists = state.lists
                .map(list => {
                    if(list.pinIndex) list.pinIndex +=1
                    return list;
                })

            pinned.pinIndex = 1;
        },
        unpinList: (state: IListsState, action: PayloadAction<string>) => {
            const unpinned = state.lists.find(l => l.id === action.payload)
            if (!unpinned) return;

            state.lists = state.lists
                .map(list => {
                    if(list.pinIndex && unpinned.pinIndex && list.pinIndex > unpinned.pinIndex) list.pinIndex -=1
                    return list;
                })

            unpinned.pinIndex = undefined;
        },
        addListItem: (state: IListsState, action: PayloadAction<ICreateListItem>) => {
            const list = state.lists.find(l => l.id == action.payload.listId)
            if (!list) return;

            list.items.push(action.payload.newItem)
        },
        editListItem: (state: IListsState, action: PayloadAction<IEditListItem>) => {
            const list = state.lists.find(l => l.id == action.payload.listId)
            if (!list) return;

            list.items = list.items.filter(item => item.id !== action.payload.newItem.id)
            list.items.push(action.payload.newItem)
        },
        setListItemChecked: (state: IListsState, action: PayloadAction<ICheckedListItem>) => {
            const list = state.lists.find(l => l.id == action.payload.listId)
            if (!list) return;

            const listItem = list.items.find(item => item.id == action.payload.listItemId)
            if (!listItem) return;

            listItem.checked = action.payload.newValue
        },
        setEditableList: (state: IListsState, action: PayloadAction<ListItem>) => {
            state.editableList = action.payload
        }
    },
})

export const {
    setLists,
    addList,
    setOpenedList,
    removeList,
    pinList,
    unpinList,
    editListName,
    editListDescription,
    addListItem,
    editListItem,
    setListItemChecked,
    setEditableList,
} = listsSlicer.actions

export const selectLists = (state:RootState) => state.lists.lists
export const selectOpenedList = (state:RootState) => state.lists.openedList
export const selectOpenedListItems = (state:RootState) => state.lists.openedList?.items
export const selectListById = (state:RootState, id: string) => state.lists.lists.find(l => l.id == id)

export default listsSlicer.reducer