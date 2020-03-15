const register = (Handlebars) => {
  var helpers = {
    switch: function(value, options) {
      this.switch_value = value;
      return options.fn(this);
    },
    case: function(value, options) {
      if (value == this.switch_value) {
        return options.fn(this);
      }
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