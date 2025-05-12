// #import <Foundation/Foundation.h>
// #import <React/RCTBridgeModule.h>
// #import <React/RCTEventEmitter.h>

// @interface RCT_EXTERN_MODULE (NfcPassportReader, NSObject)

// RCT_EXTERN_METHOD(startReading
//                   : (NSDictionary *)args resolver
//                   : (RCTPromiseResolveBlock)resolve rejecter
//                   : (RCTPromiseRejectBlock)reject)

// RCT_EXTERN_METHOD(isNfcSupported
//                   : (RCTPromiseResolveBlock)resolve rejecter
//                   : (RCTPromiseRejectBlock)reject)

// + (BOOL)requiresMainQueueSetup {
//   return NO;
// }

// @end

//
//  PassportReader.m
//  OpenPassport
//
//  Created by Y E on 27/07/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NfcPassportReader, NSObject)

RCT_EXTERN_METHOD(scanPassport:(NSString *)passportNumber
                  dateOfBirth:(NSString *)dateOfBirth
                  dateOfExpiry:(NSString *)dateOfExpiry
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end