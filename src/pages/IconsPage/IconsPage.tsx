import {Card} from "@telegram-apps/telegram-ui";
import {CardCell} from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import {
    DefaultIcon
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/icons/arrow";

import styles from './IconsPage.module.css'
import React, {useMemo} from "react";
import {Icon12Quote} from "@telegram-apps/telegram-ui/dist/icons/12/quote";
import {Icon20Copy} from "@telegram-apps/telegram-ui/dist/icons/20/copy";
import {Icon20Select} from "@telegram-apps/telegram-ui/dist/icons/20/select";
import {Icon20ChevronDown} from "@telegram-apps/telegram-ui/dist/icons/20/chevron_down";
import {Icon20QuestionMark} from "@telegram-apps/telegram-ui/dist/icons/20/question_mark";
import {Icon20SelectIOS} from "@telegram-apps/telegram-ui/dist/icons/20/select_ios";
import {Icon24QR} from "@telegram-apps/telegram-ui/dist/icons/24/qr";
import {Icon24Channel} from "@telegram-apps/telegram-ui/dist/icons/24/channel";
import {Icon24Cancel} from "@telegram-apps/telegram-ui/dist/icons/24/cancel";
import {Icon16Cancel} from "@telegram-apps/telegram-ui/dist/icons/16/cancel";
import {Icon16Chevron} from "@telegram-apps/telegram-ui/dist/icons/16/chevron";
import {Icon24Chat} from "@telegram-apps/telegram-ui/dist/icons/24/chat";
import {Icon24Notifications} from "@telegram-apps/telegram-ui/dist/icons/24/notifications";
import {Icon24ChevronDown} from "@telegram-apps/telegram-ui/dist/icons/24/chevron_down";
import {Icon24ChevronLeft} from "@telegram-apps/telegram-ui/dist/icons/24/chevron_left";
import {Icon24ChevronRight} from "@telegram-apps/telegram-ui/dist/icons/24/chevron_right";
import {Icon24PersonRemove} from "@telegram-apps/telegram-ui/dist/icons/24/person_remove";
import {Icon24Close} from "@telegram-apps/telegram-ui/dist/icons/24/close";
import {Icon24SunLow} from "@telegram-apps/telegram-ui/dist/icons/24/sun_low";
import {Icon28Attach} from "@telegram-apps/telegram-ui/dist/icons/28/attach";
import {Icon28Archive} from "@telegram-apps/telegram-ui/dist/icons/28/archive";
import {Icon28Chat} from "@telegram-apps/telegram-ui/dist/icons/28/chat";
import {Icon28AddCircle} from "@telegram-apps/telegram-ui/dist/icons/28/add_circle";
import {Icon28Edit} from "@telegram-apps/telegram-ui/dist/icons/28/edit";
import {Icon28Close} from "@telegram-apps/telegram-ui/dist/icons/28/close";
import {Icon28CloseAmbient} from "@telegram-apps/telegram-ui/dist/icons/28/close_ambient";
import {Icon28Devices} from "@telegram-apps/telegram-ui/dist/icons/28/devices";
import {Icon28Heart} from "@telegram-apps/telegram-ui/dist/icons/28/heart";
import {Icon28Stats} from "@telegram-apps/telegram-ui/dist/icons/28/stats";
import {Icon32ProfileColoredSquare} from "@telegram-apps/telegram-ui/dist/icons/32/profile_colored_square";
import {Icon36Backspace} from "@telegram-apps/telegram-ui/dist/icons/36/backspace";

export default function IconsPage() {
    const icons = useMemo(()=> {
        return [
            {
                icon: <Icon12Quote/>,
                text: 'Quote | цитата'
            },
            {
                icon: <Icon16Cancel/>,
                text: 'Cancel | Отмена'
            },
            {
                icon: <Icon16Chevron/>,
                text: 'Chevron | Шеврон'
            },
            {
                icon: <Icon20Copy/>,
                text: 'Copy | копировать'
            },
            {
                icon: <Icon20Select/>,
                text: 'Select | Выбрать'
            },
            {
                icon: <Icon20SelectIOS/>,
                text: 'Select IOS'
            },
            {
                icon: <Icon20ChevronDown/>,
                text: 'ChevronDown | Вниз'
            },
            {
                icon: <Icon20QuestionMark/>,
                text: 'Question | Вопрос'
            },
            {
                icon: <Icon24QR/>,
                text: 'QR | QR-код'
            },
            {
                icon: <Icon24Channel/>,
                text: 'Channel | Канал'
            },
            {
                icon: <Icon24Cancel/>,
                text: 'Cancel | Отменить'
            },
            {
                icon: <Icon24Chat/>,
                text: 'Chat | Чат'
            },
            {
                icon: <Icon24Notifications/>,
                text: 'Notifications'
            },
            {
                icon: <Icon24ChevronDown/>,
                text: 'ChevronDown'
            },
            {
                icon: <Icon24ChevronLeft/>,
                text: 'ChevronLeft'
            },
            {
                icon: <Icon24ChevronRight/>,
                text: 'ChevronRight'
            },
            {
                icon: <Icon24Close/>,
                text: 'Close'
            },
            {
                icon: <Icon24PersonRemove/>,
                text: 'PersonRemove'
            },
            {
                icon: <Icon24SunLow/>,
                text: 'SunLow'
            },
            {
                icon: <Icon28Attach/>,
                text: 'Attach'
            },
            {
                icon: <Icon28Archive/>,
                text: 'Archive'
            },
            {
                icon: <Icon28Chat/>,
                text: 'Chat'
            },
            {
                icon: <Icon28AddCircle/>,
                text: 'AddCircle'
            },
            {
                icon: <Icon28Edit/>,
                text: 'Edit'
            },
            {
                icon: <Icon28Close/>,
                text: 'Close'
            },
            {
                icon: <Icon28CloseAmbient/>,
                text: 'CloseAmbient'
            },
            {
                icon: <Icon28Devices/>,
                text: 'Devices'
            },
            {
                icon: <Icon28Heart/>,
                text: 'Devices'
            },
            {
                icon: <Icon28Stats/>,
                text: 'Stats'
            },
            {
                icon: <Icon32ProfileColoredSquare/>,
                text: 'ProfileColoredSquare'
            },
            {
                icon: <Icon36Backspace/>,
                text: 'Backspace'
            },
        ]
    }, [])

    return <div className={styles.cards}>
        {
            icons.map((x, index) => <Card
                key={index}
                type="plain"
                className={styles.icon_card}
            >
                <>
                    <div className={styles.icon}>
                        {x.icon}
                    </div>

                    <CardCell subtitle={x.text}/>
                </>
            </Card>)
        }
    </div>
}