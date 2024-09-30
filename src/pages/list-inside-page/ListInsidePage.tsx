import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {
    editListDescription,
    editListName,
    selectListById,
    selectListItems,
    selectLists, selectOpenedList, setEditableList,
    setOpenedList
} from "store/reducers/lists";
import List from "models/store/List.ts";
import {
    Avatar,
    AvatarStack,
    Caption, Divider,
    Headline,
    Placeholder,
    Title,
    Text, FixedLayout, Button,
} from "@telegram-apps/telegram-ui";
import styles from './list-inside-page.module.scss'
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import WebApp from "@twa-dev/sdk";
import {ListItemEditor} from "pages/list-inside-page/new-item-content/ListItemEditor.tsx";
import {ListItemContent} from "pages/list-inside-page/list-item/ListItemContent.tsx";
import {ItemsContent} from "pages/list-inside-page/items-content/ItemsContent.tsx";
import ListItem from "models/store/ListItem.ts";

export const ListInsidePage = () => {
    const params = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentList = useSelector(selectOpenedList)
    if (!currentList) navigate('/')

    const [isOpenNew, setIsOpenNew] = useState(false)
    const [newName, setNewName] = useState<string | null>(null)
    const [newDescription, setNewDescription] = useState<string | null>(null)

    useLayoutEffect(() => {
        if (!params.id) {
            navigate('/')
            return;
        }
        
        dispatch(setOpenedList(params.id))
    }, [params, navigate, dispatch]);

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
    }, [currentList, dispatch, newName])

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
    }, [currentList, dispatch, newDescription])

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

                    <ItemsContent/>

                    <FixedLayout>
                        <Button onClick={() => dispatch(setEditableList(new ListItem(currentList.id)))}/>
                    </FixedLayout>
                </div>
            :<></>
        }
    </>
}