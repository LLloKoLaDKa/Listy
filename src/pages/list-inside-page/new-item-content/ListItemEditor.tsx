import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {Button, Input, Modal, Title} from "@telegram-apps/telegram-ui";
import styles from "pages/list-inside-page/list-inside-page.module.scss";
import {addListItem, editListItem, selectOpenedList} from "store/reducers/lists";
import ListItem from "models/store/ListItem.ts";
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import List from "models/store/List.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

interface IProps {
    isOpen: boolean,
    changeOpen: (bool: boolean) => void,
    existListItem?: ListItem
}

export const ListItemEditor = ({isOpen, changeOpen, existListItem}:IProps) => {
    const currentList = useSelector(selectOpenedList)
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('')
    const [price, setPrice] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (!existListItem) return;

        setText(existListItem.text)
        setPrice(existListItem.price)
    }, [existListItem]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setText('')
                setPrice(undefined)
            }, 200)
        }
    }, [isOpen]);

    const createNewItem = () => {
        if (!currentList) return;

        const newObject = {
            listId: currentList.id,
            newItem: new ListItem(currentList.id, text, price)
        }
        dispatch(addListItem(newObject))
        changeOpen(false)
    }

    const editExistListItem = () => {
        if (!currentList || !existListItem) return;

        existListItem.price = price;
        existListItem.text = text;

        const newObject = {
            listId: currentList.id,
            newItem: existListItem
        }
        dispatch(editListItem(newObject))
        changeOpen(false)
    }

    return <Modal
        open={isOpen}
        onOpenChange={(isOpen) => changeOpen(isOpen)}
        header={<ModalHeader>Новый пункт</ModalHeader>}
    >

        <Title className={styles.new_point_title}>
            {`Новый пункт`}
            {/*<span style={{color: WebApp.themeParams.accent_text_color}}>{currentList?.name}</span>*/}
        </Title>

        <Input
            // header={'Текст пункта'}
            title={'Текст пункта'}
            placeholder={'Текст пункта'}
            value={text}
            onChange={(event) => setText(event.target.value)}
        />

        <Input
            // header={'Текст пункта'}
            title={'Возможная стоимость'}
            placeholder={'Возможная стоимость'}
            value={price}
            type={"number"}
            onChange={(event) => setPrice(Number(event.target.value))}
        />

        <Button
            size={'l'}
            style={{width: '100%'}}
            mode={'plain'}
            onClick={existListItem ? editExistListItem : createNewItem}
        >
            Добавить пункт
        </Button>
    </Modal>
}