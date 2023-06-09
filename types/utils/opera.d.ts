import { InterchainWallet, OperaKey } from '../types/opera';
export interface OperaInterchain {
    interchain?: InterchainWallet;
}
export declare const getInterchain: () => InterchainWallet | undefined;
export declare function transformSignature(signature: string): string | undefined;
export declare const getDIDDocJSON: () => Promise<any>;
export declare const getBech32PrefixAccAddr: (chainId: string) => any;
export declare const storePubKeys: (chainId: string, key: OperaKey) => void;
export declare const retrievePubKeys: (chainId: string) => undefined | OperaKey;
export declare const retrievePubKeysFromAddress: (address: string) => undefined | OperaKey;
