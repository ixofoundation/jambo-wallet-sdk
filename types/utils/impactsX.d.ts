import { ImpactsXWallet } from '../types/impactsX';
export interface ImpactsX {
    impactsX?: ImpactsXWallet;
}
export declare const getImpactsX: () => ImpactsXWallet | undefined;
