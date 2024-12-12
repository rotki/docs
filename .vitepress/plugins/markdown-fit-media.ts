// Modified from https://github.com/ulfschneider/markdown-it-fitmedia
import * as cheerio from 'cheerio';
import sizeOf from 'image-size';
import type MarkdownIt from 'markdown-it';

interface FitMediaOptions {
  imgDir?: string;
  imgLazyLoad?: boolean;
  imgDecoding?: string;
  imgSizeHint?: boolean;
  lazyLoad?: boolean;
  decoding?: string;
  sizeHint?: boolean;
  fitElements?: string[];
}

interface Dimensions {
  width: number;
  height: number;
}

interface Token {
  content: string;
  attrIndex: (key: string) => number;
  attrs: [string, string][];
  attrPush: (attr: [string, string]) => void;
}

function getDimensions(src: string, fitMediaOptions: FitMediaOptions): Dimensions {
  if (fitMediaOptions.imgDir) {
    return sizeOf(`${fitMediaOptions.imgDir}${src}`);
  }
  return sizeOf(src);
}

function styleAspectRatio(style: string | undefined, width: number, height: number): string {
  if (style && !/aspect-ratio/i.test(style)) {
    if (!/;\s*$/.test(style)) {
      style += '; ';
    }
    style += `aspect-ratio:${width}/${height};`;
  }
  else {
    style = `aspect-ratio:${width}/${height};`;
  }
  return style;
}

function fitHtmlElements(md: MarkdownIt, fitMediaOptions: FitMediaOptions): void {
  const blockRenderer = md.renderer.rules.html_block;
  const elementRenderer = (tokens: Token[], idx: number): string | undefined => {
    try {
      const token = tokens[idx];
      const $ = cheerio.load(token.content);
      const elements = $(fitMediaOptions.fitElements?.toString() || '');

      if (elements.length > 0) {
        elements.each(function () {
          const width = parseInt($(this).attr('width') || '0');
          const height = parseInt($(this).attr('height') || '0');
          if (width > 0 && height > 0) {
            let style = $(this).attr('style');
            style = styleAspectRatio(style, width, height);
            style += ' width:100%; max-width:100%; height:auto;';
            $(this).attr('style', style);
          }
        });
        return $('body').html() || undefined;
      }
    }
    catch (error) {
      console.error(`Failure when fitting media element ${error}`);
    }
  };

  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: any, env: any, self: any): string => {
    const html = elementRenderer(tokens, idx);
    return html || blockRenderer(tokens, idx, options, env, self);
  };
}

function fitHtmlImgs(md: MarkdownIt, fitMediaOptions: FitMediaOptions): void {
  const inlineRenderer = md.renderer.rules.html_inline;
  const blockRenderer = md.renderer.rules.html_block;
  const imgRenderer = (tokens: Token[], idx: number): string | undefined => {
    try {
      const token = tokens[idx];
      const $ = cheerio.load(token.content);
      const imgs = $('img');
      if (imgs.length > 0) {
        imgs.each(function () {
          if (fitMediaOptions.imgLazyLoad) {
            $(this).attr('loading', 'lazy');
          }
          if (fitMediaOptions.imgDecoding && fitMediaOptions.imgDecoding !== 'auto') {
            $(this).attr('decoding', fitMediaOptions.imgDecoding);
          }
          const src = $(this).attr('src');
          if (src) {
            const dimensions = getDimensions(src, fitMediaOptions);
            const height = dimensions.height;
            const width = dimensions.width;
            if (height > 0 && width > 0) {
              let style = $(this).attr('style');
              style = styleAspectRatio(style, width, height);
              $(this).attr('style', style);
              $(this).attr('width', width.toString());
              $(this).attr('height', height.toString());
            }
          }
        });
        return $('body').html() || undefined;
      }
    }
    catch (error) {
      console.error(`Failure when adjusting img ${error}`);
    }
  };

  md.renderer.rules.html_inline = (tokens: Token[], idx: number, options: any, env: any, self: any): string => {
    const html = imgRenderer(tokens, idx);
    return html || inlineRenderer(tokens, idx, options, env, self);
  };

  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: any, env: any, self: any): string => {
    const html = imgRenderer(tokens, idx);
    return html || blockRenderer(tokens, idx, options, env, self);
  };
}

function fitMarkdownImgs(md: MarkdownIt, fitMediaOptions: FitMediaOptions): void {
  const attr = (token: Token, key: string, value?: string): string | null => {
    const idx = token.attrIndex(key);
    if (value === undefined) {
      return idx >= 0 ? token.attrs[idx][1] : null;
    }
    else {
      if (idx < 0) {
        token.attrPush([key, value]);
      }
      else {
        token.attrs[idx][1] = value;
      }
      return value;
    }
  };

  const defaultRender = md.renderer.rules.image;
  md.renderer.rules.image = (tokens: Token[], idx: number, options: any, env: any, self: any): string => {
    try {
      const img = tokens[idx];

      if (fitMediaOptions.imgLazyLoad) {
        attr(img, 'loading', 'lazy');
      }
      if (fitMediaOptions.imgDecoding && fitMediaOptions.imgDecoding !== 'auto') {
        attr(img, 'decoding', fitMediaOptions.imgDecoding);
      }

      const src = attr(img, 'src');
      if (src) {
        const dimensions = getDimensions(src, fitMediaOptions);
        const height = dimensions.height;
        const width = dimensions.width;
        if (height > 0 && width > 0) {
          let style = attr(img, 'style');
          style = styleAspectRatio(style || '', width, height);
          attr(img, 'style', style);
          attr(img, 'width', width.toString());
          attr(img, 'height', height.toString());
        }
      }
    }
    catch (error) {
      console.error(`Failure when adjusting img ${error}`);
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

function fitImgs(md: MarkdownIt, fitMediaOptions: FitMediaOptions): void {
  fitHtmlImgs(md, fitMediaOptions);
  fitMarkdownImgs(md, fitMediaOptions);
}

function markdownFitMedia(md: MarkdownIt, options: FitMediaOptions): void {
  fitImgs(md, options);
  fitHtmlElements(md, options);
}

export { markdownFitMedia };
