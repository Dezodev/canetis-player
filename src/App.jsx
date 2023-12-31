import AppNavbar from '@/components/layout/AppNavbar'
import { AppShell, Burger } from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Discover from './pages/discover'
import Explorer from './pages/explorer'
import Favorites from './pages/favorites'
import Search from './pages/search'

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
            <HashRouter basename="/">
                <AppNavbar />

                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<Discover />} />
                        <Route path="/explorer" element={<Explorer />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </AppShell.Main>
            </HashRouter>
        </AppShell>
    )
}

export default App
