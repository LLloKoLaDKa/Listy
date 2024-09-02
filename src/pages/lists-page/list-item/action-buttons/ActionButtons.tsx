import styles from './ActionButtons.module.scss'
import List from "models/store/List.ts";
import {Caption} from "@telegram-apps/telegram-ui";

export interface IListAction {
    icon: JSX.Element,
    background: string,
    title: string,
    onClick: () => void
}

interface IProps {
    actions: IListAction[],
    list: List
}

export const ActionButtons = ({actions, list}:IProps) => {
    return <div className={styles.actions_container}>
        {actions.map((action, index) => <div
            key={index}
            style={{
                background: action.background
            }}
            className={styles.action_container}
            onClick={action.onClick}
        >
            {action.icon}
            <Caption>{action.title}</Caption>
        </div>)}
    </div>
}