import {Section, Cell, Image, List, Tabbar, FixedLayout} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import tonSvg from './ton.svg';
import React, {useMemo, useState} from "react";
import {Icon24QR} from "@telegram-apps/telegram-ui/dist/icons/24/qr";
import {Icon24Channel} from "@telegram-apps/telegram-ui/dist/icons/24/channel";
import ListsPage from "@/pages/ListsPage/ListsPage.tsx";
import IconsPage from "@/pages/IconsPage/IconsPage.tsx";
import {Icon28Stats} from "@telegram-apps/telegram-ui/dist/icons/28/stats";

const tabs = [
    {
        id: 0,
        text: 'Списки',
        Icon: <Icon24QR/>
    },
    {
        id: 1,
        text: 'Профиль',
        Icon: <Icon24Channel/>
    },
    {
        id: 2,
        text: 'Данные',
        Icon: <Icon28Stats/>
    },
]

export const IndexPage: FC = () => {
    const [currentTab, setCurrentTab] = useState(tabs[0].id);

    const renderTabContent = useMemo(() => {
        switch (currentTab) {
            case 0: return <ListsPage/>
            case 1: return <IconsPage/>
            case 2: return <>
                <List>
                    <Section
                        header='Features'
                        footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
                    >
                        <Link to='/ton-connect'>
                            <Cell
                                before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
                                subtitle='Connect your TON wallet'
                            >
                                TON Connect
                            </Cell>
                        </Link>
                    </Section>
                    <Section
                        header='Application Launch Data'
                        footer='These pages help developer to learn more about current launch information'
                    >
                        <Link to='/init-data'>
                            <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
                        </Link>
                        <Link to='/launch-params'>
                            <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
                        </Link>
                        <Link to='/theme-params'>
                            <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
                        </Link>
                    </Section>
                </List>
            </>

            default: <></>
        }
    }, [currentTab])

    return <>
            {renderTabContent}
        <FixedLayout>
            <Tabbar>
                {
                    tabs.map(({
                       id,
                       text,
                       Icon
                    }) => <Tabbar.Item
                        key={id}
                        text={text}
                        selected={id === currentTab}
                        onClick={() => setCurrentTab(id)}

                    >
                        {Icon}
                    </Tabbar.Item>)
                }
            </Tabbar>
        </FixedLayout>
    </>
};
