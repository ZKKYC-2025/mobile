import {
  NativeModules,
  Platform,
  //@ts-ignore
  DeviceEventEmitter
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-nfc-passport-reader' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NfcPassportReaderNativeModule = NativeModules.NfcPassportReader
  ? NativeModules.NfcPassportReader
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

  
// enum NfcPassportReaderEvent {
//   TAG_DISCOVERED = 'onTagDiscovered',
//   NFC_STATE_CHANGED = 'onNfcStateChanged',
// }

export type StartReadingParams = {
  bacKey: {
    documentNo: string;
    expiryDate: string;
    birthDate: string;
  };
  includeImages?: boolean; // default: false
};

export type NfcResult = {
  dateOfBirth: string;
  placeOfBirth?: string;
  documentNumber: string;
  documentExpiryDate: string;
  firstName: string;
  gender: string;
  personalNumber?: string;
  lastName: string;
  passportMRZ: string;
  nationality: string;
  // additional fields
  documentType: string;
  documentSubType: string;
  issuingAuthority: string;
  residenceAddress: string;
  phoneNumber: string;
  documentSigningCertificate?: string;
  countrySigningCertificate?: string;
  dataGroupHashes?: string;
  photo?: string; // base64
};

export default class NfcPassportReader {
  static startReading(params: StartReadingParams): Promise<NfcResult> {
    if (Platform.OS === 'android') {
      throw new Error('Unsupported platform');
    }

    const { documentNo, birthDate, expiryDate } = params.bacKey

    return NfcPassportReaderNativeModule.scanPassport(documentNo, birthDate, expiryDate);
  }

  // static stopReading() {
  //   if (Platform.OS === 'android') {
  //     //NfcPassportReaderNativeModule.stopReading();
  //     throw new Error('Unsupported platform');
  //   } else {
  //     throw new Error('Unsupported platform');
  //   }
  // }

  // //@ts-ignore
  // static addOnTagDiscoveredListener(callback: () => void) {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //     // this.addListener(NfcPassportReaderEvent.TAG_DISCOVERED, callback);
  //   }
  // }

  // //@ts-ignore
  // static addOnNfcStateChangedListener(callback: (state: 'off' | 'on') => void) {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //     //this.addListener(NfcPassportReaderEvent.NFC_STATE_CHANGED, callback);
  //   }
  // }

  // static isNfcEnabled(): Promise<boolean> {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //     //return NfcPassportReaderNativeModule.isNfcEnabled();
  //   } else if (Platform.OS === 'ios') {
  //     return NfcPassportReaderNativeModule.isNfcSupported();
  //   } else {
  //     throw new Error('Unsupported platform');
  //   }
  // }

  // static isNfcSupported(): Promise<boolean> {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //   }

  //   return NfcPassportReaderNativeModule.isNfcSupported();
  // }

  // static openNfcSettings(): Promise<boolean> {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //     // return NfcPassportReaderNativeModule.openNfcSettings();
  //   } else {
  //     throw new Error('Unsupported platform');
  //   }
  // }

  // //@ts-ignore
  // private static addListener(
  //   //@ts-ignore
  //   event: NfcPassportReaderEvent,
  //   //@ts-ignore
  //   callback: (data: any) => void
  // ) {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //   //DeviceEventEmitter.addListener(event, callback);
  //   }
  // }

  // static removeListeners() {
  //   if (Platform.OS === 'android') {
  //     throw new Error('Unsupported platform');
  //     // DeviceEventEmitter.removeAllListeners(
  //     //   NfcPassportReaderEvent.TAG_DISCOVERED
  //     // );
  //     // DeviceEventEmitter.removeAllListeners(
  //     //   NfcPassportReaderEvent.NFC_STATE_CHANGED
  //     // );
  //   }
  // }
}
