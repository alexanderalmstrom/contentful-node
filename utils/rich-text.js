const { BLOCKS, INLINES } = require('@contentful/rich-text-types');
const marked = require('marked');

const entry = ({ sys, fields, inline }) => {
  const {
    contentType: {
      sys: {
        id
      }
    },
  } = sys;

  switch(id) {
    case 'column':
      return column({ ...fields, inline });
    case 'post':
      return post({...fields, inline });
  }
}

const column = ({ text, size, collapse, align, inline }) => { 
  const blockClass = inline ? 'column__inline' : 'column__block';
  const sizeClass = size ? `col-${size}` : 'col-12';
  const collapseClass = collapse ? 'collapse' : '';
  const alignClass = align ? align.toLowerCase() : '';

  const blockClassName = [blockClass, collapseClass].join(' ');
  const inlineClassName = inline ? [
    blockClass,
    sizeClass,
    alignClass,
    collapseClass
  ].join(' ') : [sizeClass].join(' ');

  return `
    ${inline ? '' : `<div class="container ${blockClassName}">`}
      <div class="${inlineClassName}">
        ${marked(text)}
      </div>
    ${inline ? '' : '</div>'}
  `;
}

const post = ( { slug, name, inline } ) => {
  const className = inline ? 'post__inline' : 'post__block';

  return `
    <div class="${className}">
      <h2>
        <a href="/post/${slug}">${name}</a>
      </h2>
    </div>
  `;
}

const asset = ({ fields }) => {
  const {
    title,
    file: {
      url
    }
  } = fields;

  const defaults = ['q=70'];
  const params = ['w=1680'];

  const webpSrc = url + '?' + ['fm=webp'].concat(defaults, params).join('&');
  const jpgSrc = url + '?' + ['fm=jpg'].concat(defaults, params).join('&');

  return `
    <picture class="post__image">
      <source type="image/webp" srcset="${webpSrc}">
      <source type="image/jpeg" srcset="${jpgSrc}">
      <img src="${jpgSrc}" alt="${title}" loading="lazy">
    </picture>
  `;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => entry({ ...data.target }),
    [INLINES.EMBEDDED_ENTRY]: ({ data }) => entry({ ...data.target, inline: true }),
    [BLOCKS.EMBEDDED_ASSET]: ({ data }) => asset({ ...data.target })
  }
}

module.exports = {
  richTextOptions
};
