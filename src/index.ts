type FlashType = 'success' | 'error' | 'warning' | 'info';

interface Config {
    offset: number;
    gap: number;
    icons: boolean;
    animations: boolean;
    direction: 'ltr' | 'rtl';
    xAlign: 'center' | 'right' | 'left';
    yAlign: 'top' | 'bottom';
    borderRadius: number;
    fontFamily: string;
    types: Record<FlashType, FlashTypeConfig>;
}

interface FlashTypeConfig {
    color: string;
    backgroundColor: string;
    borderColor: string;
}

interface ItemConfig {
    closable: boolean;
    closeTimeout: number;
}

export default class Flash {
    private static list = [];

    static config: Config = {
        offset: 20,
        gap: 10,
        icons: true,
        animations: true,
        direction: 'ltr',
        xAlign: 'left',
        yAlign: 'top',
        borderRadius: 16,
        fontFamily: 'Arial',
        types: {
            success: {
                color: '#4CAF50',
                backgroundColor: '#E8F5E9',
                borderColor: '#C8E6C9',
            },
            error: {
                color: '#F44336',
                backgroundColor: '#FFEBEE',
                borderColor: '#FFCDD2',
            },
            warning: {
                color: '#FFC107',
                backgroundColor: '#FFF8E1',
                borderColor: '#FFECB3',
            },
            info: {
                color: '#2196F3',
                backgroundColor: '#E3F2FD',
                borderColor: '#BBDEFB',
            }
        }
    };

    item = document.createElement("div");

    constructor(
        text: string,
        type: FlashType,
        {closable = true, closeTimeout = 5000}: ItemConfig
    ) {

    }
}
