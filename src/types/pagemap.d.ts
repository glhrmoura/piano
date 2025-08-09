declare module 'pagemap' {
  interface PagemapOptions {
    viewport: HTMLElement;
    back?: string;
    view?: string;
    drag?: string;
    styles?: Record<string, string>;
  }

  function pagemap(canvas: HTMLCanvasElement, options: PagemapOptions): void;

  export = pagemap;
}
