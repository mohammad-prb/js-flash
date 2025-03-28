export type FlashType = 'success' | 'error' | 'warning' | 'info';

export interface BaseConfig {
    offset: number;
    gap: number;
    styles: Record<FlashType, ItemStyle>;
}

export interface ItemConfig {
    icon: boolean;
    animation: boolean;
    closable: boolean,
    closeTimeout: number,
    direction: 'ltr' | 'rtl';
    xAlign: 'right' | 'left';
    yAlign: 'top' | 'bottom';
    borderRadius: number;
    fontFamily?: string;
}

export interface ItemStyle {
    color: string;
    backgroundColor: string;
    borderColor: string;
}
