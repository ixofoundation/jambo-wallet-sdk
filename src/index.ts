import {
	impactsX_enable,
	impactsX_experimentalSuggestChain,
	impactsX_getKey,
	impactsX_getOfflineSigner,
	impactsX_signDirect,
	impactsX_version,
} from './impactsX';
import {
	opera_eventListener,
	opera_enable,
	opera_experimentalSuggestChain,
	opera_getKey,
	opera_getOfflineSigner,
	opera_signDirect,
} from './opera';

declare const window: any;
declare const global: any;
declare const globalThis: any;
const g =
	typeof globalThis === 'object'
		? globalThis
		: typeof window === 'object'
		? window
		: typeof global === 'object'
		? global
		: null;

const impactsX = {
	// defaultOptions: {}
	// enigmaUtils: Map(0) {size: 0}
	// mode: "extension"
	// parseMessage: undefined
	version: impactsX_version,
	// changeKeyRingName: ƒ ()
	enable: impactsX_enable,
	// enigmaDecrypt: ƒ ()
	// enigmaEncrypt: ƒ ()
	// experimentalSignEIP712CosmosTx_v0: ƒ ()
	experimentalSuggestChain: impactsX_experimentalSuggestChain,
	// getChainInfosWithoutEndpoints: ƒ ()
	// getEnigmaPubKey: ƒ ()
	// getEnigmaTxEncryptionKey: ƒ ()
	// getEnigmaUtils: ƒ ()
	getKey: impactsX_getKey,
	getOfflineSigner: impactsX_getOfflineSigner,
	// getOfflineSignerAuto: ƒ ()
	// getOfflineSignerOnlyAmino: ƒ ()
	// getSecret20ViewingKey: ƒ ()
	// requestMethod: ƒ ()
	// sendTx: ƒ ()
	// signAmino: ƒ ()
	// signArbitrary: ƒ ()
	signDirect: impactsX_signDirect,
	// signEthereum: ƒ ()
	// signICNSAdr36: ƒ ()
	// suggestToken: ƒ ()
	// verifyArbitrary: ƒ ()
	// __core__getAnalyticsId: ƒ ()
	__raw__: g.impactsX,
};

export const getImpactsX = () => {
	if (typeof g !== 'undefined' && g?.impactsX) return impactsX;
	return undefined;
};

const opera = {
	// defaultOptions: {}
	// enigmaUtils: Map(0) {size: 0}
	opera_eventListener: opera_eventListener,
	// mode: "extension"
	// parseMessage: undefined
	// version: "0.11.49"
	// changeKeyRingName: ƒ ()
	enable: opera_enable,
	// enigmaDecrypt: ƒ ()
	// enigmaEncrypt: ƒ ()
	// experimentalSignEIP712CosmosTx_v0: ƒ ()
	experimentalSuggestChain: opera_experimentalSuggestChain,
	// getChainInfosWithoutEndpoints: ƒ ()
	// getEnigmaPubKey: ƒ ()
	// getEnigmaTxEncryptionKey: ƒ ()
	// getEnigmaUtils: ƒ ()
	getKey: opera_getKey,
	getOfflineSigner: opera_getOfflineSigner,
	// getOfflineSignerAuto: ƒ ()
	// getOfflineSignerOnlyAmino: ƒ ()
	// getSecret20ViewingKey: ƒ ()
	// requestMethod: ƒ ()
	// sendTx: ƒ ()
	// signAmino: ƒ ()
	// signArbitrary: ƒ ()
	signDirect: opera_signDirect,
	// signEthereum: ƒ ()
	// signICNSAdr36: ƒ ()
	// suggestToken: ƒ ()
	// verifyArbitrary: ƒ ()
	// __core__getAnalyticsId: ƒ ()
	__raw__: g.interchain,
};

export const getOpera = () => {
	if (typeof g !== 'undefined' && g?.interchain) return opera;
	return undefined;
};
