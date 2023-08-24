import { ActionIcon, Button, Flex, Image, Paper, SimpleGrid } from '@mantine/core'
import { mdiInformation, mdiInformationOutline, mdiMagnify, mdiPlay, mdiRadio } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link } from 'react-router-dom'

const RadioCard = ({ radio }) => {
    return (
        <Paper radius="md" p="md" withBorder>
            <Flex align="center" wrap="nowrap">
                <div style={{ marginRight: 10 }}>
                    <Image
                        width={50}
                        height={50}
                        fit="contain"
                        src={radio.favicon || null}
                        radius="md"
                        withPlaceholder
                        placeholder={<Icon path={mdiRadio} size={1.2} />}
                    />
                </div>
                <div>{radio.name}</div>
                <div style={{ marginLeft: 'auto' }}>
                    <SimpleGrid cols={2} spacing="xs">
                        <ActionIcon variant="outline">
                            <Icon path={mdiInformationOutline} size={0.85} />
                        </ActionIcon>
                        <ActionIcon variant="outline">
                            <Icon path={mdiPlay} size={0.85} />
                        </ActionIcon>
                    </SimpleGrid>
                </div>
            </Flex>
        </Paper>
    )
}

export default RadioCard
