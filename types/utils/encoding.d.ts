import { AccountData, SignDoc } from '@keplr-wallet/types';
import { ImpactsXAccountData, ImpactsXKey } from '../types/impactsX';
import { WalletKey } from '../types/wallet';
export declare const b58_to_uint8Arr: (str: string) => Uint8Array;
export declare const b64_to_uint8Arr: (str: string) => Uint8Array;
export declare const uint8Arr_to_b64: (array: Uint8Array) => string;
export declare const decode_bech32: (str: string) => number[];
export declare const convert_bits: (data: number[], fromBits: number, toBits: number, pad: boolean) => Uint8Array;
export declare const uint8Arr_to_hex: (array: Uint8Array) => string;
export declare const hex_to_uint8Arr: (str: string) => Uint8Array;
export declare const stringifyAccountData: (accountData: AccountData) => ImpactsXAccountData;
export declare const parseAccountData: (accountData: ImpactsXAccountData) => AccountData;
export declare const stringifyKey: (key: WalletKey) => ImpactsXKey;
export declare const parseKey: (key: ImpactsXKey) => WalletKey;
export declare const stringifySignDoc: (signDoc: SignDoc) => SignDoc & {
    bodyBytes: string;
    authInfoBytes: string;
    accountNumber: string;
};
export declare const parseSignDoc: (signDoc: SignDoc & {
    bodyBytes: string;
    authInfoBytes: string;
    accountNumber: string;
}) => SignDoc;
