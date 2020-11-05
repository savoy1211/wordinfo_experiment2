/**
 * jspsych-cloze
 * Philipp Sprengholz
 *
 * Plugin for displaying a cloze test and checking participants answers against a correct solution.
 *
 * documentation: docs.jspsych.org
 **/

jsPsych.plugins['cloze-blank'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'cloze-blank',
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
            }
        }
    };

    plugin.trial = function (display_element, trial) {

        var html = '<div class="cloze">';
        var elements = trial.text.split('%');
        var solutions = [];

        for (var i=0; i<elements.length; i++)
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
        html += '</div>';
        
        display_element.innerHTML = html;
                
        var check = function() {

            var trial_data = {
                'understanding': document.getElementById("understanding").selectedOptions[0].text,
                'gender' : document.getElementById("gender").value,
                'age' : document.getElementById("age").value,
                'education_level': document.getElementById("education").selectedOptions[0].text,
                'native_language': document.getElementById("language").value,
                'enjoyment': document.getElementById("enjoyment").selectedOptions[0].text,
                'comments': document.getElementById("comments").value
            };

            display_element.innerHTML = '';
            jsPsych.finishTrial(trial_data);

                
        };
        
        display_element.innerHTML += '<br><button class="jspsych-html-button-response-button" type="button" id="finish_cloze_button">'+trial.button_text+'</button>';
        display_element.querySelector('#finish_cloze_button').addEventListener('click', check);
    };

    return plugin;
})();
