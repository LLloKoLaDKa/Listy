import ListItem from "models/store/ListItem.ts";

interface IProps {
    listItem: ListItem
}

export const ListItemContent = ({listItem}: IProps) => {
    return <>
        {listItem.text}
    </>
}