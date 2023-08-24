import { ActionIcon } from '@mantine/core'
import { mdiArrowLeft } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackActionIcon = ({}) => {
    const navigate = useNavigate()

    const onBackClick = React.useCallback(() => {
        navigate(-1)
    })

    return (
        <ActionIcon variant="default" mr="lg" onClick={() => onBackClick()}>
            <Icon path={mdiArrowLeft} size={0.85} />
        </ActionIcon>
    )
}

export default BackActionIcon
