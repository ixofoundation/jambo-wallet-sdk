export declare const b58_to_uint8Arr: (str: string) => Uint8Array;
export declare const b64_to_uint8Arr: (str: string) => Uint8Array;
export declare const uint8Arr_to_b64: (array: Uint8Array) => string;
export declare const decode_bech32: (str: string) => number[];
export declare const convert_bits: (data: number[], fromBits: number, toBits: number, pad: boolean) => Uint8Array;
