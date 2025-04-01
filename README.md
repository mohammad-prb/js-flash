# JavaScript Flash Message (js-flash)

JavaScript package for displaying flash messages.

It can be used in pure **JavaScript** or **TypeScript** projects, or any other JavaScript framework like **React**, **Vue**, **Angular** etc.

## How to use

Install the package using `npm`:

```bash
npm i js-flash
```

Import the package in your project and use it:

```javascript
import Flash from 'js-flash';

new Flash('Hello World!', 'info');
```

You can pass the following parameters to the `Flash` constructor:

- `message` (string): The message to display.
- `type` (string): The type of the message. The following types are available:
    - `'info'`
    - `'success'`
    - `'warning'`
    - `'error'`
- `config` (object): An optional object for configuration.

### Options

The following options are available for configuration:

| Option         | Type              | Default      | Description                                                                                                                                  |
|:---------------|:------------------|:-------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `icon`         | `boolean`         | `true`       | Whether to display an icon with the message.                                                                                                 |
| `animation`    | `boolean`         | `true`       | Whether to enable animations for message.                                                                                                    |
| `closeByClick` | `boolean`         | `true`       | Whether to close the message by clicking on it.                                                                                              |
| `closeTimeout` | `number`          | `5000`       | The time in milliseconds after which the message will be automatically closed. (If set to `0`, the message will not be closed automatically) |
| `direction`    | `string`          | `'ltr'`      | The direction of the message. (`'ltr'` or `'rtl'`)                                                                                           |
| `position`     | `string`          | `'top-left'` | The position of the message on the page. (`'top'`, `'bottom'`, `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`)               |
| `borderRadius` | `number`          | `12`         | The border radius of the message.                                                                                                            |
| `fontFamily`   | `string`          | `undefined`  | The font family of the message. If not set, the body font will be applied.                                                                   |

#### Example with options

```javascript
import Flash from 'js-flash';

new Flash('Hello World!', 'info', {
    animation: false,
    closeTimeout: 0,
    position: 'bottom-left'
});
```

## Properties

You can access the following properties of the flash message:

| Property      | Type             | Description                                          |
|:--------------|:-----------------|:-----------------------------------------------------|
| `element`     | `HTMLDivElement` | The message element.                                 |
| `messageText` | `string`         | The message text.                                    |
| `messageType` | `string`         | The message type.                                    |
| `itemConfig`  | `object`         | The message configuration.                           |
| `closed`      | `boolean`        | Whether the message is closed.                       |
| `whenClosed`  | `Promise<void>`  | The promise that resolves when the message is closed |

example:

```javascript
import Flash from 'js-flash';

const flash = new Flash('Hello World!', 'info');

flash.element.classList.add('custom-class');

flash.whenClosed.then(() => {
    console.log('Message closed');
});
```

> **Note:** all properties are read-only.

## Methods

You can use the following methods to interact with the flash message:

| Method    | Description         |
|:----------|:--------------------|
| `close()` | Closes the message. |

example:

```javascript
import Flash from 'js-flash';

const flash = new Flash('Hello World!', 'info', {
    closeTimeout: 0,    // Disable auto close
    closeByClick: false // Disable close by click
});

function myFnc() {
    flash.close();
}
```

## Base Configuration

You can configure the base settings of the flash messages:

```javascript
import Flash from 'js-flash';

Flash.setBaseConfig({
    offset: 25,
    gap: 15,
    styles: {
        info: {
            backgroundColor: '#3498db',
            color: '#fff'
        },
        success: {
            borderColor: '#27ae60'
        }
    }
});
```

### Base Configuration Options

| Option   | Type     | Default         | Description                                  |
|:---------|:---------|:----------------|:---------------------------------------------|
| `offset` | `number` | `20`            | The offset from the edge of the screen. (px) |
| `gap`    | `number` | `10`            | The gap between messages. (px)               |
| `types`  | `object` | (Types section) | The properties for different message types.  |

#### Types Configuration

You can set these properties for different message types:

| Property          | Description                           |
|:------------------|:--------------------------------------|
| `color`           | Text and icon color.                  |
| `backgroundColor` | Background color.                     |
| `borderColor`     | Border color.                         |
| `icon`            | Icon data URL. (`data:image/svg+xml`) |

Default properties:

```javascript
types = {
    info: {
        color: '#2196F3',
        backgroundColor: '#E3F2FD',
        borderColor: '#BBDEFB',
        icon: 'data:image/svg+xml,...'
    },
    success: {
        color: '#4CAF50',
        backgroundColor: '#E8F5E9',
        borderColor: '#C8E6C9',
        icon: 'data:image/svg+xml,...'
    },
    warning: {
        color: '#BD8F04',
        backgroundColor: '#FFF8E1',
        borderColor: '#FFDC74',
        icon: 'data:image/svg+xml,...'
    },
    error: {
        color: '#F44336',
        backgroundColor: '#FFEBEE',
        borderColor: '#FFCDD2',
        icon: 'data:image/svg+xml,...'
    }
}
```

## Configuring item defaults

You can configure the default settings for each message. (Constructor options)

```javascript
import Flash from 'js-flash';

Flash.setItemConfig({
    icon: false,
    animation: false,
    closeByClick: false,
    closeTimeout: 0,
    position: 'bottom-right',
    borderRadius: 8,
    fontFamily: 'Arial'
});
```

## TypeScript

This package is written in TypeScript and includes type definitions.
You can use it in TypeScript projects.

```typescript
import type { BaseConfig, ItemConfig, FlashType } from 'js-flash';
```

## Future Plans

The project is designed to be scalable.
If you have any suggestions, feel free to contribute or create an issue.

## Contributions

We welcome contributions to expand this project.
If you'd like to improve this project, please create a pull request.

## Support

If this project was helpful, please consider giving it a **star**.
Your support helps us grow!

