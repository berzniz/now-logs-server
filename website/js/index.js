$(function() {
    var data1 = [
        {
            action: 'type',
            strings: ['cat index.js'],
            output: $('.cat-index-js').html(),
            postDelay: 2000
        },
        {
            action: 'type',
            strings: ['now'],
            output: $('.now').html(),
            postDelay: 200
        }
    ];

    var timeOutput = function() {
        return '<span class="gray">Hello, the time is ' + new Date() + '</span>';
    };

    var data2 = [
        {
            action: 'type',
            strings: ['npm install now-logs -g'],
            output: '<span class="gray">+now-logs@0.0.3 installed globally</span><br>&nbsp;',
            postDelay: 1000
        },
        {
            action: 'type',
            strings: ['now-logs make-up-a-secret'],
            output: '<span class="gray">Connecting...</span>'
        },
        {
            action: 'view',
            output: '<span class="gray">Connected to </span> make-up-a-secret'
        },
        {
            action: 'view',
            output: timeOutput
        },
        {
            action: 'view',
            output: timeOutput
        },
        {
            action: 'view',
            output: timeOutput
        },
        {
            action: 'view',
            output: timeOutput
        },
        {
            action: 'view',
            output: timeOutput
        },
        {
            action: 'view',
            output: '<span class="gray">and so on...</span>'
        }
    ];

    var terminal1 = $('.terminal-1');
    var terminal2 = $('.terminal-2');

    function runScripts(terminal, data, pos) {
        var prompt = terminal.find('.prompt');
        var script = data[pos];

        var handler = function(noPrompt) {
            var history = terminal.find('.history').html();
            history = history ? [history] : [];
            if (!noPrompt) {
                history.push('$ ' + prompt.text());
            }
            if (script.output) {
                var output = (typeof script.output === 'function') ? script.output() : script.output;
                history.push(output);
                prompt.html('');
                terminal.find('.history').html(history.join('<br>'));
            }
            // scroll to bottom of screen
            terminal.find('.terminal').scrollTop(terminal.find('.terminal').height());
            // Run next script
            pos++;
            if (pos < data.length) {
                setTimeout(function() {
                    runScripts(terminal, data, pos);
                }, script.postDelay || 1000);
            }
            else {
                setTimeout(function() {
                    if (data === data1) {
                        terminal2.addClass('show');
                        runScripts(terminal2, data2, 0);
                    }
                }, script.postDelay || 1000);
            }
        };

        if (script.clear === true) {
            terminal.find('.history').html('');
        }

        switch (script.action) {
            case 'type':
                // cleanup for next execution
                prompt.removeData();
                terminal.find('.typed-cursor').text('');
                prompt.typed({
                    strings: script.strings,
                    typeSpeed: 30,
                    callback: handler
                });
                break;
            case 'view':
                handler(true);
                break;
        }
    }


    runScripts(terminal1, data1, 0);
});

