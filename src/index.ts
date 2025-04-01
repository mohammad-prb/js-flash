import './css/main.css';
import errorIcon from './icons/error.svg';
import infoIcon from './icons/info.svg';
import successIcon from './icons/success.svg';
import warningIcon from './icons/warning.svg';
import type {BaseConfig, ItemConfig, FlashType} from './interface';

export default class Flash {
    private static list: Flash[] = [];

    private static baseConfig: BaseConfig = {
        offset: 20,
        gap: 10,
        types: {
            success: {
                icon: successIcon,
                color: '#4CAF50',
                backgroundColor: '#E8F5E9',
                borderColor: '#C8E6C9',
            },
            error: {
                icon: errorIcon,
                color: '#F44336',
                backgroundColor: '#FFEBEE',
                borderColor: '#FFCDD2',
            },
            warning: {
                icon: warningIcon,
                color: '#BD8F04',
                backgroundColor: '#FFF8E1',
                borderColor: '#FFDC74',
            },
            info: {
                icon: infoIcon,
                color: '#2196F3',
                backgroundColor: '#E3F2FD',
                borderColor: '#BBDEFB',
            }
        }
    };

    private static defaultItemConfig: ItemConfig = {
        icon: true,
        animation: true,
        closeByClick: true,
        closeTimeout: 5000,
        direction: 'ltr',
        position: 'top-left',
        borderRadius: 12,
    };

    private el: HTMLDivElement = document.createElement("div");
    private readonly message: string;
    private readonly type: FlashType;
    private readonly config: ItemConfig;

    private isClosed: boolean = false;
    private closeResolve!: (value: void | PromiseLike<void>) => void;
    private readonly closePromise: Promise<void>;

    constructor(message: string, type: FlashType, config: Partial<ItemConfig> = {}) {
        Flash.list.push(this);
        this.message = message;
        this.type = type;
        this.closePromise = new Promise(resolve => this.closeResolve = resolve);

        /* Assign item config */
        this.config = Object.assign({}, Flash.defaultItemConfig);
        Object.assign(this.config, config);

        /* Add classes */
        this.el.classList.add(`fl-item`);
        this.el.classList.add(`fl-item-${this.config.position}`);

        /* Add styles */
        this.el.style.direction = this.config.direction;
        this.el.style.borderRadius = this.config.borderRadius + "px";
        this.el.style.margin = `0 ${Flash.baseConfig.offset}px`;
        this.el.style.color = Flash.baseConfig.types[type].color;
        this.el.style.backgroundColor = Flash.baseConfig.types[type].backgroundColor;
        this.el.style.outlineColor = Flash.baseConfig.types[type].borderColor;

        /* Apply left and right styles on 'top' and 'bottom' position */
        if (this.config.position == 'top' || this.config.position == 'bottom') {
            this.el.style.left = Flash.baseConfig.offset + "px";
            this.el.style.right = Flash.baseConfig.offset + "px";
        }

        /* Apply animations */
        this.el.dataset.animation = this.config.animation ? "1" : "0";

        /* Apply fontFamily */
        if (this.config.fontFamily)
            this.el.style.fontFamily = this.config.fontFamily;

        /* Add icon */
        if (this.config.icon) {
            // Extract just the SVG part (after 'data:image/svg+xml,')
            const svgContent = Flash.baseConfig.types[type].icon.replace('data:image/svg+xml,', '');
            const icon = document.createElement("div");
            icon.classList.add("fl-icon");
            icon.innerHTML = decodeURIComponent(svgContent);
            this.el.appendChild(icon);
        }

        /* Add content */
        const content = document.createElement("div");
        content.innerHTML = this.message;
        this.el.appendChild(content);

        /* Close listener */
        if (this.config.closeByClick) {
            this.el.addEventListener("click", () => this.close());
            this.el.style.cursor = 'pointer';
        }

        /* Apply close timeout */
        if (this.config.closeTimeout > 0) {
            setTimeout(() => this.close(), this.config.closeTimeout);
        }

        this.fixPosition();
        document.body.appendChild(this.el);
    }

    static setBaseConfig = (config: Partial<BaseConfig>): void => {
        Object.assign(Flash.baseConfig, config);
    }

    static setItemConfig = (config: Partial<ItemConfig>): void => {
        Object.assign(Flash.defaultItemConfig, config);
    }

    public get element(): HTMLDivElement {
        return this.el;
    }

    public get messageText(): string {
        return this.message;
    }

    public get messageType(): FlashType {
        return this.type;
    }

    public get itemConfig(): ItemConfig {
        return this.config;
    }

    public get closed(): boolean {
        return this.isClosed;
    }

    public get whenClosed(): Promise<void> {
        return this.closePromise;
    }

    public close = (): void => {
        this.isClosed = true;
        this.closeResolve();

        this.el.style.opacity = "0";
        setTimeout(() => this.el.remove(), 300);

        const index = Flash.list.indexOf(this);
        Flash.list.splice(index, 1);
        Flash.list.forEach((flashItem) => flashItem.fixPosition());
    }

    private fixPosition = (): void => {
        let value = Flash.baseConfig.offset;
        for (const flashItem of Flash.list) {
            if (flashItem == this) break;
            if (flashItem.config.position == this.config.position)
                value += flashItem.el.clientHeight + Flash.baseConfig.gap;
        }

        const yAlign = this.config.position.split('-')[0];
        if (yAlign == 'top')
            this.el.style.top = value + "px";
        else if (yAlign == 'bottom')
            this.el.style.bottom = value + "px";
    }
}

export type {BaseConfig, ItemConfig, FlashType};
