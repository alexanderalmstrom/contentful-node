const renderAsset = ({ fields }) => {
  const {
    title,
    file: {
      url
    }
  } = fields;

  return `<img src="${url}" alt=${title} />`;
}

const column = ({ text }) => `<p>${text}</p>`;

module.exports = renderAsset;
