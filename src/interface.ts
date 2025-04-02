import {b} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type FlashType = 'success' | 'error' | 'warning' | 'info';

export interface BaseConfig {
    offset: number;
    gap: number;
    types: Record<FlashType, ItemStyle>;
}

export interface ItemConfig {
    icon: boolean;
    animation: boolean;
    closeByClick: boolean;
    closeTimeout: number;
    pauseOnHover: boolean;
    loading: boolean;
    direction: 'ltr' | 'rtl';
    position: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    borderRadius: number;
    fontFamily?: string;
}

export interface ItemStyle {
    icon: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
    loadingColor: string;
}
