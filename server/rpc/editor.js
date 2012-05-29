exports.actions = function(req, res, ss) {
  req.use('session');

  return {
    update: function(message, pad) {
      ss.publish.all('update', message, pad);
      return res(true);
    },

    mode: function(language) {
      ss.publish.all('mode', language);
    },

    run: function(message, pad) {
      ss.publish.all('run');
    }
  };
};
