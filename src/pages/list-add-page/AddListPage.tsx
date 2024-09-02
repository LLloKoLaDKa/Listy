import {FC, useCallback, useMemo, useState} from "react";
import {Button, Input, Textarea} from "@telegram-apps/telegram-ui";
import TaskListIllustrations from 'app/illustrations/task_list.svg'
import CreateNewIllustration from 'app/illustrations/CreateNew.svg'
import styles from './AddListPage.module.css'
import {addList, selectLists} from "store/reducers/lists";
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import {NewGuid} from "tools/guid/guidGenerator.ts";
import {useNavigate} from "react-router-dom";
import {isNullOrWhiteSpace} from "tools/stringUtils.ts";
import {useSelector} from "react-redux";
import {sortByIndex} from "helpers/ListsHelper.ts";
import WebApp from "@twa-dev/sdk";
import List from "models/store/List.ts";

enum ErrorType {
    Name,
    Description
}

export const AddListPage: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const lists = useSelector(selectLists)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errorBlocks, setErrorBlocks] = useState<ErrorType[]>([])

    const pushNewList = () => {
        const errors: ErrorType[] = [];
        if (isNullOrWhiteSpace(name)) errors.push(ErrorType.Name)
        if (isNullOrWhiteSpace(description)) errors.push(ErrorType.Description)

        if (errors.length > 0) {
            setErrorBlocks(errors)
            return;
        }

        dispatch(addList(new List(
            NewGuid(),
            name,
            description,
            lists.length > 0 ? lists[0].index + 1 : 1,
            undefined,
            []
        )))

        navigate('/')
    }

    const getStatusByType = (type: ErrorType) => {
        if (errorBlocks.includes(type)) return 'error'
        else return undefined
    }

    const requiredInputTitle = useCallback((text: string) => {
        return <>
            {text} {' '}
            <span style={{color: WebApp.themeParams.destructive_text_color}}>*</span>
        </>
    }, [])

    return <div className={styles.container}>

        <CreateNewIllustration width={300} style={{margin: 'auto', }} />

        <Input
            header={requiredInputTitle('Название списка')}
            title={'Название списка'}
            type={"text"}
            value={name}
            status={getStatusByType(ErrorType.Name)}
            onChange={(value) => setName(value.target.value)}
            placeholder={'Название списка'}
        />

        <Textarea
            header={requiredInputTitle('Описание списка')}
            title={'Описание списка'}
            type={"text"}
            value={description}
            status={getStatusByType(ErrorType.Description)}
            onChange={(value) => setDescription(value.target.value)}
            placeholder={'Описание списка'}
        />

        <Button
            mode={'filled'}
            style={{margin: '0px 6px'}}
            onClick={pushNewList}
        >
            Добавить новый список
        </Button>
    </div>
}