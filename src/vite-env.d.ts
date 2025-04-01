// <reference types="vite/client" />

declare module '*.svg' {
    const content: HTMLElement;
    export default content;
}