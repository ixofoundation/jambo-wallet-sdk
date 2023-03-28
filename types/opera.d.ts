import { DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { ChainNetwork, KeplrChainInfo } from '@ixo/jambo-chain-sdk/types/types/chain';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { OperaKey } from './types/opera';
export declare const opera_eventListener: {
    addMessageListener: any;
    postMessage: any;
    removeMessageListener: any;
};
export declare const opera_disable: () => Promise<void>;
export declare const opera_enable: (chainNameOrId: string, chainNetwork?: ChainNetwork) => Promise<void>;
export declare const opera_experimentalSuggestChain: (chainInfo: KeplrChainInfo) => Promise<void>;
export declare const opera_getKey: (chainId: string, includeDid?: boolean) => Promise<OperaKey | undefined>;
/**
 * Only supports sign direct (for now)
 */
export declare const opera_getOfflineSigner: (chainId: string) => Promise<OfflineDirectSigner | null>;
export declare const opera_signDirect: (chainId: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
