import {
    //IconButton,
    Tooltip
  } from '@mui/material'
  // icons
  import CheckIcon from '@mui/icons-material/Check'
  import ContentCopyIcon from '@mui/icons-material/ContentCopy'
  import { useCallback, useState } from 'react'
  
  export default function CopyToClipboard({ data, sx }: any) {
    const [copied, setCopied] = useState(false)
  
    const copyToClipboard = useCallback(async (e: any) => {
      e.stopPropagation() // should be in the first line
      if (data) {
        await navigator.clipboard.writeText(data)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }, [data])
  
    return copied ? (
      <CheckIcon sx={{ ...sx }} fontSize='small' />
    ) : (
      <Tooltip title='Copy to Clipboard'>
        <ContentCopyIcon
          onClick={copyToClipboard}
          sx={{ cursor: 'pointer', ...sx }}
          fontSize='small'
        />
      </Tooltip>
    )
  }
  