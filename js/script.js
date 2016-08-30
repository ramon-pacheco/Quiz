Vue.component('name-required', {

    template: '#name-required-template',

    methods: {
        onClick: function () {
            this.$dispatch('new-name', this.name);
            this.show = false;
            this.name = '';
        },
        showMeTheWiner: function () {
            var password = 1;
            var passwordEntered = this.askForPassword;
            if (passwordEntered() === password) {
                this.$dispatch('showMeTheWiner', null);
            }
        },
        askForPassword: function () {
            var x;
            var self = this;
            swal({
                title: "Type the password please",   
                // text: "Write something interesting:",   
                type: "input",   
                showCancelButton: true,   
                closeOnConfirm: false,   
                animation: "slide-from-top",   
                inputPlaceholder: "password" 
            }, 
            function(inputValue){   
                if (inputValue === false) self.x = false;

                if (inputValue === "") {     
                    swal.showInputError("You need to write something!");     
                    self.x = false   
                }
                self.x = inputValue;
            });
            return x;
        }
    },

    data: function () {
        return {
            show: true,
            name: '',
            atLeastOne: false
        }
    },
    events: {
        'come-to-life': function () {
            this.show = true;
        },
        'at-least-one-answer': function () {
            this.atLeastOne = true;
        },
        'winner-was-revealed': function () {
            this.show = false;
        },
        'reset': function () {
            this.$data = this.$options.data();
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
            this.name = name == "" || name == null ? 'unknown' : name;
            this.$dispatch('call-to-quiz', null);
        },
        'time-to-leave': function (e) {
            this.show = false;
        },
        'reset': function () {
            this.$data = this.$options.data();
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
        },
        'reset': function () {
            this.$data = this.$options.data();
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
        },
        'reset': function () {
            this.$data = this.$options.data();
        }
    }

});

Vue.component('winner', {

    template: '#winner-template',

    data: function () {
        return {
            show: false,
            noScore: false,
            winer: '',
            score: 0
        }
    },
    events: {
        'showMeTheWiner': function (winer, score) {
            this.winer = winer;
            this.score = score;
            
            if(!this.score == 0){
                this.show = true;
            }else {
                this.noScore = true;
            }
        },
        'reset': function () {
            this.$data = this.$options.data();
        }
    },
    methods: {
        reset: function () {
            this.$dispatch('reset', null);
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
            this.$broadcast('at-least-one-answer', null);
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
            this.$broadcast('winner-was-revealed', null);
        },
        'reset': function () {
            this.$broadcast('reset', null);
        }
    }
});