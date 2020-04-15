(function() {
   //variables
   var num, opp, del, numArr, opArr, screen, history, fill, answer, pressedkey, press, conNumber, total, clear, equals;
   num = document.querySelectorAll('#num');
   opp = document.querySelectorAll('#op');
   screen = document.querySelector('#small');
   answer = document.querySelector('#big');
   clear = document.querySelector('#clear');
   equals = document.querySelector('#equals');
   history = document.querySelector('#history');
   fill = document.querySelector('#fill');
   del = document.querySelector('#del')
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
            numArr.push(conNumber);
            opArr.push(opp[i].value);
            conNumber = 0;
            press = '';
         })
      }
   };
   
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
      press = '';
      total = 0;
      conNumber = 0;
      numArr = [];
      opArr = [];
      screen.textContent = null;
      answer.textContent = null;
   });
   
   // equals button
   equals.addEventListener('click', function() {
      if (numArr.length === opArr.length) {
         numArr.push(conNumber);
      }
      total = numArr[0];
      if (numArr.length > 1) {
         for (var n = 0; n < opArr.length; n++) {
            if (opArr[n] === '+') {
               total += numArr[n + 1];
            } else if (opArr[n] === '-') {
               total -= numArr[n + 1];
            } else if (opArr[n] === '×') {
               total *= numArr[n + 1];
            } else if (opArr[n] === '÷') {
               total /= numArr[n + 1];
            }
         }
      };
      var markup = '<hr><div class="screen"><div class="row">'+pressedkey+'</div><div class="row2">'+total+'</div></div>';
      history.insertAdjacentHTML('beforeend', markup);
      conNumber = 0;
      press = '';
      answer.textContent = total;
   });
   
   // clear one
   del.addEventListener('click', function() {
      if (conNumber !== 0) {
         numArr.push(conNumber);
         conNumber = 0;
         pressed = '';
      }
      if (pressedkey.endsWith(' ')) {
         pressedkey = pressedkey.substring(0, pressedkey.length - 3);
         screen.textContent = pressedkey;
         opArr.pop();
      } else {
         pressedkey = pressedkey.substring(0, pressedkey.length - 1);
         screen.textContent = pressedkey;
         var lastNum = numArr[numArr.length - 1].toString();
         numArr.pop();
         if (lastNum.length > 1) {
            lastNum = lastNum.substring(0, lastNum.length - 1);
            lastNum = parseFloat(lastNum);
            numArr.push(lastNum);
         }
      }
   });
   
   // history and and calculator switch
   document.querySelector('.space').addEventListener('click', function(){
      document.querySelector('.history').style.display = 'block';
   });
   document.querySelector('.history-button').addEventListener('click', function(){
      document.querySelector('.history').style.display = 'none';
   });
   
})();