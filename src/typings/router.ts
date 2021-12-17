import { TabParamList } from '../router/Rooter';
import React from 'react';
import { MainStackParamList } from 'src/router/routes';

export type ScreensParamList = MainStackParamList & TabParamList

export interface RouteProps {
  name: string,
  component: React.FC<any>
}





