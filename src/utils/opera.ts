import { OPERA_CHAIN_INFOS_KEY, OPERA_PUB_KEYS_KEY } from '../constants/persistence';
import { getSessionStorage, setSessionStorage } from './persistence';
import { b64_to_uint8Arr, uint8Arr_to_b64 } from './encoding';
import { InterchainWallet, OperaKey } from '../types/opera';

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

export interface OperaInterchain {
	interchain?: InterchainWallet;
}

export const getInterchain = (): InterchainWallet | undefined => {
	if (typeof g !== 'undefined' && g?.interchain) return g.interchain;
	return undefined;
};

export function transformSignature(signature: string): string | undefined {
	const rawArray = b64_to_uint8Arr(signature);
	// TODO: remove console.log
	let signatureCosmjsBase64 = '';
	if (rawArray.length < 64 || rawArray.length > 66) {
		console.log('operahelper.invalid length');
		return;
	} else if (rawArray.length == 64) {
		signatureCosmjsBase64 = signature;
	} else if (rawArray.length == 65) {
		if (rawArray[0] == 0x00) {
			signatureCosmjsBase64 = uint8Arr_to_b64(rawArray.slice(1, 65));
		} else if (rawArray[32] == 0x00) {
			signatureCosmjsBase64 = uint8Arr_to_b64(new Uint8Array([...rawArray.slice(0, 32), ...rawArray.slice(33, 65)]));
		} else {
			console.log('operahelper.invalid signature array, length 65');
		}
	} else if (rawArray.length == 66) {
		if (rawArray[0] == 0x00 && rawArray[33] == 0x00) {
			signatureCosmjsBase64 = uint8Arr_to_b64(new Uint8Array([...rawArray.slice(1, 33), ...rawArray.slice(34, 66)]));
		} else {
			console.log('operahelper.invalid signature array, length 66');
		}
	}
	console.log('operahelper.signatureCosmjsBase64', signatureCosmjsBase64);
	return signatureCosmjsBase64 || undefined;
}

export const getDIDDocJSON = async () => {
	try {
		const opera = getInterchain();
		const didDoc = await opera?.getDidDoc(0);
		// setSessionStorage()
		const didDocJSON = JSON.parse(didDoc ?? '{}');
		return didDocJSON;
	} catch (error) {
		console.error('getDIDDocJSON::', error);
		throw error;
	}
};

export const getBech32PrefixAccAddr = (chainId: string) => {
	const chains = getSessionStorage(OPERA_CHAIN_INFOS_KEY) ?? {};
	const chain = chains[chainId];
	if (!chain) throw new Error(`There is no chain info for ${chainId}`);
	const bech32AccAddrPrefix = chain.bech32Config.bech32PrefixAccAddr;
	return bech32AccAddrPrefix;
};

export const storePubKeys = (chainId: string, key: OperaKey): void => {
	const pubKeys = getSessionStorage(OPERA_PUB_KEYS_KEY) ?? {};
	pubKeys[chainId] = key;
	setSessionStorage(OPERA_PUB_KEYS_KEY, pubKeys);
};

export const retrievePubKeys = (chainId: string): undefined | OperaKey => {
	const pubKeys = getSessionStorage(OPERA_PUB_KEYS_KEY) ?? {};
	const keys = pubKeys[chainId];
	if (!keys) return undefined;
	return keys;
};

export const retrievePubKeysFromAddress = (address: string): undefined | OperaKey => {
	const pubKeys = getSessionStorage(OPERA_PUB_KEYS_KEY) ?? {};
	const keys = Object.values(pubKeys).find((key) => key.bech32Address === address);
	if (!keys) return undefined;
	return keys;
};
