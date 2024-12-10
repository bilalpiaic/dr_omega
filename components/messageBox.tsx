import React from 'react'
import { Card, CardContent } from './ui/card'

type Props = {
    role: string,
    content: string
}

const MessageBox = ({role,content}: Props) => {
  return (
    <Card>
        <CardContent>
            {content}
        </CardContent>
    </Card>
  )
}

export default MessageBox