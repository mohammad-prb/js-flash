import errorIcon from './icons/error.svg';
import infoIcon from './icons/info.svg';
import successIcon from './icons/success.svg';
import warningIcon from './icons/warning.svg';
import type {BaseConfig, ItemConfig, FlashType} from './interface';

const icons: Record<FlashType, string> = {
    error: errorIcon,
    info: infoIcon,
    success: successIcon,
    warning: warningIcon,
}

export default class Flash {
    private static list: Flash[] = [];

    static baseConfig: BaseConfig = {
        offset: 20,
        gap: 8,
        styles: {
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

    static defaultItemConfig: ItemConfig = {
        icon: true,
        animation: true,
        closable: true,
        closeTimeout: 5000,
        direction: 'ltr',
        xAlign: 'left',
        yAlign: 'top',
        borderRadius: 16,
    };

    item = document.createElement("div");
    config: ItemConfig;

    constructor(text: string, type: FlashType, config: Partial<ItemConfig> = {}) {
        Flash.list.push(this);

        /* Assign item config */
        this.config = Object.assign({}, Flash.defaultItemConfig);
        Object.assign(this.config, config);

        /* Add classes */
        this.item.classList.add(`fl-item`);
        this.item.classList.add(`fl-item-${this.config.xAlign}`);

        /* Add styles */
        this.item.style.direction = this.config.direction;
        this.item.style.borderRadius = this.config.borderRadius + "px";
        this.item.style.color = Flash.baseConfig.styles[type].color;
        this.item.style.backgroundColor = Flash.baseConfig.styles[type].backgroundColor;
        this.item.style.outlineColor = Flash.baseConfig.styles[type].borderColor;

        /* Apply offset */
        if (this.config.xAlign == 'left')
            this.item.style.left = Flash.baseConfig.offset + "px";
        else if (this.config.xAlign == 'right')
            this.item.style.right = Flash.baseConfig.offset + "px";

        /* Apply animations */
        this.item.dataset.animation = this.config.animation ? "1" : "0";

        /* Apply fontFamily */
        if (this.config.fontFamily)
            this.item.style.fontFamily = this.config.fontFamily;

        /* Add icon */
        if (this.config.icon) {
            const icon = document.createElement("img");
            icon.classList.add("fl-icon");
            icon.src = icons[type];
            icon.alt = type;
            this.item.appendChild(icon);
        }

        /* Add content */
        const content = document.createElement("div");
        content.innerHTML = text;
        this.item.appendChild(content);

        /* Close listener */
        if (this.config.closable) {
            this.item.addEventListener("click", this.close);
            this.item.style.cursor = 'pointer';
        }

        /* Apply close timeout */
        if (this.config.closeTimeout > 0) {
            setTimeout(this.close, this.config.closeTimeout);
        }

        document.body.appendChild(this.item);
        this.fixPosition();
    }

    close(): void {
        this.item.style.opacity = "0";
        setTimeout(this.item.remove, 500);

        const index = Flash.list.indexOf(this);
        Flash.list.splice(index, 1);
        Flash.list.map((flashItem) => flashItem.fixPosition());
    }

    private fixPosition(): void {
        let value = Flash.baseConfig.offset;
        Flash.list.map((flashItem) => {
            if (flashItem.config.xAlign == this.config.xAlign && flashItem.config.yAlign == this.config.yAlign) {
                value += flashItem.item.clientHeight + Flash.baseConfig.gap;
            }
        });

        if (this.config.yAlign == 'top')
            this.item.style.top = value + "px";
        else if (this.config.yAlign == 'bottom')
            this.item.style.bottom = value + "px";
    }
}

export type {BaseConfig, ItemConfig, FlashType};
