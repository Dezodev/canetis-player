import { AppShell, Burger } from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import AppNavbar from './components/layout/AppNavbar'

const App = () => {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme } = useMantineColorScheme()

    return (
        <AppShell
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
                },
            })}
        >
            <AppNavbar />

            <AppShell.Main>
                <h1>Welcome</h1>
            </AppShell.Main>
        </AppShell>
    )
}

export default App
