/// <reference types="vite/client" />

declare module '*?asset' {
    const src: string;
    export default src;
}

declare module '*?raw' {
    const content: string;
    export default content;
}
