Vue.component('name-required', {

    template: '#name-required-template',

    methods: {
        onClick: function () {
            this.$dispatch('new-name', this.name);
            this.show = false;
            this.name = '';
        },
        showMeTheWiner: function () {
            this.$dispatch('showMeTheWiner', null);
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

            'answers': [],

            score: 0,

            questions: [
                {
                    question: "Qual o nome saiyajin de Goku",
                    options: [{option: 'Kakaroto'}, {option: 'Broly'}, {option: 'Kame'}],
                    answer: 'Kakaroto',
                    order: '0'
                },
                {
                    question: "Complete a frase: somos melhores do que",
                    options: [{option: 'Java'}, {option: 'Mandril'}, {option: 'PHP'}],
                    answer: 'Mandril',
                    order: '1'
                }
            ]
        }
    },
    methods: {
        analyzeTheAnswers: function () {
            for (var x = 0; x < this.answers.length; x++) {
                if (this.questions[x].answer === this.answers[x]) {
                    this.score++;
                }
            }
        }
    },
    events: {
        'call-to-quiz-questions': function () {
            this.show = true;
            this.$dispatch('call-to-end-questions', null);
        },
        'time-to-leave': function () {
            this.show = false;
            this.analyzeTheAnswers();
            this.answers = [];
            this.$dispatch('the-current-score', this.score);
            this.score = '';
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
        onClick: function () {
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
            show: false,
            winer: '',
            score: 0
        }
    },
    events: {
        'showMeTheWiner': function (winer, score) {
            this.winer = winer;
            this.score = score;
            this.show = true;
        }
    }
});

new Vue({
    el: 'body',

    data: {
        name: '',
        score: 0
    },

    events: {
        'new-name': function (name) {
            this.$broadcast('call-to-welcome', name);
            //this.name.push(name);
            this.name = name;
        },
        'call-to-quiz': function () {
            this.$broadcast('call-to-quiz-questions', null);
        },
        'call-to-end-questions': function () {
            this.$broadcast('call-to-end-questions', null);
        },
        'partial-kill': function () {
            this.$broadcast('time-to-leave', null);
            this.$broadcast('come-to-life', null);
        },
        'the-current-score': function (score) {

            if (this.score < score) {
                this.score = score;
            }
        },
        'showMeTheWiner': function () {
            this.$broadcast('showMeTheWiner', this.name, this.score);
        }
    }
});