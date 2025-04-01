import './css/main.css';
import errorIcon from './icons/error.svg';
import infoIcon from './icons/info.svg';
import successIcon from './icons/success.svg';
import warningIcon from './icons/warning.svg';
import type {BaseConfig, ItemConfig, FlashType} from './interface';

export default class Flash {
    private static list: Flash[] = [];

    static baseConfig: BaseConfig = {
        offset: 20,
        gap: 10,
        styles: {
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

    static defaultItemConfig: ItemConfig = {
        icon: true,
        animation: true,
        closeByClick: true,
        closeTimeout: 5000,
        direction: 'ltr',
        position: 'top-left',
        borderRadius: 12,
    };

    element = document.createElement("div");
    type: FlashType;
    config: ItemConfig;

    constructor(text: string, type: FlashType, config: Partial<ItemConfig> = {}) {
        Flash.list.push(this);
        this.type = type;

        /* Assign item config */
        this.config = Object.assign({}, Flash.defaultItemConfig);
        Object.assign(this.config, config);

        /* Add classes */
        this.element.classList.add(`fl-item`);
        this.element.classList.add(`fl-item-${this.config.position}`);

        /* Add styles */
        this.element.style.direction = this.config.direction;
        this.element.style.borderRadius = this.config.borderRadius + "px";
        this.element.style.margin = `0 ${Flash.baseConfig.offset}px`;
        this.element.style.color = Flash.baseConfig.styles[type].color;
        this.element.style.backgroundColor = Flash.baseConfig.styles[type].backgroundColor;
        this.element.style.outlineColor = Flash.baseConfig.styles[type].borderColor;

        /* Apply animations */
        this.element.dataset.animation = this.config.animation ? "1" : "0";

        /* Apply fontFamily */
        if (this.config.fontFamily)
            this.element.style.fontFamily = this.config.fontFamily;

        /* Add icon */
        if (this.config.icon) {
            const icon = document.createElement("img");
            icon.classList.add("fl-icon");
            icon.src = Flash.baseConfig.styles[type].icon;
            icon.alt = type;
            this.element.appendChild(icon);
        }

        /* Add content */
        const content = document.createElement("div");
        content.innerHTML = text;
        this.element.appendChild(content);

        /* Close listener */
        if (this.config.closeByClick) {
            this.element.addEventListener("click", this.close);
            this.element.style.cursor = 'pointer';
        }

        /* Apply close timeout */
        if (this.config.closeTimeout > 0) {
            setTimeout(this.close, this.config.closeTimeout);
        }

        this.fixPosition();
        document.body.appendChild(this.element);
    }

    close = (): void => {
        this.element.style.opacity = "0";
        setTimeout(this.element.remove, 500);

        const index = Flash.list.indexOf(this);
        Flash.list.splice(index, 1);
        Flash.list.forEach((flashItem) => flashItem.fixPosition());
    }

    private fixPosition = (): void => {
        let value = Flash.baseConfig.offset;
        Flash.list.forEach((flashItem) => {
            if (flashItem != this && flashItem.config.position == this.config.position)
                value += flashItem.element.clientHeight + Flash.baseConfig.gap;
        });

        const yAlign = this.config.position.split('-')[0];
        if (yAlign == 'top')
            this.element.style.top = value + "px";
        else if (yAlign == 'bottom')
            this.element.style.bottom = value + "px";
    }
}

export type {BaseConfig, ItemConfig, FlashType};
