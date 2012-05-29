window.ss = require('socketstream');

ss.server.on('ready', function(){
  $(function(){
    var currentValue = '// enter code';
    var padId = Math.random();

    var editor = CodeMirror.fromTextArea(document.getElementById('pad'), {
      mode: 'javascript',
      theme: 'ambiance',
      lineNumbers: true,
      onChange: function(editor) {
        updated = editor.getValue();
        if (updated != currentValue) {
          return ss.rpc('editor.update', updated, padId);
        }
      }
    });

    window.load = function(src) {
      var script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }

    ss.event.on('update', function(message, id) {
      if (id == padId) { return }

      currentValue = message;
      var cursor = editor.getCursor();
      editor.setValue(currentValue);
      editor.setCursor(cursor);
    });
      
    var script = document.createElement('script');
    document.body.appendChild(script);

    window.run = function() {
      script.textContent = editor.getValue();
    }

    ss.event.on('run', function() {
      run();

      $('#run').text('Success');
      setTimeout(function() {
        $('#run').text('Run');
      }, 500);
    });

    $('#run').click(function(e) {
      $('#run').text('Updating');
      return ss.rpc('editor.run');
    });
  });

});
