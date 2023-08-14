import { ImpactsXWallet } from '../types/impactsX';

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

export interface ImpactsX {
	impactsX?: ImpactsXWallet;
}

export const getImpactsX = (): ImpactsXWallet | undefined => {
	if (typeof g !== 'undefined' && g?.impactsX) return g.impactsX;
	return undefined;
};
