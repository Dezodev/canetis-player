import {
    ActionIcon,
    Button,
    Flex,
    Image,
    Pagination,
    Paper,
    SimpleGrid,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { mdiArrowLeft, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Link, useParams } from 'react-router-dom'

import BackActionIcon from '@components/BackActionIcon'
import RadioCard from '@components/card/Radio'

import { getCountryQuery, getRadiosByCountryQuery } from '@utils/api'
import { PAGINATION_LIMIT } from '@utils/constants'

import { ExplorerByCountryRadiosSkeleton, ExplorerByCountrySkeleton } from './skeleton'

const ExplorerByCountry = (params) => {
    const [activePage, setPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(1)
    const [search, setSearch] = React.useState(null)

    // Get country code in url
    const { code: countryCode } = useParams()

    // Get country data
    const {
        data: country,
        isLoading: isCountryLoading,
        error: countryError,
    } = useQuery({
        queryKey: ['country', countryCode],
        queryFn: getCountryQuery,
    })

    // Get radios list
    const {
        data: radios,
        isLoading: isRadiosLoading,
        error: radiosError,
    } = useQuery({
        queryKey: [
            'radios',
            countryCode,
            {
                page: activePage,
                search: search,
            },
        ],
        queryFn: getRadiosByCountryQuery,
    })

    // On search change (debounced), save search and reset page
    const onDebouncedSearch = React.useCallback(
        _.debounce((value) => {
            setSearch(value)
            setPage(1)
        }, 500)
    )

    // Radio list render
    const renderRadios = React.useMemo(() => {
        if (isRadiosLoading) {
            return <ExplorerByCountryRadiosSkeleton />
        }

        // Calculate the number of pages
        setTotalPage(Math.ceil(radios.count / PAGINATION_LIMIT.radios))

        if (_.isEmpty(radios.list)) {
            return <Text align="center">Aucun résultat</Text>
        }

        return (
            <SimpleGrid cols={2} spacing="xs" mb="xl">
                {radios.list.map((radio) => (
                    <RadioCard radio={radio} key={`rd-${radio.stationuuid}`} />
                ))}
            </SimpleGrid>
        )
    }, [radios, isRadiosLoading])

    if (isCountryLoading) {
        return <ExplorerByCountrySkeleton />
    }

    return (
        <>
            <Flex align={'center'} mb="xl">
                <BackActionIcon />
                <ReactCountryFlag
                    countryCode={country.iso_3166_1}
                    style={{
                        width: 'auto',
                        height: '50px',
                    }}
                    svg
                />
                <Title order={1} ml="md">
                    {country.name}
                </Title>
            </Flex>

            <TextInput
                placeholder="Rechercher..."
                aria-label="Rechercher"
                size="md"
                mb="xl"
                icon={<Icon path={mdiMagnify} size={0.85} />}
                onChange={(e) => onDebouncedSearch(e.target.value)}
            />

            {renderRadios}

            <Pagination value={activePage} onChange={setPage} total={totalPage} position="center" />
        </>
    )
}

export default ExplorerByCountry
