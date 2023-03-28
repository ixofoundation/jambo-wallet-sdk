export declare const getOpera: () => {
    opera_eventListener: {
        addMessageListener: any;
        postMessage: any;
        removeMessageListener: any;
    };
    disable: () => Promise<void>;
    enable: (chainNameOrId: string, chainNetwork?: import("@ixo/jambo-chain-sdk/types/types/chain").ChainNetwork) => Promise<void>;
    experimentalSuggestChain: (chainInfo: import("@ixo/jambo-chain-sdk/types/types/chain").KeplrChainInfo) => Promise<void>;
    getKey: (chainId: string, includeDid?: boolean) => Promise<import("./types/opera").OperaKey>;
    getOfflineSigner: (chainId: string) => Promise<import("@cosmjs/proto-signing").OfflineDirectSigner>;
    signDirect: (chainId: string, signDoc: import("cosmjs-types/cosmos/tx/v1beta1/tx").SignDoc) => Promise<import("@cosmjs/proto-signing").DirectSignResponse>;
    __raw__: any;
};
