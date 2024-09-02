import {Avatar, Badge, Button, Cell, FixedLayout, Placeholder} from "@telegram-apps/telegram-ui";
import styles from './Lists.module.css'
import {Icon28AddCircle} from "@telegram-apps/telegram-ui/dist/icons/28/add_circle";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectLists} from "store/reducers/lists";
import {ListItemBlock} from "pages/lists-page/list-item/ListItemBlock.tsx";
import {sortByIndex, sortByIndexDesc, sortByPinIndexDesc} from "helpers/ListsHelper.ts";

export default function ListsPage() {
    const navigate = useNavigate();
    const lists = useSelector(selectLists)

    const placeholderActionButton = useMemo(() => {
        return <Button before={<Icon28AddCircle/>} onClick={() => navigate('add')}>
            Создать список
        </Button>
    }, [])

    const renderedLists = useMemo(() => {
        return lists
            .toSorted(sortByIndexDesc)
            .toSorted(sortByPinIndexDesc)
            .map(list => <ListItemBlock key={list.id} list={list}/>)
    }, [lists])

    return <>
        {
            lists.length > 0
            ?
                <>
                    {renderedLists}

                    <FixedLayout style={{
                        bottom: '100px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button size={'s'} onClick={() => navigate('add')}>Добавить список</Button>
                    </FixedLayout>
                </>
            :
                <Placeholder
                    action={placeholderActionButton}
                    description="Создавайте списки и обменивайтесь доступом с другими!"
                    header={'Списки не найдены'}
                    className={styles.placeholder}
                >
                    <img
                        alt="Telegram sticker"
                        className={styles.sticker}
                        src="https://xelene.me/telegram.gif"
                    />
                </Placeholder>
        }
    </>
}