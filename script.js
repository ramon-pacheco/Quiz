Vue.component('name-required', {

   template: '#name-required-template',

   methods: {
      onClick: function () {
         this.$dispatch('new-name', this.name);
         this.show = false;
         this.name = '';
      }
   },

   data: function () {
      return {
         show: true,
         name: ''
      }
   },
   events: {
      'come-to-life': function (e) {
         this.show = true;
      }
   }
});

Vue.component('welcome', {

   template: '#welcome-template',

   data: function () {
      return {
         name: '',
         show: false
      }
   },

   events: {
      'call-to-welcome': function (name) {
         this.show = true;
         this.name = name;
         this.$dispatch('call-to-quiz', null);
      },
      'time-to-leave': function (e) {
         this.show = false;
      }
   }
});

Vue.component('quiz-questions', {

   template: '#quiz-questions-template',

   data: function () {
      return {
         show: false,

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
   },
   events: {
      'call-to-quiz-questions': function (e) {
         this.show = true;
         this.$dispatch('call-to-end-questions', null);
      },
      'time-to-leave': function () {
         this.show = false;
      }
   }
});

Vue.component('end-questions', {

   template: '#end-questions-template',

   data: function () {
      return {
         show: false
      }
   },
   methods: {
      teste: function () {
         this.$dispatch('partial-kill', null);

      }
   },
   events: {
      'call-to-end-questions': function (e) {
         this.show = true;
      },
      'time-to-leave': function (e) {
         this.show = false;
      }
   }

});

Vue.component('winner', {

   template: '#winner-template',

   data: function () {
      return {
         show: false
      }
   }
});

new Vue({
   el: 'body',
    
   data: {
      name: []
   },

   events: {
      'new-name': function (name) {
         this.$broadcast('call-to-welcome', name);
         this.name.push(name);
      },
      'call-to-quiz': function (e) {
         this.$broadcast('call-to-quiz-questions', null);
      },
      'call-to-end-questions': function (e) {
         this.$broadcast('call-to-end-questions', null);
      },
      'partial-kill': function (e) {
         this.$broadcast('time-to-leave', null);
         this.$broadcast('come-to-life', null);
      }
   }
});