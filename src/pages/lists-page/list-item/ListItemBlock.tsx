import {Avatar, Badge, Cell} from "@telegram-apps/telegram-ui";
import React, {useMemo, useState} from "react";
import List from "models/store/List.ts";
import styles from 'pages/lists-page/list-item/ListItem.module.scss'
import {ActionButtons, IListAction} from "pages/lists-page/list-item/action-buttons/ActionButtons.tsx";
import TrashIcon from 'app/icons/Trash.svg'
import PinIcon from 'app/icons/Pin.svg'
import UnpinIcon from 'app/icons/Unpin.svg'
import WebApp from "@twa-dev/sdk";
import {useAppDispatch} from "hooks/useAppDispatch.tsx";
import {pinList, removeList, unpinList} from "store/reducers/lists";
import {useNavigate} from "react-router-dom";

interface IProps {
    key: React.Key,
    list: List
}

export const ListItemBlock = ({list}:IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const [difference, setDifference] = useState<number>(0)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
        e.stopPropagation();
    }

    const onTouchMove = (e: React.TouchEvent) => {
        e.stopPropagation();
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isRightSwipe) {
            console.log('right swipe')
            setDifference(0)
        }
        if (isLeftSwipe) {
            console.log('left swipe')
            setDifference(actions.length * 90)
        }
        // add your conditional logic here
    }

    const onClickActionWithHide = (action: () => void) => {
        action()
        setDifference(0)
    }

    const actions = useMemo(() => {
        const pinAction = {
            icon: <PinIcon />,
            background: WebApp.themeParams.button_color,
            title: 'Закрепить',
            onClick: () => onClickActionWithHide(() => dispatch(pinList(list.id)))
        }
        const unpinAction = {
            icon: <UnpinIcon />,
            background: WebApp.themeParams.button_color,
            title: 'Открепить',
            onClick: () => onClickActionWithHide(() => dispatch(unpinList(list.id)))
        }

        const actions: IListAction[] = [];
        if (list.pinIndex) actions.push(unpinAction)
        else actions.push(pinAction)

        // actions.push({
        //     icon: <ArchiveIcon />,
        //     background: WebApp.themeParams.hint_color,
        //     title: 'Архивировать',
        //     onClick: () => console.log('archive')
        // })

        actions.push({
            icon: <TrashIcon />,
            background: WebApp.themeParams.destructive_text_color,
            title: 'Удалить',
            onClick: () => dispatch(removeList(list.id))
        })

        return actions;
    },[dispatch, list])

    return <div className={styles.list_item_container}>
        <Cell
            className={styles.list_item_content}
            style={{
                minWidth: `calc(-${48}px + 100%)`,
                marginLeft: `-${difference}px`,
                transition: 'margin-left 0.3s ease 0s'
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={() => navigate(`list/${list.id}`)}
            key={list.id}
            titleBadge={<Badge type="dot"  />}
            before={<Avatar size={48}/>}
            after={<>
                <Badge type="number">99</Badge>
                {
                    list.pinIndex && <PinIcon/>
                }
            </>}
            description={list.description}
        >
            {list.name} {list.index}
        </Cell>
        <ActionButtons actions={actions} list={list}/>
    </div>
}