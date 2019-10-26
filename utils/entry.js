const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const renderEntryBlock = ({ sys, fields }) => {
  const {
    contentType: {
      sys: {
        id
      }
    },
  } = sys;

  switch(id) {
    case 'column':
      return columnBlock({ ...fields });
    case 'post':
      return postBlock({...fields });
  }
}

const renderEntryInline = ({ sys, fields }) => {
  const {
    contentType: {
      sys: {
        id
      }
    },
  } = sys;

  switch(id) {
    case 'column':
      return columnInline({ ...fields });
    case 'post':
      return postInline({ ...fields });
  }
}

const columnBlock = ({ text }) => {  
  return `
    <div class="column__block">
      ${text}
    </div>
  `;
}

const columnInline = ({ text }) => {
  return `
    <div class="column__inline">
      ${text}
    </div>
  `;
}

const postBlock = ( { slug, name } ) => {
  return `
    <div class="post__block">
      <h2>
        <a href="/post/${slug}">${name}</a>
      </h2>
    </div>
  `;
}

const postInline = ( { slug, name } ) => {
  return `
    <div class="post__inline">
      <h2>
        <a href="/post/${slug}">${name}</a>
      </h2>
    </div>
  `;
}

module.exports = {
  renderEntryBlock,
  renderEntryInline
};
