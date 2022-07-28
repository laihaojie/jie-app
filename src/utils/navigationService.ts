import type { NavigationContainerRef } from '@react-navigation/native'
import React from 'react'
import type { ScreensParamList } from 'src/typings/router'

export const navRef = React.createRef<NavigationContainerRef<any>>()

export function navigate<T extends keyof ScreensParamList>(name: T, params?: ScreensParamList[T]) {
  navRef.current?.navigate({ name, params })
}
export function goBack() {
  return navRef.current?.goBack()
}
