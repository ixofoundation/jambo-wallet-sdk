import { toBase64, fromBase64, toHex, fromHex } from '@cosmjs/encoding';
import { AccountData, SignDoc } from '@keplr-wallet/types';
import { bech32 } from 'bech32';
import { decode } from 'bs58';

import { ImpactsXAccountData, ImpactsXKey } from '../types/impactsX';
import { WalletKey } from '../types/wallet';

export const b58_to_uint8Arr = (str: string): Uint8Array => {
	const uint8Arr = decode(str);
	return uint8Arr;
};

export const b64_to_uint8Arr = (str: string): Uint8Array => {
	const uint8Arr = fromBase64(str);
	return uint8Arr;
};

export const uint8Arr_to_b64 = (array: Uint8Array): string => {
	const b64 = toBase64(array);
	return b64;
};

export const decode_bech32 = (str: string): number[] => {
	const results = bech32.decode(str);
	return results.words;
};

export const convert_bits = (data: number[], fromBits: number, toBits: number, pad: boolean) => {
	let acc = 0;
	let bits = 0;
	const result = [];
	const maxv = (1 << toBits) - 1;
	const max_acc = (1 << (fromBits + toBits - 1)) - 1;
	for (let i = 0; i < data.length; ++i) {
		const value = data[i];
		if (value < 0 || value >> fromBits !== 0) {
			throw new Error('Invalid value: ' + value);
		}
		acc = ((acc << fromBits) | value) & max_acc;
		bits += fromBits;
		while (bits >= toBits) {
			bits -= toBits;
			result.push((acc >> bits) & maxv);
		}
	}
	if (pad) {
		if (bits > 0) {
			result.push((acc << (toBits - bits)) & maxv);
		}
	} else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv) !== 0) {
		throw new Error('Invalid padding');
	}
	return new Uint8Array(result);
};

export const uint8Arr_to_hex = (array: Uint8Array): string => {
	const hex = toHex(array);
	return hex;
};

export const hex_to_uint8Arr = (str: string): Uint8Array => {
	const uint8Arr = fromHex(str);
	return uint8Arr;
};

export const stringifyAccountData = (accountData: AccountData): ImpactsXAccountData =>
	Object.assign(Object.assign({}, accountData), {
		pubkey: uint8Arr_to_hex(accountData.pubkey),
	});

export const parseAccountData = (accountData: ImpactsXAccountData): AccountData =>
	Object.assign(Object.assign({}, accountData), {
		pubkey: hex_to_uint8Arr(accountData.pubkey),
	});

export const stringifyKey = (key: WalletKey): ImpactsXKey =>
	Object.assign(Object.assign({}, key), {
		pubKey: uint8Arr_to_hex(key.pubKey),
		address: uint8Arr_to_hex(key.address),
	});

export const parseKey = (key: ImpactsXKey): WalletKey =>
	Object.assign(Object.assign({}, key), {
		pubKey: hex_to_uint8Arr(key.pubKey),
		address: hex_to_uint8Arr(key.address),
	});

export const stringifySignDoc = (
	signDoc: SignDoc,
): SignDoc & {
	bodyBytes: string;
	authInfoBytes: string;
	accountNumber: string;
} =>
	Object.assign(Object.assign({}, signDoc), {
		bodyBytes: uint8Arr_to_hex(signDoc.bodyBytes),
		authInfoBytes: uint8Arr_to_hex(signDoc.authInfoBytes),
		accountNumber: signDoc.accountNumber.toString(),
	});

export const parseSignDoc = (
	signDoc: SignDoc & {
		bodyBytes: string;
		authInfoBytes: string;
		accountNumber: string;
	},
): SignDoc =>
	Object.assign(Object.assign({}, signDoc), {
		bodyBytes: hex_to_uint8Arr(signDoc.bodyBytes),
		authInfoBytes: hex_to_uint8Arr(signDoc.authInfoBytes),
		accountNumber: Number(signDoc.accountNumber),
	});
