/// <reference types="long" />
import { ChainNetwork } from '@ixo/cosmos-chain-resolver/types/types/chain';
import { AccountData } from '@cosmjs/proto-signing';
import { StdSignature } from '@cosmjs/amino';
import { WalletKey } from './wallet';
type ImpactsXSignDoc = {
    bodyBytesBase64: string;
    authInfoBytesBase64: string;
    chainId: string;
    accountNumber: Long;
};
type ImpactsXDirectSignResponse = {
    signed: ImpactsXSignDoc;
    signature: StdSignature;
};
type ImpactsXAccountData = AccountData & {
    readonly pubkeyBase64: string;
    readonly pubkey?: Uint8Array;
};
type ImpactsXGetAccounts = (chainId: string) => Promise<ImpactsXAccountData[]>;
type ImpactsXSignDirect = (signerAddress: string, signDoc: any) => Promise<ImpactsXDirectSignResponse>;
export interface ImpactsXWallet {
    version: string;
    enable: (chainNameOrId: string, chainNetwork?: ChainNetwork) => Promise<void>;
    experimentalSuggestChain: (chainInfo: any) => Promise<void>;
    getKey: (chainId: string, includeDid?: boolean) => Promise<ImpactsXKey | undefined>;
    getOfflineSigner: (chainId: string) => {
        getAccounts: ImpactsXGetAccounts;
        signDirect: ImpactsXSignDirect;
    };
    signDirect: ImpactsXSignDirect;
    getAccounts: ImpactsXGetAccounts;
}
export type ImpactsXKey = WalletKey & {
    readonly address?: Uint8Array;
    readonly pubKey?: Uint8Array;
    readonly addressBase64: string;
    readonly pubKeyBase64: string;
};
export {};
