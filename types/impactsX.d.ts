import { DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { ChainNetwork, KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { AccountData } from '@cosmjs/amino';
import { WalletKey } from './types/wallet';
export declare const impactsX_version: string;
export declare const impactsX_enable: (chainNameOrId: string, chainNetwork?: ChainNetwork) => Promise<void>;
export declare const impactsX_experimentalSuggestChain: (chainInfo: KeplrChainInfo) => Promise<void>;
export declare const impactsX_getKey: (chainId: string, includeDid?: boolean) => Promise<WalletKey | undefined>;
export declare const impactsX_getAccounts: (chainId: string) => Promise<AccountData[]>;
export declare const impactsX_signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
/**
 * Only supports sign direct (for now)
 */
export declare const impactsX_getOfflineSigner: (chainId: string) => OfflineDirectSigner;
