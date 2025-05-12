import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  { scan, parseScanResponse } from '../../utils/nfcScanner'
import { parsePassportData } from '@/utils/passports/passport_parsing/parsePassportData';


export default function MyPage() {
  const [res, setRes] = useState<any>()

  async function readNdef() {
    const result = await scan({
      passportNumber: 'CHANGEME',
      dateOfBirth: 'YYYY-MM-DD',
      dateOfExpiry: 'YYYY-MM-DD'
    })

    const passportData = parseScanResponse(result)
    // console.log({ passportData })
    const metadata = parsePassportData(passportData)
    console.log({ metadata })

    setRes(result)
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag 11</Text>
      </TouchableOpacity>

      <Text>{ res && JSON.stringify(res) }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});