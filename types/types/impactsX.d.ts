import { ChainNetwork } from '@ixo/cosmos-chain-resolver/types/types/chain';
import { AccountData, DirectSignResponse } from '@cosmjs/proto-signing';
import { SignDoc } from '@keplr-wallet/types';
import { WalletKey } from './wallet';
type ImpactsXSignDoc = SignDoc & {
    bodyBytes: string;
    authInfoBytes: string;
    accountNumber: string;
};
type ImpactsXDirectSignResponse = DirectSignResponse & {
    signed: ImpactsXSignDoc;
};
export type ImpactsXAccountData = AccountData & {
    readonly pubkey: string;
};
type GetAccounts = (chainId: string) => Promise<ImpactsXAccountData[]>;
type SignDirect = (signerAddress: string, signDoc: SignDoc) => Promise<ImpactsXDirectSignResponse>;
export interface ImpactsXWallet {
    version: string;
    enable: (chainNameOrId: string, chainNetwork?: ChainNetwork) => Promise<void>;
    experimentalSuggestChain: (chainInfo: any) => Promise<void>;
    getKey: (chainId: string, includeDid?: boolean) => Promise<ImpactsXKey | undefined>;
    getOfflineSigner: (chainId: string) => {
        getAccounts: GetAccounts;
        signDirect: SignDirect;
    };
    signDirect: SignDirect;
    getAccounts: GetAccounts;
}
export type ImpactsXKey = WalletKey & {
    readonly address?: string;
    readonly pubKey?: string;
};
export {};
