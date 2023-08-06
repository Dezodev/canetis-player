import { AppShell, ColorSchemeProvider, Header, MantineProvider, Navbar } from '@mantine/core'
import React from 'react'

import '@assets/css/App.css'

import AppNavbar from '@components/layout/AppNavbar'

function App() {
    const [colorScheme, setColorScheme] = React.useState('dark')
    const toggleColorScheme = React.useCallback(
        (value) => {
            setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
        },
        [colorScheme]
    )

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
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
                    <h1>Bonjour,</h1>
                </AppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default App
