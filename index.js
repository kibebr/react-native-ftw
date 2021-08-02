/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './lib/root.tsx'
import { name as appName } from './app.json'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['color', 'lineHeight', 'inline function'])

AppRegistry.registerComponent(appName, () => App);
