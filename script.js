(function calculator() {
   //variables
   var num, opp, numArr, opArr, screen, history, fill, answer, pressedkey, press, conNumber, total, clear, equals, lastPressedOp;
   num = document.querySelectorAll('#num');
   opp = document.querySelectorAll('#op');
   screen = document.querySelector('#small');
   answer = document.querySelector('#big');
   clear = document.querySelector('#clear');
   equals = document.querySelector('#equals');
   history = document.querySelector('#history');
   fill = document.querySelector('#fill');
   pressedkey = '';
   press = '';
   numArr = [];
   opArr = [];
   conNumber = 0;
   total = 0;
   
   var button = {
      numbersPress: function(i) {
         num[i].addEventListener('click', function(){
            // 1 save pressed key
            pressedkey += num[i].value;
            press += num[i].value;
            // 2 convert string to number
            conNumber = parseFloat(press);
            // 3 render pressedkey to ui
            screen.textContent = pressedkey;
         })
      },
      operatorPress: function(i) {
         opp[i].addEventListener('click', function() {
            pressedkey += ' ' + opp[i].value + ' ';
            screen.textContent = pressedkey;
            if (total === 0 && !pressedkey.startsWith(' ')) {
               total = conNumber;
            } else if (pressedkey.startsWith(' ')) {
               total = 0;
            } else {
               numArr.push(conNumber);
            }
            opArr.push(opp[i].value);
            conNumber = 0;
            press = '';
         })
      }
   }
   
   // create object for each key 
   for (var i = 0; i < num.length; i++) {
      button.numbersPress(i);
   };
   for (var j = 0; j < opp.length; j++) {
      button.operatorPress(j);
   };
   
   // clear button
   clear.addEventListener('click', function() {
      pressedkey = '';
      total = 0;
      numArr = [];
      opArr = [];
      screen.textContent = '';
      answer.textContent = '';
   });
   
   // equals button
   equals.addEventListener('click', function() {
      if (total === 0 && !pressedkey.startsWith(' ')) {
         total = conNumber;
      }
      numArr.push(conNumber);
      for (var f = 0; f < opArr.length; f++) {
            if (opArr[f] === '+') {
               total += numArr[f];
            } else if (opArr[f] === '-') {
               total -= numArr[f];
            } else if (opArr[f] === '*') {
               total *= numArr[f];
            } else if (opArr[f] === '/') {
               if (total !== 0) {
                  total /= numArr[f];
               } else {
                  answer.textContent = 'error';
               }
            }
      }
      var markup = '<hr><div class="screen"><div class="row">'+pressedkey+'</div><div class="row2">'+total+'</div></div>';
      history.insertAdjacentHTML('beforeend', markup);
      conNumber = 0;
      press = '';
      answer.textContent = total;
      numArr = [];
      opArr = [];
   });
   
   // history and and calculator switch
   document.querySelector('.space').addEventListener('click', function(){
      document.querySelector('.history').style.display = 'block';
   });
   document.querySelector('.history-button').addEventListener('click', function(){
      document.querySelector('.history').style.display = 'none';
   });
})();