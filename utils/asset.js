const renderAsset = ({ fields }) => {
  const {
    title,
    file: {
      url
    }
  } = fields;

  return `<img src="${url}?w=960&q=70&fm=webp" alt=${title} />`;
}

module.exports = renderAsset;
