import {Button, Placeholder} from "@telegram-apps/telegram-ui";
import styles from './Lists.module.css'
import {Icon28AddCircle} from "@telegram-apps/telegram-ui/dist/icons/28/add_circle";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";

export default function ListsPage() {
    const navigate = useNavigate();

    const placeholderActionButton = useMemo(() => {
        return <Button before={<Icon28AddCircle/>} onClick={() => navigate('/add')}>
            Создать список
        </Button>
    }, [])

    return <>
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
    </>
}