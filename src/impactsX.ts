import { DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { ChainNetwork, KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { AccountData } from '@cosmjs/amino';

import { parseAccountData, parseKey, stringifySignDoc } from './utils/encoding';
import { getImpactsX } from './utils/impactsX';
import { WalletKey } from './types/wallet';

export const impactsX_version = getImpactsX()?.version;

export const impactsX_enable = (chainNameOrId: string, chainNetwork: ChainNetwork = 'mainnet'): Promise<void> => {
	if (!chainNameOrId) throw new Error('No chain id provided');
	if (!chainNetwork) throw new Error('No chain network provided');
	return getImpactsX().enable(chainNameOrId, chainNetwork);
};

export const impactsX_experimentalSuggestChain = (chainInfo: KeplrChainInfo): Promise<void> => {
	if (!chainInfo?.chainId) throw new Error('No chain info provided');
	return getImpactsX().experimentalSuggestChain(chainInfo);
};

export const impactsX_getKey = async (chainId: string, includeDid: boolean = false): Promise<WalletKey | undefined> => {
	if (!chainId) throw new Error('No chain id provided');
	const impactsXKey = await getImpactsX().getKey(chainId, !!includeDid);
	const parsedImpactsXKey = parseKey(impactsXKey);
	const key = {
		...parsedImpactsXKey,
		name: parsedImpactsXKey.name ?? '',
		isNanoLedger: false,
		isKeystone: false,
	};
	return key;
};

export const impactsX_getAccounts = async (chainId: string): Promise<AccountData[]> => {
	if (!chainId) throw new Error('No chain id provided');
	const impactsXAccounts = await getImpactsX().getAccounts(chainId);
	const accounts = impactsXAccounts.map(parseAccountData);
	return accounts;
};

export const impactsX_signDirect = async (signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> => {
	if (!signerAddress) throw new Error('No signer address provided');
	if (!signDoc) throw new Error('No sign doc provided');
	const stringifiedSignDoc = stringifySignDoc(signDoc);
	const response = await getImpactsX().signDirect(signerAddress, stringifiedSignDoc);
	if (!response.signature) throw new Error('Failed to sign transaction with ImpactsX');
	// parse response signed with `parseSignDoc(response.signed)`
	const directSignResponse = {
		...response,
		signed: signDoc,
	};
	return directSignResponse;
};

/**
 * Only supports sign direct (for now)
 */
export const impactsX_getOfflineSigner = (chainId: string): OfflineDirectSigner => {
	if (!chainId) throw new Error('No chain id provided');
	let offlineSigner: OfflineDirectSigner = {
		getAccounts: () => impactsX_getAccounts(chainId),
		signDirect: impactsX_signDirect,
	};
	return offlineSigner;
};
