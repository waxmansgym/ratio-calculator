

function nameToId(name) { return name.split(' ').join('_').toLowerCase(); }

function add(a, b) { return a + b; }

window.onload = function() {

    // ######################################################################
    var exercises = [
        { name: 'Snatch',                 based_on: null,             ratio: null, section: 'Snatch' },
        { name: 'Overhead Squat',         based_on: 'Snatch',         ratio: 1.05, section: 'Snatch' },
        { name: 'Power Snatch',           based_on: 'Snatch',         ratio: 0.80, section: 'Snatch' },
        { name: 'Snatch Blocks Abv Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' },
        { name: 'Hang Snatch Below Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' },
        { name: 'Clean and Jerk',         based_on: null,             ratio: null, section: 'Clean and Jerk' },
        { name: 'Clean',                  based_on: 'Clean and Jerk', ratio: 1.02, section: 'Clean and Jerk' },
        { name: 'Back Squat',             based_on: 'Clean and Jerk', ratio: 1.34, section: 'Clean and Jerk' },
        { name: 'Front Squat',            based_on: 'Clean and Jerk', ratio: 1.15, section: 'Clean and Jerk' },
        { name: 'Jerk',                   based_on: 'Clean and Jerk', ratio: 1.05, section: 'Clean and Jerk' },
        { name: 'Seated Press',           based_on: 'Clean and Jerk', ratio: 0.55, section: 'Clean and Jerk' },
        { name: 'Power Clean',            based_on: 'Clean',          ratio: 0.80, section: 'Clean and Jerk' },
        { name: 'Clean Blocks Abv Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' },
        { name: 'Hang Clean Below Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' }
    ];

    // ######################################################################
    // Messages for diagnoses
    var diagnoses = {
        'Clean': {
            'too_low': 'Diagnosis: This seems like a statistical impossibility. If you can clean & jerk it, you can clean it. Check your numbers and try again?',
            'too_high': 'Diagnosis: You seem to have an issue with your jerk. If your squat ratios are in the right range, you may have jerk technique issues. If your squat ratios are below ideal range, you may have a strength and/or energy production problem.'
        },
        'Back Squat': {
            'too_low': 'Diagnosis: You may be hampered by weak legs. If it doesnt already plaugue your lifts, you may be operating at a high level of stress.',
            'too_high': 'Diagnosis: You appear to have adequate strength levels to clean & jerk more. You are likely being held back by your technique.'
        },
        'Front Squat': {
            'too_low': 'Diagnosis: You may be hampered by weak legs. If it doesnt already plaugue your lifts, you may be operating at a high level of stress.',
            'too_high': 'Diagnosis: You appear to have adequate strength levels to clean & jerk more. You are likely being held back by your technique.'
        },
        'Jerk': {
            'too_low': 'Diagnosis: If your squat ratios are in the right range, you may have jerk technique issues. If your squat ratios are below ideal range, you may have a strength and/or energy production problem.',
            'too_high': 'Diagnosis: Assuming your strength levels are adequate, this tells us you may have issues with your efficiency (technique and/or power production) in the clean.'
        },
        'Seated Press': {
            'too_low': 'Diagnosis: This most likely would not cause a performance issue in the competition lifts, but you may be operating at a high level of stress',
            'too_high': 'Diagnosis: We cant discern much from a monster seated press. But congratulations!' 
        },
        'Power Clean': {
            'too_low': 'Diagnosis: This tells us you may suffer from either weak legs or poor explosion/transition speed.',
            'too_high': 'Diagnosis: If your front squat is within acceptable range, you likely have technical inefficiencies in your clean & jerk. If your front squat is too low, you may be lacking strength, mobility, or both.'
        },
        'Clean Blocks Abv Knee': {
            'too_low': 'Diagnosis: You likely have difficulty with vertical explosion. ',
            'too_high': 'Diagnosis: You likely have issues when you break the bar off the floor.'
        },
        'Hang Clean Below Knee': {
            'too_low': 'Diagnosis: You may have poor back strength or coordination problems.',
            'too_high': 'Diagnosis: You likely have issues when you break the bar off the floor.'
        },
        'Overhead Squat': {
            'too_low': 'Diagnosis: This tells us you have a problem with overhead stability.',
            'too_high': 'Diagnosis: Even if you can overhead squat a large house, it doesnt tell us much.'
        },
        'Power Snatch': {
            'too_low': 'Diagnosis: This tells us you may suffer from either weak legs or poor explosion/transition speed.',
            'too_high': 'Diagnosis: This tells us you may be lacking sufficient mobility or coordination.'
        },
        'Snatch Blocks Abv Knee': {
            'too_low': 'Diagnosis: You likely have difficulty with vertical explosion.',
            'too_high': 'Diagnosis: You likely have issues when you break the bar off the floor.'
        },
        'Hang Snatch Below Knee': {
            'too_low': 'Diagnosis: You may have poor back strength or coordination problems.',
            'too_high': 'Diagnosis: You likely have issues when you break the bar off the floor.'
        }
    };

    // ######################################################################
    var prescriptions = {
        'Clean': {
            'too_low': 'Prescription: GFY',
            'too_high': 'Prescription: Check to make sure your squat ratios are in the right range. If not, you may get near-term benefit by getting stronger. If squats are in the right range, you should analyze your jerk technique and spend time trying to improve it.'
        },
        'Back Squat': {
            'too_low': 'Prescription: We recommend you focus on getting your legs stronger.',
            'too_high': 'Prescription: We recommend you focus on improving your efficiency and technique in the clean & jerk.'
        },
        'Front Squat': {
            'too_low': 'Prescription: We recommend you focus on getting your legs stronger.',
            'too_high': 'Prescription: We recommend you focus on improving your efficiency and technique in the clean & jerk.'
        },
        'Jerk': {
            'too_low': 'Prescription: If your squat ratios are in the right range, we recommend you focus on improving your technique in the jerk. If your squats are below range, you need to get your legs stronger.',
            'too_high': 'Prescription: Assuming your squat ratios are within adequate range, we recommend you focus on improving your efficiency and technique in the clean.'
        },
        'Seated Press': {
            'too_low': 'Prescription: Getting stronger, especially overhead, will likley help you improve your lifts.',
            'too_high': 'Prescription: Keep doing what youre doing Press Master!'
        },
        'Power Clean': {
            'too_low': 'Prescription: Train to improve your explosion/transition speed.',
            'too_high': 'Prescription: If your front squat is within acceptable range, focus on improving your mobility in the clean & jerk. If your front squat is too low, spend some time getting your legs stronger.'
        },
        'Clean Blocks Abv Knee': {
            'too_low': 'Prescription: You should spend more time [improving your explosion]...',
            'too_high': 'Prescription: You should spend more time practicing clean pulls from the floor and/or from a deficit.'
        },
        'Hang Clean Below Knee': {
            'too_low': 'Prescription: You should get your back stronger, or find a coach to help you isolate and fix likely coordination problems.',
            'too_high': 'Prescription: You should spend more time practicing clean pulls from the floor and/or from a deficit.'
        },
        'Overhead Squat': {
            'too_low': 'Prescription: You should work on overhead strength and stability.',
            'too_high': 'Prescription: Congratulations Mr./Mrs. Overhead Squat. We have no prescription for you.'
        },
        'Power Snatch': {
            'too_low': 'Prescription: You should think about getting your legs stronger...or improving your explosion and speed changing directions/getting under the bar.',
            'too_high': 'Prescription: You either need to improve your mobility or find a coach to help you isolate and fix likely coordination problems.'
        },
        'Snatch Blocks Abv Knee': {
            'too_low': 'Prescription: You should spend more time [improving your explosion]...',
            'too_high': 'Prescription: You should spend more time practicing clean pulls from the floor and/or from a deficit.'
        },
        'Hang Snatch Below Knee': {
            'too_low': 'Prescription: You should get your back stronger, or find a coach to help you isolate and fix likely coordination problems.',
            'too_high': 'Prescription: You should spend more time practicing clean pulls from the floor and/or from a deficit.'
        }
    };
    // Generate header???
    
 





    // Generate the panels for each section

    var sections = _.chain(exercises).pluck('section').unique().value();
    _.each(sections, function(section) {
        var sectionId = nameToId(section);
        $('#sections').append(`<div class="col-md-${12 / sections.length}">
                                  <div class="panel panel-default" style="background-color:white;">
                                      <div class="panel-heading" style="background-color:black; color:black; font-size:150%; text-align:center;">${section}</div>
                                      <div class="panel-body">
                                          <form class="form-horizontal" id="form_${sectionId}"></form>
                                          <div style="text-align:center"><button alignment="center" class="btn btn-default" id="calculate_${sectionId}">Analyze</button></DIV>
                                          <div id="recommendations_${sectionId}"></div>
                                      </div>
                                  </div>
                              </div>`);
        $('#calculate_' + nameToId(section)).click(_.partial(calculate, section));
    });

    // Create a form field for each exercise
    for(i = 0; i < exercises.length; ++i) {
        var e = exercises[i];
        var id = nameToId(e.name);
        $('#form_' + nameToId(e.section)).append(`
                          <div class="form-group" id="formgroup_${id}">
                              <label for="${id}" class="col-sm-3 control-label">${e.name}</label>
                              <div class="col-sm-9" class="form-control">
                                  <input type="number" id="${id}">
                                  <span id="calc_${id}"></span>
                                  <span id="help_${id}" class="help-block"></span>
                              </div>
                          </div>
                          `)
    }

    // Engine to calculate all of the predicted stats from the 'exercises' rules
    function calculateStats(sectionExercises) {
        calculations = {};

        _.each(sectionExercises, function(e) {

            // Add an empty entry into the calculations table
            calculations[e.name] = {
                name: e.name,
                predicted: null,
                predictedStdDev: null,
                predictors: [],
                actual: null,
                delta: null,
                deltaPercent: null
            };

            var id = nameToId(e.name);
            var value = $('#' + id).val();

            // Find all lifts which are predicted by this lift and calculate the reverse prediction
            var predictors = _.chain(sectionExercises)
                .filter(function(p) {
                    return p.based_on == e.name && $('#' + nameToId(p.name)).val() != '';
                })
                .map(function(p) {
                    return {
                        predictor: p.name,
                        prediction: $('#' + nameToId(p.name)).val() / p.ratio
                    }; 
                })
                .value();

                // If this lift is predicted by a lift, add it to the predictions
                if(e.based_on !== null && $('#' + nameToId(e.based_on)).val() != '') {
                    predictors.push({
                        predictor: e.based_on,
                        prediction: $('#' + nameToId(e.based_on)).val() * e.ratio
                    });
                }

                // Now, it this lift has any elements in it's predictors list, use them to predict the expected value
                if(predictors.length > 0) {

                    // Calculate the mean predicted value for this lift
                    var mean_prediction = _.chain(predictors).pluck('prediction').reduce(add, 0).value() / predictors.length;

                    calculations[e.name].predicted = mean_prediction;

                    // Show the standard deviation if this is predicted from > 1 value
                    if(predictors.length > 1) {
                        calculations[e.name].predictors = _.pluck(predictors, 'predictor');

                        var stddev = Math.sqrt(
                            _.chain(predictors)
                                .pluck('prediction')
                                .map(function(v) { return (v - mean_prediction) * (v - mean_prediction); })
                                .reduce(add, 0)
                                .value() / (predictors.length - 1)
                        );
                        calculations[e.name].predictedStdDev = stddev;
                    }

                    // Calculate the percent off the predicted
                    if(value != '') {

                        // var ideal_diff = (value / mean_prediction - 1.0) * 100;
                        var ideal_diff = (1.0 - mean_prediction / value) * 100;

                        console.log(e.name, 'value', value, 'mean_prediction', mean_prediction, 'ideal_diff', ideal_diff)

                        calculations[e.name].actual = value;
                        calculations[e.name].delta = value - mean_prediction;
                        calculations[e.name].deltaPercent = ideal_diff;
                    }
                    else {
                        calculations[e.name].actual = null;
                        calculations[e.name].delta = null;
                        calculations[e.name].deltaPercent = null;
                    }
                }
        });

        return calculations;
    }

    function calculate(section) {

        // Make sure the base exercise is filled
        var baseId = nameToId(section)
        if($('#' + baseId).val() == '') {
            $('#formgroup_' + baseId).addClass('has-error');
            $('#help_' + baseId).html('Required!');

            // Bail if the base is not filled
            return;
        } else {
            $('#formgroup_' + baseId).removeClass('has-error');
            $('#help_' + baseId).html('');
        }

        // Grab all of the exercises for this section
        var sectionExercises = _.filter(exercises, function(e) { return e.section == section; });

        // Clear out all of the 'calc_' sections
        _.each(sectionExercises, function(e) { $('#calc_' + nameToId(e.name)).html(''); });

        // Calculate all of the stats from the section exercises
        var calculations = calculateStats(sectionExercises);

        // Sort the calculations to find the worst offender
        var sortedCalculations = _.chain(calculations)
            .values()
            .filter(function(c) { return c.name != section && c.deltaPercent !== null; }).value()
        sortedCalculations = _.sortBy(sortedCalculations, function(c) { return -Math.abs(c.deltaPercent); });

        // If we have any calculations, then format a recommendation
        if(sortedCalculations.length > 0) {
            var worst = sortedCalculations[0];
            var exercise = _.find(exercises, function(e) { return e.name == worst.name; });

            // Add a percentage pill to each filled-in input
            _.each(sortedCalculations, function(e) {
                var deviation = Math.abs(e.deltaPercent);
                var label = '';
                if(deviation < 3) label = 'label-success';
                else if(deviation > 3 && deviation < 5) label = 'label-warning';
                else if(deviation > 5) label = 'label-danger';

                var percentDisplay = e.deltaPercent < 0 ? e.deltaPercent.toFixed(2) : '+' + e.deltaPercent.toFixed(2);


                $('#calc_' + nameToId(e.name)).html(`<span class="label ${label}">${percentDisplay}%</span>`);
            });

            var diagnosis = diagnoses[worst.name][worst.delta > 0 ? 'too_high' : 'too_low'];
            var prescription = prescriptions[worst.name][worst.delta > 0 ? 'too_high' : 'too_low'];

            $('#recommendations_' + nameToId(section))
                .html(`<br/><br/>
                      Based on your inputs the ratio with the greatest difference is <b>${worst.name}</b>.

                      <br/><br/>

                      The ideal is to have your <b>${worst.name}</b> at ${(exercise.ratio * 100).toFixed(2)}% of your ${section}, however 
                      your <b>${worst.name}</b> is ${(100 + worst.deltaPercent).toFixed(2)}% of your ${section}. That's a ${worst.deltaPercent.toFixed(2)}% differential.

                      <br/> <br/>

                      ${diagnosis} 

                      <br/><br/>

                      ${prescription}
                      
                      `)

        }
    }
};
