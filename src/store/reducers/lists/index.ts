import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import List from "models/store/List.ts";
import {RootState} from "store/index.ts";
import {sortByIndex, sortByIndexDesc} from "helpers/ListsHelper.ts";
import {IEditListName} from "store/reducers/lists/reducer-models/IEditListName.ts";
import {IEditListDescription} from "store/reducers/lists/reducer-models/IEditListDescription.ts";
import {ICreateListItem} from "store/reducers/lists/reducer-models/ICreateListItem.ts";

export interface IListsState {
    lists: List[]
}

const initialState: IListsState = {
    lists: []
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
            else list.items.push(action.payload.newItem)
        },
    }
})

export const {
    setLists,
    addList,
    removeList,
    pinList,
    unpinList,
    editListName,
    editListDescription,
    addListItem
} = listsSlicer.actions

export const selectLists = (state:RootState) => state.lists.lists
export const selectListItems = createSelector(
    [
        (state: RootState) => state.lists,
        (state: RootState, id: string) => id
    ],(lists: List[], id: string) => lists.find(l => l.id == id)?.items
)

export default listsSlicer.reducer