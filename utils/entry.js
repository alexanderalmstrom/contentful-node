const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const renderEntry = ({ sys, fields, inline }) => {
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

module.exports = renderEntry;
