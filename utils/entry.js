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
      return columnBlock({ ...sys, ...fields });
    case 'post':
      return postBlock({ ...sys, ...fields });
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
      return columnInline({ ...sys, ...fields });
    case 'post':
      return postInline({ ...sys, ...fields });
  }
}

const columnBlock = ({ text }) => {
  return (`
    <div class="column__block">
      <p>${text}</p>
    </div>
  `);
}

const columnInline = ({ text }) => {
  return (`
    <div class="column__inline">
      <p>${text}</p>
    </div>
  `);
}

const postBlock = ( { contentType, slug, name } ) => {
  return (`
    <div class="post__block">
      <h2>
        <a href="/${contentType.sys.id}/${slug}">${name}</a>
      </h2>
    </div>
  `)
}

const postInline = ( { contentType, slug, name } ) => {
  return (`
    <div class="post__inline">
      <h2>
        <a href="/${contentType.sys.id}/${slug}">${name}</a>
      </h2>
    </div>
  `)
}

module.exports = {
  renderEntryBlock,
  renderEntryInline
};
