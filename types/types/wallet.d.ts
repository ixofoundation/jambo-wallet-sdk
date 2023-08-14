import { Key } from '@keplr-wallet/types';
export type WalletKey = Key & {
    readonly did?: string;
};
