# JavaScript Flash Message (js-flash)

JavaScript package for displaying flash messages in various types with full customization capabilities.

This package is designed to be simple and easy to use.
It provides a simple way to display flash messages in your web applications.

It can be used in pure **JavaScript** or **TypeScript** projects, or any other JavaScript framework like **React**, **Vue**, **Angular** etc.

## How to use

1. Using CDN:

```html
<!-- Current version -->
<script src="https://unpkg.com/js-flash@1.4.3"></script>

<!-- Always the latest version -->
<script src="https://unpkg.com/js-flash"></script>
```

2. Install the package using `npm`:

```bash
npm i js-flash
```

Import the package in your project and use it:

```javascript
import Flash from 'js-flash';

new Flash('Hello World!', 'info');
```

> [!NOTE]
> If you are using CDN, you don't need to import anything, just use it.

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

| Option         | Type      | Default      | Description                                                                                                                                      |
|:---------------|:----------|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| `icon`         | `boolean` | `true`       | Whether to display an icon with the message.                                                                                                     |
| `animation`    | `boolean` | `true`       | Whether to enable animations for message.                                                                                                        |
| `closeByClick` | `boolean` | `true`       | Whether to close the message by clicking on it.                                                                                                  |
| `closeTimeout` | `number`  | `5000`       | The time in milliseconds after which the message will be automatically closed.<br/>(If set to `0`, the message will not be closed automatically) |
| `pauseOnHover` | `boolean` | `true`       | Whether to pause the `closeTimout` on message hover.                                                                                             |
| `loading`      | `boolean` | `true`       | Whether to display loading bar for `closeTimout`.                                                                                                |
| `direction`    | `string`  | `'ltr'`      | The direction of the message. (`'ltr'` or `'rtl'`)                                                                                               |
| `position`     | `string`  | `'top-left'` | Position of the message on the page.                                                                                                             |
| `borderRadius` | `number`  | `8`          | The border radius of the message.                                                                                                                |
| `fontFamily`   | `string`  | `undefined`  | The font family of the message. If not set, the body font will be applied.                                                                       |

These positions are available:
- `'top'`
- `'bottom'`
- `'top-left'`
- `'top-right'`
- `'bottom-left'`
- `'bottom-right'`

#### Example with options

```javascript
import Flash from 'js-flash';

new Flash('Hello World!', 'info', {
    animation: false,
    closeTimeout: 0,
    position: 'bottom-left'
});
```

### Demo

Flash messages look like this. (In `ltr` and `rtl` mode)

![Flash message demo image](https://github-production-user-asset-6210df.s3.amazonaws.com/132837374/430160624-45782d86-5e7f-4424-8251-860cd392f805.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250403%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250403T223835Z&X-Amz-Expires=300&X-Amz-Signature=0304cdde5d0431fc0c321da45c7813cfb46795b4c573ed76d77a693f02139ade&X-Amz-SignedHeaders=host)

> [!NOTE]
> You can customize the style of the flash messages in the [types configuration](#types-configuration).

## Properties

You can access the following properties of the flash message:

| Property      | Type             | Description                                           |
|:--------------|:-----------------|:------------------------------------------------------|
| `element`     | `HTMLDivElement` | The message element.                                  |
| `messageText` | `string`         | The message text.                                     |
| `messageType` | `string`         | The message type.                                     |
| `itemConfig`  | `object`         | The message configuration.                            |
| `closed`      | `boolean`        | Whether the message is closed.                        |
| `whenClosed`  | `Promise<void>`  | The promise that resolves when the message is closed. |

example:

```javascript
import Flash from 'js-flash';

const flash = new Flash('Hello World!', 'info');

flash.element.classList.add('custom-class');
flash.element.style.opacity = "0.5";

flash.whenClosed.then(() => {
    console.log('Message closed');
});
```

> [!IMPORTANT]
> all properties are read-only.

## Methods

You can use the following methods to interact with the flash message:

| Method          | Description          |
|:----------------|:---------------------|
| `close()`       | Closes the message.  |
| `pauseTimout()` | Pause `closeTimout`. |
| `playTimout()`  | Play `closeTimout`.  |

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

Also these methods are available as static methods:

| Method                      | Description                                    |
|:----------------------------|:-----------------------------------------------|
| `closeAll()`                | Closes all messages.                           |
| `closeFirst()`              | Closes the first message.                      |
| `closeLast()`               | Closes the last message.                       |
| `closeByType(type)`         | Closes all messages of the specified type.     |
| `closeByPosition(position)` | Closes all messages of the specified position. |

> [!NOTE]
> Obviously, all of these methods apply to live messages.

example:

```javascript
import Flash from 'js-flash';

Flash.closeAll();
Flash.closeByType('warning');
Flash.closeByPosition('bottom-right');
```

## Action Button

You can add an action button to the message by passing the `action` object to the constructor:

```javascript
import Flash from 'js-flash';

new Flash('Post deleted!', 'info', {
    position: 'bottom',
    action: {
        text: 'Undo',
        handler: () => {
            console.log('Undo clicked.');
        }
    }
});
```

The `action` object have the following properties:

| Property  | Type       | Description              |
|:----------|:-----------|:-------------------------|
| `text`    | `string`   | The button text.         |
| `handler` | `function` | The click event handler. |

> [!NOTE]
> You can customize the style of the action buttons in the [types configuration](#types-configuration).

## Base Configuration

You can configure the base settings of the flash messages by `setBaseConfig` method:

```javascript
import Flash from 'js-flash';

Flash.setBaseConfig({
    offset: 25,
    gap: 15
});
```

The following options are available:

| Option   | Type     | Default         | Description                                  |
|:---------|:---------|:----------------|:---------------------------------------------|
| `offset` | `number` | `20`            | The offset from the edge of the screen. (px) |
| `gap`    | `number` | `10`            | The gap between messages. (px)               |
| `types`  | `object` | (Types section) | The properties for different message types.  |

### Types Configuration

You can set these properties for different message types in base configuration:

| Property          | Description                           |
|:------------------|:--------------------------------------|
| `icon`            | Icon data URL. (`data:image/svg+xml`) |
| `color`           | Text and icon color.                  |
| `backgroundColor` | Background color.                     |
| `borderColor`     | Border color.                         |
| `loadingColor`    | Loading color.                        |
| `button`          | Button styles.                        |

Example:

```javascript
import Flash from 'js-flash';

Flash.setBaseConfig({
    types: {
        info: {
            backgroundColor: '#3498db',
            color: '#fff'
        },
        success: {
            borderColor: '#27ae60',
            button: {
                backgroundColor: '#27ae60',
                color: '#fff'
            }
        }
    }
});
```

The above code changes the default values mentioned.

Default values are:

```javascript
types = {
    info: {
        icon: 'data:image/svg+xml,...',
        color: '#2196F3',
        backgroundColor: '#E3F2FD',
        borderColor: '#BBDEFB',
        loadingColor: '#BBDEFB',
        button: {
            color: '#2196F3',
            backgroundColor: 'transparent',
            borderColor: '#BBDEFB',
        }
    },
    success: {
        icon: 'data:image/svg+xml,...',
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
    warning: {
        icon: 'data:image/svg+xml,...',
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
    error: {
        icon: 'data:image/svg+xml,...',
        color: '#F44336',
        backgroundColor: '#FFEBEE',
        borderColor: '#FFCDD2',
        loadingColor: '#FFCDD2',
        button: {
            color: '#F44336',
            backgroundColor: 'transparent',
            borderColor: '#FFCDD2',
        }
    }
}
```

## Configuring item defaults

You can configure the default settings for each message. (Constructor options)

```javascript
import Flash from 'js-flash';

Flash.setDefaultItemConfig({
    icon: false,
    animation: false,
    closeByClick: false,
    closeTimeout: 0,
    pauseOnHover: false,
    loading: false,
    position: 'bottom-right',
    borderRadius: 12,
    fontFamily: 'Arial'
});
```

## TypeScript

This package is written in TypeScript and includes type definitions.
You can use it in TypeScript projects.

```typescript
import type { BaseConfig, ItemConfig } from 'js-flash';
```

The following types are available:

| Type            | Description                                         |
|:----------------|:----------------------------------------------------|
| `FlashType`     | The flash message types.                            |
| `FlashPosition` | The flash message positions.                        |
| `ItemConfig`    | Configuration object for each item.                 |
| `BaseConfig`    | Base configuration object.                          |
| `DeepPartial`   | The utitily type to make objects optional in depth. |

example:

```typescript
import Flash from 'js-flash';
import type { BaseConfig, DeepPartial } from 'js-flash';

const obj: DeepPartial<BaseConfig> = {
    offset: 25,
    gap: 15,
    types: {
        info: {
            backgroundColor: '#3498db',
            color: '#fff'
        },
        success: {
            borderColor: '#27ae60'
        }
    }
}

Flash.setBaseConfig(obj);
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

