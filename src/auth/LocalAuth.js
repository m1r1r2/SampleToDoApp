/* 
   This module provides two helper functions using Expo LocalAuthentication: 
   1. checkBiometricSupport → checks if biometrics (like Face ID or fingerprint) 
      are available and set up on the device.  
   2. promptBiometric → actually shows the biometric prompt (or PIN/Password fallback) 
      and tells whether the user successfully authenticated. 
*/
import * as LocalAuthentication from 'expo-local-authentication';

/* This function checks the Biometric Authentication like FaceId,FingerPrint,TouchID 
 is available and ready to use */

export async function checkBiometricSupport(){
    const hashardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return{supported : hashardware ,enrolled, types}

}

/*This function ask the user to authentic using Biometric if successful we return success otherwise we return false */
 export async function promptBiometric()
{
      try{
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage :'Authenticate to modify TODOs',
            cancelLabel:'Cancel',
            disableDeviceFallback :false,
        });
        return{success: result.success};

      }
      catch(err)
      {
          return{success : false, error :err.message || 'Auth error'};
      }
}