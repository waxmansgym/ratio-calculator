function nameToId(name) { return name.split(' ').join('_').toLowerCase(); }

function add(a, b) { return a + b; }

window.onload = function() {

    // ######################################################################
    var exercises = [
        { name: 'Clean and Jerk',         based_on: null,             ratio: null, section: 'Clean and Jerk' },
        { name: 'Clean',                  based_on: 'Clean and Jerk', ratio: 1.02, section: 'Clean and Jerk' },
        { name: 'Back Squat',             based_on: 'Clean and Jerk', ratio: 1.34, section: 'Clean and Jerk' },
        { name: 'Front Squat',            based_on: 'Clean and Jerk', ratio: 1.15, section: 'Clean and Jerk' },
        { name: 'Jerk',                   based_on: 'Clean and Jerk', ratio: 1.05, section: 'Clean and Jerk' },
        { name: 'Seated Press',           based_on: 'Clean and Jerk', ratio: 0.55, section: 'Clean and Jerk' },
        { name: 'Power Clean',            based_on: 'Clean',          ratio: 0.80, section: 'Clean and Jerk' },
        { name: 'Clean Blocks Abv Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' },
        { name: 'Hang Clean Below Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' },
        { name: 'Snatch',                 based_on: null,             ratio: null, section: 'Snatch' },
        { name: 'Overhead Squat',         based_on: 'Snatch',         ratio: 1.05, section: 'Snatch' },
        { name: 'Power Snatch',           based_on: 'Snatch',         ratio: 0.80, section: 'Snatch' },
        { name: 'Snatch Blocks Abv Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' },
        { name: 'Hang Snatch Below Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' }
    ];

    // ######################################################################
    // Messages for diagnoses
    var diagnoses = {
        'Clean': {
            'too_low': 'Diagnosis: Clean TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Clean TOO HIGH MESSAGE'
        },
        'Back Squat': {
            'too_low': 'Diagnosis: Back Squat TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Back Squat TOO HIGH MESSAGE'
        },
        'Front Squat': {
            'too_low': 'Diagnosis: Front Squat TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Front Squat TOO HIGH MESSAGE'
        },
        'Jerk': {
            'too_low': 'Diagnosis: Jerk TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Jerk TOO HIGH MESSAGE'
        },
        'Seated Press': {
            'too_low': 'Diagnosis: Seated Press TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Seated Press TOO HIGH MESSAGE'
        },
        'Power Clean': {
            'too_low': 'Diagnosis: Power Clean TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Power Clean TOO HIGH MESSAGE'
        },
        'Clean Blocks Abv Knee': {
            'too_low': 'Diagnosis: Clean Blocks Abv Knee TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Clean Blocks Abv Knee TOO HIGH MESSAGE'
        },
        'Hang Clean Below Knee': {
            'too_low': 'Diagnosis: Hang Clean Below Knee TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Hang Clean Below Knee TOO HIGH MESSAGE'
        },
        'Overhead Squat': {
            'too_low': 'Diagnosis: Overhead Squat TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Overhead Squat TOO HIGH MESSAGE'
        },
        'Power Snatch': {
            'too_low': 'Diagnosis: Power Snatch TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Power Snatch TOO HIGH MESSAGE'
        },
        'Snatch Blocks Abv Knee': {
            'too_low': 'Diagnosis: Snatch Blocks Abv Knee TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Snatch Blocks Abv Knee TOO HIGH MESSAGE'
        },
        'Hang Snatch Below Knee': {
            'too_low': 'Diagnosis: Hang Snatch Below Knee TOO LOW MESSAGE',
            'too_high': 'Diagnosis: Hang Snatch Below Knee TOO HIGH MESSAGE'
        }
    };

    // ######################################################################
    var prescriptions = {
        'Clean': {
            'too_low': 'Prescription: Clean TOO LOW MESSAGE',
            'too_high': 'Prescription: Clean TOO HIGH MESSAGE'
        },
        'Back Squat': {
            'too_low': 'Prescription: Back Squat TOO LOW MESSAGE',
            'too_high': 'Prescription: Back Squat TOO HIGH MESSAGE'
        },
        'Front Squat': {
            'too_low': 'Prescription: Front Squat TOO LOW MESSAGE',
            'too_high': 'Prescription: Front Squat TOO HIGH MESSAGE'
        },
        'Jerk': {
            'too_low': 'Prescription: Jerk TOO LOW MESSAGE',
            'too_high': 'Prescription: Jerk TOO HIGH MESSAGE'
        },
        'Seated Press': {
            'too_low': 'Prescription: Seated Press TOO LOW MESSAGE',
            'too_high': 'Prescription: Seated Press TOO HIGH MESSAGE'
        },
        'Power Clean': {
            'too_low': 'Prescription: Power Clean TOO LOW MESSAGE',
            'too_high': 'Prescription: Power Clean TOO HIGH MESSAGE'
        },
        'Clean Blocks Abv Knee': {
            'too_low': 'Prescription: Clean Blocks Abv Knee TOO LOW MESSAGE',
            'too_high': 'Prescription: Clean Blocks Abv Knee TOO HIGH MESSAGE'
        },
        'Hang Clean Below Knee': {
            'too_low': 'Prescription: Hang Clean Below Knee TOO LOW MESSAGE',
            'too_high': 'Prescription: Hang Clean Below Knee TOO HIGH MESSAGE'
        },
        'Overhead Squat': {
            'too_low': 'Prescription: Overhead Squat TOO LOW MESSAGE',
            'too_high': 'Prescription: Overhead Squat TOO HIGH MESSAGE'
        },
        'Power Snatch': {
            'too_low': 'Prescription: Power Snatch TOO LOW MESSAGE',
            'too_high': 'Prescription: Power Snatch TOO HIGH MESSAGE'
        },
        'Snatch Blocks Abv Knee': {
            'too_low': 'Prescription: Snatch Blocks Abv Knee TOO LOW MESSAGE',
            'too_high': 'Prescription: Snatch Blocks Abv Knee TOO HIGH MESSAGE'
        },
        'Hang Snatch Below Knee': {
            'too_low': 'Prescription: Hang Snatch Below Knee TOO LOW MESSAGE',
            'too_high': 'Prescription: Hang Snatch Below Knee TOO HIGH MESSAGE'
        }
    }

    // Generate the panels for each section
    var sections = _.chain(exercises).pluck('section').unique().value();
    _.each(sections, function(section) {
        var sectionId = nameToId(section);
        $('#sections').append(`<div class="col-md-${12 / sections.length}">
                                  <div class="panel panel-default">
                                      <div class="panel-heading">${section}</div>
                                      <div class="panel-body">
                                          <form class="form-horizontal" id="form_${sectionId}"></form>
                                          <button class="btn btn-default" id="calculate_${sectionId}">Calculate</button>
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

                    // Show the percent off the predicted
                    if(value != '') {
                        calculations[e.name].actual = value;

                        var ideal_diff = (value / mean_prediction - 1.0) * 100;
                        calculations[e.name].delta = value - mean_prediction;
                        calculations[e.name].deltaPercent = ideal_diff;
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
        _.each(sectionExercises, function(e) { $('calc_' + nameToId(e.name)).html(''); });

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

