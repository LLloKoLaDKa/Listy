import {Tabbar} from "@telegram-apps/telegram-ui";
import {Icon24QR} from "@telegram-apps/telegram-ui/dist/icons/24/qr";
import {Icon24Channel} from "@telegram-apps/telegram-ui/dist/icons/24/channel";
import {Icon28Stats} from "@telegram-apps/telegram-ui/dist/icons/28/stats";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const tabs = [
        {
            id: 0,
            text: 'Списки',
            Icon: <Icon24QR/>,
            href: '/'
        },
        {
            id: 1,
            text: 'Профиль',
            Icon: <Icon24Channel/>,
            href: '/icons'
        },
        {
            id: 2,
            text: 'Данные',
            Icon: <Icon28Stats/>,
            href: '/data'
        },
    ]

    return <div>
        <div style={{marginBottom: '86px'}}>
            <Outlet/>
        </div>

        <Tabbar>
            {
                tabs.map(({
                    id,
                    text,
                    Icon,
                    href
                }) => <Tabbar.Item
                    key={id}
                    text={text}
                    selected={location.pathname === href}
                    onClick={() => {
                        navigate(href)
                    }}
                >
                    {Icon}
                </Tabbar.Item>)
            }
        </Tabbar>
    </div>
}