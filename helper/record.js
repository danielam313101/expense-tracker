module.exports = {
  validateRecord: (req, errors) => {
    const attributes = [
      ['name', '名稱'],
      ['amount', '金額'],
      ['category', '類別'],
      ['date', '日期']
    ]
    attributes.forEach(([element, chineseElement]) => {
      if (req.body[element] === '' ) {
        errors.push({ message: `${chineseElement} 未填` })
      }
    });
    return errors
  }
}