import { DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { ChainNetwork, KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { AccountData, Algo } from '@cosmjs/amino';

import { b64_to_uint8Arr, uint8Arr_to_b64 } from './utils/encoding';
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
	const pubKey = impactsXKey.pubKey ?? b64_to_uint8Arr(impactsXKey.pubKeyBase64 as unknown as string);
	const address = impactsXKey.address ?? b64_to_uint8Arr(impactsXKey.addressBase64 as unknown as string);
	const key = {
		name: impactsXKey.name ?? '',
		algo: impactsXKey.algo,
		pubKey,
		address,
		bech32Address: impactsXKey.bech32Address,
		isNanoLedger: false,
		isKeystone: false,
	};
	return key;
};

export const impactsX_getAccounts = async (chainId: string): Promise<AccountData[]> => {
	if (!chainId) throw new Error('No chain id provided');
	const impactsXAccounts = await getImpactsX().getAccounts(chainId);
	const accounts = impactsXAccounts.map((account) => ({
		address: account.address as string,
		algo: account.algo as Algo,
		pubkey: account.pubkey ?? (b64_to_uint8Arr(account.pubkeyBase64) as Uint8Array),
	}));
	return accounts;
};

export const impactsX_signDirect = async (signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> => {
	if (!signerAddress) throw new Error('No signer address provided');
	if (!signDoc) throw new Error('No sign doc provided');
	const { bodyBytes: signDocBodyBytes, authInfoBytes: signDocAuthInfoBytes, ...restOfSignDoc } = signDoc;
	const bodyBytesBase64 = uint8Arr_to_b64(signDocBodyBytes);
	const authInfoBytesBase64 = uint8Arr_to_b64(signDocAuthInfoBytes);
	const response = await getImpactsX().signDirect(signerAddress, {
		...restOfSignDoc,
		bodyBytesBase64,
		authInfoBytesBase64,
	});
	const {
		authInfoBytesBase64: signedAuthInfoBytesBase64,
		bodyBytesBase64: signedBodyBytesBase64,
		...restOfSignedResponse
	} = response.signed;
	const signedAuthInfoBytes = b64_to_uint8Arr(signedAuthInfoBytesBase64);
	const signedBodyBytes = b64_to_uint8Arr(signedBodyBytesBase64);
	const directSignResponse = {
		...response,
		signed: {
			...restOfSignedResponse,
			authInfoBytes: signedAuthInfoBytes,
			bodyBytes: signedBodyBytes,
		},
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
