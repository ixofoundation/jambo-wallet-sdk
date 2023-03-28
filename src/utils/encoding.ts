import { toBase64, fromBase64 } from '@cosmjs/encoding';
import { bech32 } from 'bech32';
import { decode } from 'bs58';

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
