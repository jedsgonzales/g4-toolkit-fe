import { useCallback, useState } from 'react'
// material
import {
    Tooltip
} from '@mui/material'
// icons
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface Props {
    data: string
}

export default function CopyToClipboard({ data }: Props) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = useCallback(async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation() // should be in the first line
        if (data) {
            await navigator.clipboard.writeText(data)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }, [data])

    return copied ? (
        <CheckIcon fontSize='small' />
    ) : (
        <Tooltip title='Copy to Clipboard'>
            <ContentCopyIcon
                onClick={copyToClipboard}
                sx={{ cursor: 'pointer' }}
                fontSize='small'
            />
        </Tooltip>
    )
}
