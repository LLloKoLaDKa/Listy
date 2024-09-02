import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {editListDescription, editListName, selectListItems, selectLists} from "store/reducers/lists";
import List from "models/store/List.ts";
import {
    Avatar,
    AvatarStack,
    Caption, Divider,
    Headline,
    Placeholder,
    Title,
    Text, FixedLayout,
} from "@telegram-apps/telegram-ui";
import styles from './list-inside-page.module.scss'
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import WebApp from "@twa-dev/sdk";
import {NewItemContent} from "pages/list-inside-page/new-item-content/NewItemContent.tsx";
import {ListItemContent} from "pages/list-inside-page/list-item/ListItemContent.tsx";

export const ListInsidePage = () => {
    const params = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [currentList, setCurrentList] = useState<List | null>(null);

    const lists = useSelector(selectLists)

    const [newName, setNewName] = useState<string | null>(null)
    const [newDescription, setNewDescription] = useState<string | null>(null)

    useEffect(() => {
        if (!params.id) {
            navigate('/')
            return;
        }

        const list= lists.find(l => l.id == params.id)
        if (!list) {
            navigate('/')
            return;
        }

        setCurrentList(list)
    }, [params, lists, navigate]);

    const onEditTitle = useCallback((event: React.FormEvent<HTMLElement>) => {
        setNewName(event.currentTarget.innerText)
    },[])

    const commitTitleChange = useCallback(() => {
        if (!currentList) return;

        if (newName != null) {
            dispatch(editListName({
                id: currentList.id,
                newName: newName
            }))

            setNewName(null)
        }
    }, [currentList, newName])

    const onEditDescription = useCallback((event: React.FormEvent<HTMLElement>) => {
        setNewDescription(event.currentTarget.innerText)
    },[])

    const commitDescriptonChange = useCallback(() => {
        if (!currentList) return;

        if (newDescription != null) {
            dispatch(editListDescription({
                id: currentList.id,
                newDescription: newDescription
            }))

            setNewName(null)
        }
    }, [currentList, newDescription])

    const listItems = useMemo(() => {
        if (!currentList) return <></>

        return currentList.items.length == 0
            ?
            <Placeholder
                action={<NewItemContent list={currentList}/>}
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
            : <>
                {currentList.items.map(item => <ListItemContent listItem={item}/>)}

                <FixedLayout className={styles.add_new_point}>
                    <NewItemContent list={currentList}/>
                </FixedLayout>
            </>
    }, [currentList?.items])

    return <>
        {
            currentList
            ?
                <div className={styles.inside_container}>

                    <Avatar size={96} style={{margin: '0px auto'}}/>
                    <Title
                        level={'1'}
                        weight={'1'}
                        className={styles.title}
                        contentEditable={"true"}
                        onInput={onEditTitle}
                        onBlur={commitTitleChange}
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}
                    >
                        {currentList.name}
                    </Title>

                    <Caption style={{color: WebApp.themeParams.accent_text_color}}>
                        Описание
                    </Caption>
                    <Text
                        contentEditable={"true"}
                        onInput={onEditDescription}
                        onBlur={commitDescriptonChange}
                        className={styles.description_multiline}
                    >
                        {currentList?.description.split('\n').map(x => <span>{x}</span>)}
                        {/*{`currentList.description \n djoicsjmk,`}*/}
                    </Text>

                    <Caption style={{color: WebApp.themeParams.accent_text_color}}>
                        Редакторы
                    </Caption>
                    <AvatarStack>
                        <Avatar size={20} style={{marginLeft: '-4px'}}/>
                        <Avatar size={20} style={{marginLeft: '-4px'}}/>
                        <Avatar size={20} style={{marginLeft: '-4px'}}/>
                    </AvatarStack>

                    <Divider style={{border: '2px solid var(--tgui--outline)'}}/>

                    <Headline>Содержание списка</Headline>

                    {listItems}
                </div>
            :<></>
        }
    </>
}