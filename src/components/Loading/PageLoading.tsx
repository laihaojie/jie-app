import React from 'react'

import type { ViewProps } from 'react-native'
import { ActivityIndicator, View } from 'react-native'

interface IProps {
  show: boolean
}

export default function PageLoading({ show, children }: IProps & ViewProps) {
  const [empty, setEmpty] = React.useState(false)

  React.useEffect(() => {
    let i
    if (show) {
      i = setInterval(() => {
        if (show)
          setEmpty(true)
      }, 3000)
    }
    return () => clearInterval(i)
  }, [])

  return (
    <>
      {
        show
          ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
              !empty && <ActivityIndicator color="#55C1F0" size="large" />
            }
          </View>
          : children
      }
    </>

  )
}
