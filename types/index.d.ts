export declare const getOpera: () => {
    opera_eventListener: {
        addMessageListener: any;
        postMessage: any;
        removeMessageListener: any;
    };
    enable: (chainNameOrId: string, chainNetwork?: import("@ixo/cosmos-chain-resolver/types/types/chain").ChainNetwork) => Promise<void>;
    experimentalSuggestChain: (chainInfo: import("@ixo/cosmos-chain-resolver/types/types/chain").KeplrChainInfo) => Promise<void>;
    getKey: (chainId: string, includeDid?: boolean) => Promise<import("./types/opera").OperaKey>;
    getOfflineSigner: (chainId: string) => Promise<import("@cosmjs/proto-signing").OfflineDirectSigner>;
    signDirect: (signerAddress: string, signDoc: import("cosmjs-types/cosmos/tx/v1beta1/tx").SignDoc) => Promise<import("@cosmjs/proto-signing").DirectSignResponse>;
    __raw__: any;
};
