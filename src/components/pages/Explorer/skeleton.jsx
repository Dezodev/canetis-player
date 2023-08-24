import { Flex, Grid, SimpleGrid, Skeleton, Title } from '@mantine/core'
import React from 'react'

import BackActionIcon from '@components/BackActionIcon'

import { PAGINATION_LIMIT } from '@utils/constants'

const ExplorerSkeleton = () => {
    return (
        <>
            <Flex align={'center'} mb="xl">
                <BackActionIcon />
                <Title order={1}>Explorer par pays</Title>
            </Flex>

            <SimpleGrid cols={2} spacing="xs">
                {/* Generate country skeleton cards */}
                {new Array(25).fill(1).map((_, index) => (
                    <Skeleton height={58.8} key={index} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default ExplorerSkeleton
