import { Flex, Grid, Paper, SimpleGrid, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom'

import BackActionIcon from '@components/BackActionIcon'

import { getCountriesQuery } from '@utils/api'

import ExplorerSkeleton from './skeleton'

const Explorer = () => {
    const {
        data: countriesList,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountriesQuery,
    })

    if (isLoading) {
        return <ExplorerSkeleton />
    }

    return (
        <>
            <Flex align={'center'} mb="xl">
                <BackActionIcon />
                <Title order={1}>Explorer par pays</Title>
            </Flex>

            <SimpleGrid cols={2} spacing="xs">
                {countriesList.length > 0 &&
                    countriesList.map((country) => (
                        <Link to={`/explorer/c/${country.iso_3166_1}`}>
                            <Paper
                                key={`${country.name}-${country.iso_3166_1}`}
                                radius="md"
                                p="md"
                                withBorder
                            >
                                <Flex align="center" wrap="nowrap">
                                    <div style={{ marginRight: 10 }}>
                                        <ReactCountryFlag
                                            countryCode={country.iso_3166_1}
                                            style={{
                                                width: 'auto',
                                                height: '24px',
                                            }}
                                            svg
                                        />
                                    </div>
                                    <div>
                                        {country.name} ({country.stationcount})
                                    </div>
                                </Flex>
                            </Paper>
                        </Link>
                    ))}
            </SimpleGrid>
        </>
    )
}

export default Explorer
