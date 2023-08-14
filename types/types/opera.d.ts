import { WalletKey } from './wallet';
export interface InterchainWallet {
    getDidDoc: (index: number) => Promise<string>;
    signMessage: (hexSignDoc: string, signMethod: string, addressIndex: number) => Promise<string>;
}
export type OperaKey = WalletKey;
