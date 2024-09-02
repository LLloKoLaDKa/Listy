import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {Button, Input, Modal, Title} from "@telegram-apps/telegram-ui";
import {Icon28AddCircle} from "@telegram-apps/telegram-ui/dist/icons/28/add_circle";
import styles from "pages/list-inside-page/list-inside-page.module.scss";
import {addListItem} from "store/reducers/lists";
import ListItem from "models/store/ListItem.ts";
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import List from "models/store/List.ts";
import {useEffect, useState} from "react";

interface IProps {
    list: List
}

export const NewItemContent = ({list}:IProps) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setText('')
            }, 200)
        }
    }, [isOpen]);

    const createNewItem = () => {
        dispatch(addListItem({
            listId: list.id,
            newItem: new ListItem(text)
        }))
        setIsOpen(false)
    }

    return <Modal
        open={isOpen}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        header={<ModalHeader>Новый пункт</ModalHeader>}
        trigger={<Button size={'s'}  onClick={() => setIsOpen(true)}>
            Добавить пункт списка
        </Button>}
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

        <Button
            size={'l'}
            style={{width: '100%'}}
            mode={'plain'}
            onClick={createNewItem}
        >
            Добавить пункт
        </Button>
    </Modal>
}