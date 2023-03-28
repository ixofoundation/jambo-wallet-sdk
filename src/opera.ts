import { DirectSignResponse, makeSignBytes, OfflineDirectSigner, AccountData, Algo } from '@cosmjs/proto-signing';
import { ChainNetwork, KeplrChainInfo } from '@ixo/jambo-chain-sdk/types/types/chain';
import { pubkeyType, pubkeyToAddress } from '@cosmjs/amino';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { getKeplrChainInfo } from '@ixo/jambo-chain-sdk';
import { sha256 } from '@cosmjs/crypto';

import { getBech32PrefixAccAddr, getDIDDocJSON, getInterchain, transformSignature } from './utils/opera';
import { b58_to_uint8Arr, convert_bits, decode_bech32, uint8Arr_to_b64 } from './utils/encoding';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from './utils/persistence';
import { OPERA_CHAIN_INFOS_KEY } from './constants/persistence';
import { ALGO_SECP, PUB_KEY_TYPE } from './constants/opera';
import { OperaKey } from './types/opera';

let PUB_VARS: { [chainId: string]: { pubkeyByteArray: Uint8Array; bech32Address: string } } = {};

export const opera_eventListener = {
	addMessageListener: undefined,
	postMessage: undefined,
	removeMessageListener: undefined,
};

export const opera_disable = async (): Promise<void> => {
	removeSessionStorage(OPERA_CHAIN_INFOS_KEY);
};

export const opera_enable = async (chainNameOrId: string, chainNetwork: ChainNetwork = 'mainnet'): Promise<void> => {
	if (!chainNameOrId) throw new Error('No chain id provided');
	const chains: { [chainId: string]: KeplrChainInfo } = getSessionStorage(OPERA_CHAIN_INFOS_KEY) ?? {};
	const chain = chains[chainNameOrId];
	if (!chain) {
		const chainInfo = await getKeplrChainInfo(chainNameOrId, chainNetwork);
		if (!chainInfo) throw new Error(`There is no chain info for ${chainNameOrId}`);
		chains[chainInfo.chainId] = chainInfo;
		setSessionStorage(OPERA_CHAIN_INFOS_KEY, chains);
	}
};

export const opera_experimentalSuggestChain = async (chainInfo: KeplrChainInfo): Promise<void> => {
	if (!chainInfo?.chainId) throw new Error('No chain info provided');
	const chains: { [chainId: string]: KeplrChainInfo } = getSessionStorage(OPERA_CHAIN_INFOS_KEY) ?? {};
	chains[chainInfo.chainId] = chainInfo;
	setSessionStorage(OPERA_CHAIN_INFOS_KEY, chains);
};

export const opera_getKey = async (chainId: string, includeDid: boolean = false): Promise<OperaKey | undefined> => {
	const didDocJSON = await getDIDDocJSON();
	const verificationMethod = didDocJSON.verificationMethod.find((x: any) => x.type == PUB_KEY_TYPE);
	const pubkeyBase58 = verificationMethod.publicKeyBase58;
	const pubkeyByteArray = b58_to_uint8Arr(pubkeyBase58);
	const pubkeyBase64 = uint8Arr_to_b64(pubkeyByteArray);
	const pubkey = {
		type: pubkeyType.secp256k1,
		value: pubkeyBase64,
	};
	const bech32PrefixAccAddr = getBech32PrefixAccAddr(chainId);
	const bech32Address = pubkeyToAddress(pubkey, bech32PrefixAccAddr);
	const did = didDocJSON.id;
	const decodedAddress = decode_bech32(bech32Address);
	const uint8ArrayAddress = convert_bits(decodedAddress, 5, 8, true);
	const key = {
		name: '',
		algo: ALGO_SECP,
		pubKey: pubkeyByteArray,
		address: uint8ArrayAddress,
		bech32Address: bech32Address,
		isNanoLedger: false,
		isKeystone: false,
	};

	PUB_VARS[chainId] = {
		pubkeyByteArray,
		bech32Address,
	};

	return includeDid ? { ...key, did } : key;
};

/**
 * Only supports sign direct (for now)
 */
export const opera_getOfflineSigner = async (chainId: string): Promise<OfflineDirectSigner | null> => {
	const opera = getInterchain();
	if (!opera) return null;
	const getAccounts = async (): Promise<readonly AccountData[]> => {
		const pubVars = PUB_VARS[chainId];
		if (!pubVars) return [];
		return [{ address: pubVars.bech32Address, algo: ALGO_SECP as Algo, pubkey: pubVars.pubkeyByteArray }];
	};
	const offlineSigner: OfflineDirectSigner = { getAccounts, signDirect: opera_signDirect };
	return offlineSigner;
};

export const opera_signDirect = async (chainId: string, signDoc: SignDoc): Promise<DirectSignResponse> => {
	const pubVars = PUB_VARS[chainId];
	if (!pubVars) throw new Error(`Cannot find pubKey for ${chainId}`);
	const opera = getInterchain();
	const signBytes = makeSignBytes(signDoc);
	const sha256msg = sha256(signBytes);
	const hexValue = Buffer.from(sha256msg).toString('hex');
	const signature = await opera!.signMessage(hexValue, ALGO_SECP, 0);
	const transformedSignature = transformSignature(signature ?? '');
	if (!signature || !transformedSignature) throw new Error('No signature, signing failed');

	return {
		signed: signDoc,
		signature: {
			pub_key: {
				type: pubkeyType.secp256k1,
				value: uint8Arr_to_b64(pubVars.pubkeyByteArray),
			},
			signature: transformedSignature,
		},
	};
};
