import './css/main.css';
import errorIcon from './icons/error.svg';
import infoIcon from './icons/info.svg';
import successIcon from './icons/success.svg';
import warningIcon from './icons/warning.svg';
import type {FlashType, FlashPosition, ItemConfig, BaseConfig, DeepPartial} from './interface';

export default class Flash {
    /** Live flash message list. */
    private static list: Flash[] = [];

    /** Base configuration. */
    private static baseConfig: BaseConfig = {
        offset: 20,
        gap: 10,
        types: {
            success: {
                icon: successIcon,
                color: '#4CAF50',
                backgroundColor: '#E8F5E9',
                borderColor: '#C8E6C9',
                loadingColor: '#C8E6C9',
                button: {
                    color: '#4CAF50',
                    backgroundColor: 'transparent',
                    borderColor: '#C8E6C9',
                }
            },
            error: {
                icon: errorIcon,
                color: '#F44336',
                backgroundColor: '#FFEBEE',
                borderColor: '#FFCDD2',
                loadingColor: '#FFCDD2',
                button: {
                    color: '#F44336',
                    backgroundColor: 'transparent',
                    borderColor: '#FFCDD2',
                }
            },
            warning: {
                icon: warningIcon,
                color: '#BD8F04',
                backgroundColor: '#FFF8E1',
                borderColor: '#FFDC74',
                loadingColor: '#FFDC74',
                button: {
                    color: '#BD8F04',
                    backgroundColor: 'transparent',
                    borderColor: '#FFDC74',
                }
            },
            info: {
                icon: infoIcon,
                color: '#2196F3',
                backgroundColor: '#E3F2FD',
                borderColor: '#BBDEFB',
                loadingColor: '#BBDEFB',
                button: {
                    color: '#2196F3',
                    backgroundColor: 'transparent',
                    borderColor: '#BBDEFB',
                }
            }
        }
    };

    /** Default configuration for each item. */
    private static defaultItemConfig: ItemConfig = {
        icon: true,
        animation: true,
        closeByClick: true,
        closeTimeout: 5000,
        pauseOnHover: true,
        loading: true,
        direction: 'ltr',
        position: 'top-left',
        borderRadius: 8,
    };

    /** Flash message root element. */
    private el: HTMLDivElement = document.createElement("div");

    /** Loading bar element. */
    private loading: HTMLDivElement = document.createElement("div");

    /** Message text. */
    private readonly message: string;

    /** Message type. */
    private readonly type: FlashType;

    /** Message configuration. */
    private readonly config: ItemConfig;

    /** Message status. */
    private isClosed: boolean = false;

    /** Message close resolve. (For closePromise) */
    private closeResolve!: (value: void | PromiseLike<void>) => void;

    /** Message close promise. */
    private readonly closePromise: Promise<void>;

    /** Message timeout. */
    private timeout = {
        id: 0,
        startTime: 0,
        remaining: 0,
    }

    /**
     * Flash message.
     * > [Documents](https://github.com/mohammad-prb/js-flash)
     * @param {string} message - The message to display.
     * @param {string} type - The type of the message.
     * @param {object} [config] - An optional object for configuration.
     * */
    constructor(message: string, type: FlashType, config: Partial<ItemConfig> = {}) {
        Flash.list.push(this);
        this.message = message;
        this.type = type;
        this.closePromise = new Promise(resolve => this.closeResolve = resolve);

        /* Assign item config */
        this.config = Flash.deepMerge({} as ItemConfig, Flash.defaultItemConfig);
        Flash.deepMerge(this.config, config);

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
        content.classList.add('fl-content');
        content.innerHTML = this.message;
        this.el.appendChild(content);

        /* Add action */
        if (this.config.action) {
            const buttonStyles = Flash.baseConfig.types[type].button;
            const btn = document.createElement("button");
            btn.classList.add('fl-btn');
            btn.style.color = buttonStyles.color;
            btn.style.backgroundColor = buttonStyles.backgroundColor;
            btn.style.outlineColor = buttonStyles.borderColor;
            btn.addEventListener('click', this.config.action.handler);
            btn.innerHTML = this.config.action.text;
            this.el.appendChild(btn);
        }

        /* Close listener */
        if (this.config.closeByClick) {
            this.el.addEventListener("click", () => this.close());
            this.el.style.cursor = 'pointer';
        }

        /* Apply close timeout */
        if (this.config.closeTimeout > 0) {
            this.timeout.startTime = Date.now();
            this.timeout.remaining = this.config.closeTimeout;
            this.timeout.id = setTimeout(() => this.close(), this.config.closeTimeout);

            /* Apply pause on hover */
            if (this.config.pauseOnHover) {
                this.el.dataset.pausable = '1';
                this.el.addEventListener('mouseover', () => this.pauseTimout());
                this.el.addEventListener('mouseout', () => this.playTimout());
            }

            /* Add loading */
            if (this.config.loading) {
                this.loading.classList.add('fl-loading');
                this.loading.style.backgroundColor = Flash.baseConfig.types[type].loadingColor;
                this.loading.style.animation = `fl-loading ${this.config.closeTimeout / 1000}s linear`;
                this.loading.style.animationFillMode = 'both';

                if (this.config.direction == 'rtl')
                    this.loading.style.right = '0';
                else
                    this.loading.style.left = '0';

                this.el.appendChild(this.loading);
            }
        }

        this.fixPosition();
        document.body.appendChild(this.el);
    }

    /**
     * Set base flash message settings.
     * @param {object} config - Base configuration.
     * */
    public static setBaseConfig = (config: DeepPartial<BaseConfig>): void => {
        Flash.deepMerge(Flash.baseConfig, config);
    }

    /**
     * Setting flash message defaults.
     * @param {object} config - Default configuration.
     * */
    public static setDefaultItemConfig = (config: Partial<ItemConfig>): void => {
        Flash.deepMerge(Flash.defaultItemConfig, config);
    }

    /** Closes all messages. */
    public static closeAll = (): void => {
        Flash.list.forEach((flashItem) => flashItem.close());
    }

    /** Closes the first message. */
    public static closeFirst = (): void => {
        const first = Flash.list[0];
        if (first) first.close();
    }

    /** Closes the last message. */
    public static closeLast = (): void => {
        const last = Flash.list[Flash.list.length - 1];
        if (last) last.close();
    }

    /**
     * Closes all messages of the specified type.
     * @param {string} type - Flash type.
     * */
    public static closeByType = (type: FlashType): void => {
        Flash.list.forEach((flashItem) => {
            if (flashItem.messageType == type)
                flashItem.close();
        });
    }

    /**
     * Closes all messages of the specified position.
     * @param {string} position - Flash position.
     * */
    public static closeByPosition = (position: FlashPosition): void => {
        Flash.list.forEach((flashItem) => {
            if (flashItem.itemConfig.position == position)
                flashItem.close();
        });
    }

    /**
     * Merge objects in depth.
     * @param {object} target - Target object.
     * @param {object} sources[] - Objects that are copied to the target object.
     * @returns Target object.
     * */
    private static deepMerge = <T extends Record<string, any>>(target: T, ...sources: DeepPartial<T>[]): T => {
        if (!sources.length) return target;
        const source = sources.shift();
        if (!source) return target;

        const isObject = (item: DeepPartial<T>) => (item && typeof item === 'object' && !Array.isArray(item));

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (source[key] && isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {[key]: {}});
                    Flash.deepMerge(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }

        return Flash.deepMerge(target, ...sources);
    };

    /**
     * The message element.
     * @returns {HTMLDivElement}
     * */
    public get element(): HTMLDivElement {
        return this.el;
    }

    /**
     * The message text.
     * @returns {string}
     * */
    public get messageText(): string {
        return this.message;
    }

    /**
     * The message type.
     * @returns {string}
     * */
    public get messageType(): FlashType {
        return this.type;
    }

    /**
     * The message configuration.
     * @returns {object}
     * */
    public get itemConfig(): ItemConfig {
        return this.config;
    }

    /**
     * Whether the message is closed.
     * @returns {boolean}
     * */
    public get closed(): boolean {
        return this.isClosed;
    }

    /**
     * The promise that resolves when the message is closed.
     * @returns {Promise}
     * */
    public get whenClosed(): Promise<void> {
        return this.closePromise;
    }

    /** Closes the message. */
    public close = (): void => {
        this.isClosed = true;
        this.closeResolve();

        this.el.style.opacity = "0";
        setTimeout(() => this.el.remove(), 300);

        const index = Flash.list.indexOf(this);
        Flash.list.splice(index, 1);
        Flash.list.forEach((flashItem) => flashItem.fixPosition());
    }

    /** Pause `closeTimeout`. */
    public pauseTimout = (): void => {
        clearTimeout(this.timeout.id);
        this.timeout.remaining -= Date.now() - this.timeout.startTime;

        this.loading.style.animationPlayState = 'paused';
    }

    /** Play `closeTimeout`. */
    public playTimout = (): void => {
        this.timeout.startTime = Date.now();
        this.timeout.id = setTimeout(() => this.close(), this.timeout.remaining);

        this.loading.style.animationPlayState = 'running';
    }

    /** Calculating message position. */
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

export type {FlashType, FlashPosition, ItemConfig, BaseConfig, DeepPartial};
