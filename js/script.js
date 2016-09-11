Vue.component('name-required', {

    template: '#name-required-template',

    methods: {
        onClick: function () {
            if (this.name == "" || this.name == null) {
                this.$dispatch('new-name', 'unknown');
            } else {
                this.$dispatch('new-name', this.name);
            }
            this.show = false;
            this.name = '';
        },
        showMeTheWiner: function () {
            if (!this.pwdOk) {
                this.askForPassword();
            } else {
                this.$dispatch('showMeTheWiner', null);
            }
        },
        askForPassword: function () {
            var self = this;

            swal({
                title: "Authentication",
                text: "Please, type below the password:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Password here"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                self.validatePassword(inputValue);
            });
        },
        validatePassword: function (pwd) {
            var password = '202cb962ac59075b964b07152d234b70';
            if (md5(pwd) != password) {
                swal.showInputError("Wrong Password.");
                return false
            } else {
                swal.close();
                this.pwdOk = true;
                this.showMeTheWiner();
            }
        }
    },

    data: function () {
        return {
            show: true,
            name: '',
            atLeastOne: false,
            pwdOk: false
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
            this.name = name;
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
            this.$dispatch('the-player-has-finished', this.score);
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
            score: 0,
            players: []
        }
    },
    events: {
        'showMeTheWiner': function (winer, score, players) {
            this.winer = winer;
            this.score = score;
            this.players = players;

            if (!this.score == 0) {
                this.show = true;
            } else {
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

Vue.component('countdown', {
    template: '#countdown-template',

    data: function () {
        return {
            minutes: 0,
            seconds: 0,
            show: false,
            intervalId: 0
        }
    },
    watch: {
        'seconds': function () {
            if (this.seconds == 60) {
                this.setMinutes();
                this.seconds = 0
            }
        },
        'minutes': function () {
            if (this.minutes == 1) {
                this.timeIsOver();
            }
        }
    },
    // ready: function () {
    //     setInterval(this.setSeconds, 1000);
    // },
    methods: {
        setMinutes: function () {
            this.minutes++
        },
        setSeconds: function () {
            this.seconds++
        },
        startCounting: function () {
            this.intervalId = setInterval(this.setSeconds, 1000);
        },
        timeIsOver: function () {
            swal("Your time is over", "Thanks for playing");
            this.$dispatch('partial-kill', null);
        }
    },
    events: {
        'call-to-quiz-questions': function () {
            this.show = true;
            this.startCounting();
        },
        'time-to-leave': function () {
            this.show = false;
            clearInterval(this.intervalId);
            this.$data = this.$options.data();
        }
    }
});

new Vue({
    el: 'body',

    data: function () {
        return {
            name: '',
            score: '',
            players: [],
            winersName: ''
        }
    },
    methods: {
        compare: function (a, b) {
            return b.score - a.score;
        }
    },
    events: {
        'new-name': function (name) {
            this.$broadcast('call-to-welcome', name);
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
        'the-player-has-finished': function (score) {
            this.players.push({name: this.name, score: score});
        },
        'showMeTheWiner': function () {

            this.players.sort(this.compare);

            for (var x = 0; x < this.players.length; x++) {
                if (this.players[0].score == this.players[x].score) {
                    this.winersName += this.players[x].name + ', ';
                }
            }

            this.$broadcast('showMeTheWiner', this.winersName, this.players[0].score, this.players);
            this.$broadcast('winner-was-revealed', null);
        },
        'reset': function () {
            this.$broadcast('reset', null);
            this.$data = this.$options.data();
        }
    }
});