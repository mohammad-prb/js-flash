type FlashType = 'success' | 'error' | 'warning' | 'info';

interface Config {
    icons: boolean;
    animations: boolean;
    direction: 'ltr' | 'rtl';
    xAlign: 'right' | 'left';
    yAlign: 'top' | 'bottom';
    borderRadius: number;
    fontFamily?: string;
    types: Record<FlashType, FlashTypeConfig>;
}

interface FlashTypeConfig {
    color: string;
    backgroundColor: string;
    borderColor: string;
}

export default class Flash {
    private static list: Flash[] = [];

    static config: Config = {
        icons: true,
        animations: true,
        direction: 'ltr',
        xAlign: 'left',
        yAlign: 'top',
        borderRadius: 16,
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

    constructor(text: string, type: FlashType, {closable = true, closeTimeout = 5000}) {
        Flash.list.push(this);

        /* Add classes */
        this.item.classList.add(`fl-item`);
        this.item.classList.add(`fl-item-${Flash.config.xAlign}`);

        /* Add styles */
        this.item.style.direction = Flash.config.direction;
        this.item.style.borderRadius = Flash.config.borderRadius + "px";
        this.item.style.color = Flash.config.types[type].color;
        this.item.style.backgroundColor = Flash.config.types[type].backgroundColor;
        this.item.style.outlineColor = Flash.config.types[type].borderColor;

        /* Apply animations */
        this.item.dataset.animation = Flash.config.animations ? "1" : "0";

        /* Apply fontFamily */
        if (Flash.config.fontFamily)
            this.item.style.fontFamily = Flash.config.fontFamily;

        /* Add icon */
        if (Flash.config.icons) {
            const icon = document.createElement("img");
            icon.classList.add("fl-icon");
            icon.src = `icons/${type}.svg`;
            icon.alt = type;
            this.item.appendChild(icon);
        }

        /* Add content */
        const content = document.createElement("div");
        content.classList.add("fl-text");
        content.innerHTML = text;
        this.item.appendChild(content);

        /* Close listener */
        if (closable)
            this.item.addEventListener("click", this.close);

        /* Apply close timeout */
        if (closeTimeout > 0) {
            setTimeout(this.close, closeTimeout);
        }

        document.body.appendChild(this.item);
    }

    close(): void {
        this.item.style.opacity = "0";
        setTimeout(() => {
            this.item.remove();
        }, 500);

        const index = Flash.list.indexOf(this);
        Flash.list.splice(index, 1);
    }
}
