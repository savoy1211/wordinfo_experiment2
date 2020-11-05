/**
 * jspsych-cloze
 * Philipp Sprengholz
 *
 * Plugin for displaying a cloze test and checking participants answers against a correct solution.
 *
 * documentation: docs.jspsych.org
 **/
var score = 0;
var trial_num = 1;
jsPsych.plugins['cloze'] = (function () {

    var plugin = {};
    plugin.info = {
        name: 'cloze',
        description: '',
        parameters: {
            text: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Cloze text',
                default: undefined,
                description: 'The cloze text to be displayed. Blanks are indicated by %% signs and automatically replaced by input fields. If there is a correct answer you want the system to check against, it must be typed between the two percentage signs (i.e. %solution%).'
            },
            button_text: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button text',
                default: 'OK',
                description: 'Text of the button participants have to press for finishing the cloze test.'
            },
            check_answers: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Check answers',
                default: false,
                description: 'Boolean value indicating if the answers given by participants should be compared against a correct solution given in the text (between % signs) after the button was clicked.'
            },
            mistake_fn: {
                type: jsPsych.plugins.parameterType.FUNCTION,
                pretty_name: 'Mistake function',
                default: function () {},
                description: 'Function called if check_answers is set to TRUE and there is a difference between the participants answers and the correct solution provided in the text.'
            },
            data: {
                correct: {
                    type: jsPsych.plugins.parameterType.BOOL,
                    pretty_name: 'Correct Answer',
                    default: false,
                    description: "Indicates whether the participant answered correctly or not."
                },
                total_score: {
                    type: jsPsych.plugins.parameterType.INT,
                    pretty_name: "Score",
                    default: score,
                    description: "Number of points indicating total number of correct answers."
                }
            }
        }
    };

    plugin.trial = function (display_element, trial) {
        // console.log(jsPsych.currentTrial())
        var html = '<div class="cloze">';
        var elements = trial.text.split('%');
        var solutions = [];

        for (i=0; i<elements.length; i++)
        {
            if (i%2 === 0)
            {
                html += elements[i];
            }
            else
            {
                solutions.push(elements[i].trim());

                html += '<input type="text" id="input'+(solutions.length-1)+'" value="">';
            }
        }
        html += '<p>Score: <a>'+score.toString()+'</a></p></div>';
        
        var trial_count = '<p>Trial #'+trial_num+' out of 30</p>'
        display_element.innerHTML = '<a target="_blank" href="instructions.html"><button id="instructions">Re-read instructions</button></a>'+ trial_count + html;
        var check = function() {

            var answers = [];
            var answers_correct = true;

            for (i=0; i<solutions.length; i++)
            {
                var field = document.getElementById('input'+i);
                answers.push(field.value.trim());
                
                if (trial.check_answers)
                {
                    if (answers[i] !== solutions[i])
                    {
                        // field.style.color = 'red';
                        answers_correct = false;
                    }
                    else
                    {
                        field.style.color = 'black';
                    }
                    if (!solutions.includes(answers[i])) {
                        alert("Make sure each input matches one of the given words!")
                        return;
                    }
                }
            }
            
            trial_num++;
            if (!trial.check_answers || (trial.check_answers && answers_correct))
            {
                score++;
                var trial_data = {
                    'test_part': 'test',
                    'response' : answers,
                    'solution': solutions,
                    'correct': true,
                    'total_score': score
                };

                display_element.innerHTML = '<img src="star.gif" width=500</img><p>Press spacebar to continue.</p>';
                jsPsych.finishTrial(trial_data);
            }
            else
            {
                var trial_data = {
                    'test_part': 'test',
                    'response' : answers,
                    'solution': solutions,
                    'correct': false,
                    'total_score': score
                };
                display_element.innerHTML = '';
                jsPsych.finishTrial(trial_data);

            }
                
        };
        
        var enter_check = function(e) {
            if (e.keyCode === 13) {
              check();
            }
        }

        display_element.innerHTML += '<br><button class="jspsych-html-button-response-button" type="button" id="finish_cloze_button">'+trial.button_text+'</button><p style="font-size:10.5px;">Click Next or press Enter</p>';
        display_element.querySelector('.cloze').addEventListener('keydown', enter_check);
        display_element.querySelector('#finish_cloze_button').addEventListener('click', check);

    };

    return plugin;
})();