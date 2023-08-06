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
import { mdiAutoFix, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

import { APP_NAME } from '@utils/constants'

const MenuLinks = [
    {
        icon: mdiAutoFix,
        label: 'Découvrir',
        link: '#',
    },
]

const AppNavbar = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    const [activeLink, setActiveLink] = React.useState(0)

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
                            key={link.label}
                            active={false}
                            label={link.label}
                            icon={link.icon && <Icon path={link.icon} size={0.7} />}
                            active={activeLink === index}
                        />
                    ))}
                </Box>
            </Navbar.Section>
            <Navbar.Section></Navbar.Section>
        </Navbar>
    )
}

export default AppNavbar
