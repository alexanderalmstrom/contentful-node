const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

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

const column = ({ text, inline }) => { 
  const className = inline ? 'column__inline' : 'column__block';
  
  return `
    <div class="${className}">
      ${text}
    </div>
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

  return `<img src="${url}?w=960&q=70&fm=webp" alt=${title} />`;
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
