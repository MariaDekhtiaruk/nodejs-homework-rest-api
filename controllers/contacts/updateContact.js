const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  // щоб повернути оновлений об'єкт потрібно поставити { new: true }, інакше Postman відобразить попереднє
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!result) {
    throw RequestError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = updateContact;
