    (function () {
        var highLife = 0;
        var initialDelay = 1000;
        var speed = 500;

        var x_adjust = 90;
        var y_adjust = 75;

        var size = 4
        var space = 1;
        var size = {x: size, y: size};
        
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        // INIT //
        if (highLife) {
            var pattern = ["4_4", "4_5", "4_6", "5_3", "6_3", "7_3"];
        } else {
            var pattern = ["2_2", "3_2", "4_2", "3_3", "2_1"];
        }

        // Fill life array
        var life = [];
        for (var i in pattern) {
            life[pattern[i]] = [1, 2];
        }

        // First time paint
        life = calcAndPaintLife();

        // ANIMATE //
        setTimeout(function () {
            setInterval(function () {
                // Calc new cycle
                doLifeCycle(life);
                // And paint that one
                life = calcAndPaintLife();
            }, speed);
        }, initialDelay);

        return;

        function doLifeCycle() {
            for (var c in life) {
                var pos = getPos(c);
                updateLife((pos.x - 1), (pos.y - 1));
                updateLife((pos.x - 0), (pos.y - 1));
                updateLife((pos.x + 1), (pos.y - 1));
                updateLife((pos.x - 1), (pos.y - 0));
                updateLife((pos.x + 1), (pos.y - 0));
                updateLife((pos.x - 1), (pos.y + 1));
                updateLife((pos.x - 0), (pos.y + 1));
                updateLife((pos.x + 1), (pos.y + 1));
            }
        }

        function updateLife(x, y) {
            var index = x + '_' + y;
            if (typeof life[index] === 'undefined') {
                life[index] = [0, 1];
            } else {
                life[index][1]++;
            }
            return life;
        }

        function calcAndPaintLife() {
            // CLEAR
            context.clearRect(0, 0, canvas.width, canvas.height);

            var newlife = new Array();
            for (var c in life) {
                var pos = getPos(c);

                if ((life[c][0] === 1 && (life[c][1] === 2 || life[c][1] === 3)) ||
                    (life[c][0] === 0 && (life[c][1] === 3 || (highLife && life[c][1] === 6)))
                    ) {
                    // When currenr life 2 or 3
                    switch (life[c][0] + '_' + life[c][1]) {
                        case '1_2': var color = 'blue';     break;
                        case '1_3':     color = 'darkblue'; break;
                        case '0_3':     color = 'red';      break;
                        case '0_6':     color = 'green';    break;
                    }

                    paintRect(pos.x, pos.y, color, life[c][1]);
                    newlife[c] = [1, 0];
                }
            }

            return newlife;
        }

        function getPos(string) {
            var split = string.split('_');
            return {
                x: parseInt(split[0], 10),
                y: parseInt(split[1], 10)
            };
        }

        function paintRect(x, y, color, text) {
            context.beginPath();
            context.rect((x + x_adjust) * (size.x + space), (y + y_adjust) * (size.y + space), size.x, size.y);
            context.fillStyle = color;
            context.fill();
        }
    })();

