const moment = require('moment')

const register = (Handlebars) => {
  let helpers = {
    switch: function(value, options) {
      this.switch_value = value;
      return options.fn(this);
    },
    case: function(value, options) {
      if (value == this.switch_value) {
        return options.fn(this);
      }
    },
    select: function(selected, options) {
      return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    },
    formatDate: function(date, format) {
      return moment(date).format(format);
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);