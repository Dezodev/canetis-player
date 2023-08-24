import { AppShell, ColorSchemeProvider, Header, MantineProvider, Navbar } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import '@assets/css/App.css'

import AppNavbar from '@components/layout/AppNavbar'
import Discover from '@components/pages/Discover'
import ExplorerByCountry from '@components/pages/Explorer/ByCountry/index'
import Explorer from '@components/pages/Explorer/index'
import Favorites from '@components/pages/Favorites'
import Search from '@components/pages/Search'

// Create a client
const queryClient = new QueryClient()

function App() {
    const [colorScheme, setColorScheme] = React.useState('dark')
    const toggleColorScheme = React.useCallback(
        (value) => {
            setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
        },
        [colorScheme]
    )

    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
                        <AppShell
                            padding="md"
                            navbar={<AppNavbar />}
                            styles={(theme) => ({
                                main: {
                                    backgroundColor:
                                        theme.colorScheme === 'dark'
                                            ? theme.colors.dark[9]
                                            : theme.colors.gray[0],
                                },
                            })}
                        >
                            <Routes>
                                <Route exact path="/" element={<Discover />} />
                                <Route exact path="/explorer" element={<Explorer />} />
                                <Route
                                    exact
                                    path="/explorer/c/:code"
                                    element={<ExplorerByCountry />}
                                />
                                <Route exact path="/search" element={<Search />} />
                                <Route exact path="/favorites" element={<Favorites />} />
                            </Routes>
                        </AppShell>
                    </MantineProvider>
                </ColorSchemeProvider>
            </HashRouter>
        </QueryClientProvider>
    )
}

export default App
