import { StyleSheet, LogBox } from 'react-native'
import React from 'react'
import MainStack from './Navigation/MainStack'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <>
      <MainStack />
    </>
  )
}

export default App

const styles = StyleSheet.create({})