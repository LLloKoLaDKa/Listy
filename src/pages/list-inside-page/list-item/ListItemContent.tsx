import ListItem from "models/store/ListItem.ts";
import styles from './ListItemContent.module.scss'
import {Avatar, Badge, Cell, Checkbox} from "@telegram-apps/telegram-ui";
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import {setListItemChecked} from "store/reducers/lists";
import {ICheckedListItem} from "store/reducers/lists/reducer-models/ICheckedListItem.ts";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ListItemEditor} from "pages/list-inside-page/new-item-content/ListItemEditor.tsx";

interface IProps {
    key: React.Key,
    listItem: ListItem
}

export const ListItemContent = ({listItem, key}: IProps) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(listItem.checked)
    const [editorOpen, setEditorOpen] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setListItemChecked({
            listId: listItem.listId,
            listItemId: listItem.id,
            newValue: checked
        }))
    }, [checked, dispatch, listItem.id, listItem.listId]);
    
    // const text = useMemo(() => {
    //     return checked
    //     ? <del>{listItem.text}</del>
    //     : <>{listItem.text}</>
    // }, [checked, listItem.text])

    function formatNumber(number: number) {
        // Use the toLocaleString method to add suffixes to the number
        return number.toLocaleString('ru', {
            // add suffixes for thousands, millions, and billions
            // the maximum number of decimal places to use
            maximumFractionDigits: 2,
            // specify the abbreviations to use for the suffixes
            notation: 'compact',
            compactDisplay: 'short'
        });
    }

    const itemPrice = useMemo(() => {
        if (!listItem.price) return undefined

        return <Badge type={"number"}>{formatNumber(listItem.price)} ₽</Badge>
    }, [listItem.price])

    return <>
        <Cell
            onClick={() => setEditorOpen(true)}
            before={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}/>}
            title={listItem.text}
            after={itemPrice}
        >
            {listItem.text}
        </Cell>

        <ListItemEditor isOpen={editorOpen} changeOpen={setEditorOpen} existListItem={listItem}/>
    </>

    // return <div key={key} className={styles.list_item}>
    //     <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
    //     {text}
    // </div>
}