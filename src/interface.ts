export type FlashType = 'success' | 'error' | 'warning' | 'info';

export interface BaseConfig {
    offset: number;
    gap: number;
    styles: Record<FlashType, ItemStyle>;
}

export interface ItemConfig {
    icon: boolean;
    animation: boolean;
    closeByClick: boolean;
    closeTimeout: number;
    direction: 'ltr' | 'rtl';
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    borderRadius: number;
    fontFamily?: string;
}

export interface ItemStyle {
    icon: HTMLElement;
    color: string;
    backgroundColor: string;
    borderColor: string;
}
