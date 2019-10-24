const renderEntry = ({ sys, fields }) => {
  const {
    contentType: {
      sys: {
        id
      }
    },
  } = sys;

  switch(id) {
    case 'column':
      return column(fields);
  }
}

const column = ({ text }) => `<p>${text}</p>`;

module.exports = renderEntry;
