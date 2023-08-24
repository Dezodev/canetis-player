import { Flex, Grid, SimpleGrid, Skeleton } from '@mantine/core'
import React from 'react'

import BackActionIcon from '@components/BackActionIcon'

import { PAGINATION_LIMIT } from '@utils/constants'

export const ExplorerByCountryRadiosSkeleton = () => {
    return (
        <SimpleGrid cols={2} spacing="xs" mb="xl">
            {/* Generate radios skeleton cards */}
            {new Array(PAGINATION_LIMIT.radios).fill(1).map((_, index) => (
                <Skeleton height={84} key={index} />
            ))}
        </SimpleGrid>
    )
}

export const ExplorerByCountrySkeleton = () => {
    return (
        <>
            <Flex align="center" mb="xl">
                <BackActionIcon />
                <Skeleton height={50} width={67} />
                <Skeleton height={20} width={200} ml="xl" />
            </Flex>

            <Skeleton height={42} mb="xl" />

            <ExplorerByCountryRadiosSkeleton />

            <Skeleton height={32} width={288} mb="xl" mx="auto" />
        </>
    )
}
