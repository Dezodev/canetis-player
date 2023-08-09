import {
    ActionIcon,
    Box,
    Group,
    NavLink,
    Navbar,
    ScrollArea,
    Text,
    rem,
    useMantineColorScheme,
} from '@mantine/core'
import {
    mdiAutoFix,
    mdiBookOpenVariant,
    mdiMagnify,
    mdiStarOutline,
    mdiWeatherNight,
    mdiWeatherSunny,
} from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link, useNavigate, useResolvedPath } from 'react-router-dom'

import { APP_NAME } from '@utils/constants'

const MenuLinks = [
    {
        icon: mdiAutoFix,
        key: 'discover',
        label: 'Découvrir',
        link: '/',
    },
    {
        icon: mdiBookOpenVariant,
        key: 'explorer',
        label: 'Explorer',
        link: '/explorer',
    },
    {
        icon: mdiMagnify,
        key: 'search',
        label: 'Rechercher',
        link: '/search',
    },
    {
        icon: mdiStarOutline,
        key: 'favorites',
        label: 'Favoris',
        link: '/favorites',
    },
]

const AppNavbar = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const { pathname } = useResolvedPath()

    const [activeLink, setActiveLink] = React.useState(0)

    React.useEffect(() => {
        console.log('-- AppNavbar >> pathname', pathname)
    }, [pathname])

    return (
        <Navbar p="xs" width={{ base: 300 }}>
            <Navbar.Section mt="xs">
                <Box
                    sx={(theme) => ({
                        paddingLeft: theme.spacing.xs,
                        paddingRight: theme.spacing.xs,
                        paddingBottom: theme.spacing.lg,
                        borderBottom: `${rem(1)} solid ${
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[4]
                                : theme.colors.gray[2]
                        }`,
                    })}
                >
                    <Group position="apart">
                        <Text weight={500}>{APP_NAME}</Text>
                        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                            {colorScheme === 'dark' ? (
                                <Icon path={mdiWeatherSunny} size={1} />
                            ) : (
                                <Icon path={mdiWeatherNight} size={1} />
                            )}
                        </ActionIcon>
                    </Group>
                </Box>
            </Navbar.Section>
            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <Box py="md">
                    {MenuLinks.map((link, index) => (
                        <NavLink
                            component={Link}
                            to={link.link}
                            key={link.key}
                            label={link.label}
                            icon={link.icon && <Icon path={link.icon} size={0.7} />}
                            active={pathname === link.link}
                        />
                    ))}
                </Box>
            </Navbar.Section>
            <Navbar.Section></Navbar.Section>
        </Navbar>
    )
}

export default AppNavbar
