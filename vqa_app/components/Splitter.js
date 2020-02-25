import React from 'react'
import {View, StyleSheet} from 'react-native'

const Splitter = props => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
line: {
  borderColor: '#ccc',
  borderBottomWidth: 0.5,
  marginVertical: 15
}
})

export default Splitter