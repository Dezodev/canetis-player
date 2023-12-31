import { ActionIcon, AppShell, Box, Group, NavLink, rem, Text, useMantineColorScheme } from '@mantine/core'
import { mdiAutoFix, mdiBookOpenVariant, mdiMagnify, mdiStarOutline, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()

    return (
        <AppShell.Navbar p="md">
            <Box
                style={(theme) => ({
                    paddingLeft: theme.spacing.xs,
                    paddingRight: theme.spacing.xs,
                    paddingBottom: theme.spacing.lg,
                    borderBottom: `${rem(1)} solid ${
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
                })}
            >
                <Group justify="space-between">
                    <Text size="xl" fw={700}>
                        Canetis player
                    </Text>
                    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                        {colorScheme === 'dark' ? (
                            <Icon path={mdiWeatherSunny} size={1} />
                        ) : (
                            <Icon path={mdiWeatherNight} size={1} />
                        )}
                    </ActionIcon>
                </Group>
            </Box>
            <Box mt={30}>
                {MenuLinks.map((link, index) => (
                    <NavLink
                        to={link.link}
                        key={link.key}
                        label={link.label}
                        leftSection={link.icon && <Icon path={link.icon} size={0.7} />}
                        // active={pathname === link.link}
                        onClick={() => navigate(link.link)}
                    />
                ))}
            </Box>
        </AppShell.Navbar>
    )
}

export default AppNavbar
