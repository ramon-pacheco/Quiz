Vue.component('welcome', {

   template: '#welcome-template',

   data: function () {
      return {
         name: 'teste',
         show: true
      }
   }
});

Vue.component('name-required', {

   template: '#name-required-template',

   data: function () {
      return {
         show: true
      }
   }
});

Vue.component('quiz-questions', {

   template: '#quiz-questions-template',

   data: function () {
      return {
         show: true,

         questions: [
            {
               question: "Qual o nome saiyajin de Goku",
               options: [{option: 'Kakaroto'}, {option: 'Broly'}, {option: 'Kame'}],
               answer: 'Kakaroto',
               order: 'first'
            },
            {
               question: "Complete a frase: somos melhores do que",
               options: [{option: 'Java'}, {option: 'Mandril'}, {option: 'PHP'}],
               answer: 'Mandril',
               order: 'second'
            }
         ]
      }
   }
});

Vue.component('end-questions', {

   template: '#end-questions-template'

});

Vue.component('winner', {

   template: '#winner-template',

   data: function () {
      return {
         show: true
      }
   }
});

new Vue({
   el: 'body',
    
   data: {
      name: 'Ramon'
   }
});