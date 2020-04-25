(function() {
   //variables
   var num, opp, del, screen, history, answer, pressedkey, press, clear, equals;
   num = document.querySelectorAll('#num');
   opp = document.querySelectorAll('#op');
   screen = document.querySelector('#small');
   answer = document.querySelector('#big');
   clear = document.querySelector('#clear');
   equals = document.querySelector('#equals');
   history = document.querySelector('#history');
   del = document.querySelector('#del')
   pressedkey = '';
   press = '';
   
   var button = {
      numbersPress: function(i) {
         num[i].addEventListener('click', function(){
            if (answer.textContent !== ''){
               answer.textContent = '';
               press = '';
               screen.textContent = '';
               pressedkey = '';
            }
            // 1 save pressed key
            pressedkey += num[i].value;
            press += num[i].value;
            // 3 render pressedkey to ui
            screen.textContent = pressedkey;
         })
      },
      operatorPress: function(i) {
         opp[i].addEventListener('click', function() {
            pressedkey += ' ' + opp[i].value + ' ';
            screen.textContent = pressedkey;
            if (opp[i].value === '×') {
               press += ' * ';
            } else if (opp[i].value === '÷') {
               press += ' / ';
            } else {
               press += ' ' + opp[i].value + ' ';
            }
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
      screen.textContent = null;
      answer.textContent = null;
   });
   
   // equals button
   equals.addEventListener('click', function() {
      try {
         answer.textContent = eval(press);
         var markup = '<hr><div class="screen"><div class="row">'+pressedkey+'</div><div class="row2">'+eval(press)+'</div></div>';
         history.insertAdjacentHTML('beforeend', markup);
      } catch (error){
         answer.textContent = 'input error';
      }
      
   });
   
   // clear one
   del.addEventListener('click', function() {
      if (pressedkey.endsWith(' ')) {
         pressedkey = pressedkey.substring(0, pressedkey.length - 3);
         press = press.substring(0, press.length - 3);
         screen.textContent = pressedkey;
      } else {
         pressedkey = pressedkey.substring(0, pressedkey.length - 1);
         press = press.substring(0, press.length - 1);
         screen.textContent = pressedkey;
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