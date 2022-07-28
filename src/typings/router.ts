import type React from 'react'
import type { MainStackParamList } from 'src/router/routes'
import type { TabParamList } from '../router/Rooter'

export type ScreensParamList = MainStackParamList & TabParamList

export interface RouteProps {
  name: string
  component: React.FC<any>
}

