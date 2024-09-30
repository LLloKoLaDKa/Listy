import {FixedLayout, List, Placeholder} from "@telegram-apps/telegram-ui";
import {ListItemEditor} from "pages/list-inside-page/new-item-content/ListItemEditor.tsx";
import styles from "pages/list-inside-page/list-inside-page.module.scss";
import {ListItemContent} from "pages/list-inside-page/list-item/ListItemContent.tsx";
import {useSelector} from "react-redux";
import {selectOpenedListItems} from "store/reducers/lists";
import {useState} from "react";

export const ItemsContent = () => {
    const [isOpenNew, setIsOpenNew] = useState(false)

    const listItems = useSelector(selectOpenedListItems)
    if (!listItems || listItems.length == 0) return <>
        <Placeholder
            action={<ListItemEditor isOpen={isOpenNew} changeOpen={setIsOpenNew}/>}
            description="Создавайте пункты списка, чтобы рsаботать с ними совместно!"
            header={'Список пуст'}
            className={styles.placeholder}
        >
            <img
                alt="Telegram sticker"
                className={styles.sticker}
                src="https://xelene.me/telegram.gif"
                height={100}
            />
        </Placeholder>
    </>

    return <>
        <List>
            {listItems.map((item, index) => <ListItemContent key={index} listItem={item}/>)}
        </List>

        <FixedLayout className={styles.add_new_point}>
            <ListItemEditor isOpen={isOpenNew} changeOpen={setIsOpenNew}/>
        </FixedLayout>
    </>
}