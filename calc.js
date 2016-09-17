function nameToId(name) { return name.split(' ').join('_').toLowerCase(); }

function add(a, b) { return a + b; }

window.onload = function() {

    var exercises = [
        { name: 'Clean And Jerk',         based_on: null,             ratio: null, section: 'Clean and Jerk' },
        { name: 'Clean',                  based_on: 'Clean And Jerk', ratio: 1.02, section: 'Clean and Jerk' },
        { name: 'Back Squat',             based_on: 'Clean And Jerk', ratio: 1.34, section: 'Clean and Jerk' },
        { name: 'Front Squat',            based_on: 'Clean And Jerk', ratio: 1.15, section: 'Clean and Jerk' },
        { name: 'Jerk',                   based_on: 'Clean And Jerk', ratio: 1.05, section: 'Clean and Jerk' },
        { name: 'Seated Press',           based_on: 'Clean And Jerk', ratio: 0.55, section: 'Clean and Jerk' },
        { name: 'Power Clean',            based_on: 'Clean',          ratio: 0.80, section: 'Clean and Jerk' },
        { name: 'Clean Blocks Abv Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' },
        { name: 'Hang Clean Below Knee',  based_on: 'Clean',          ratio: 0.95, section: 'Clean and Jerk' },
        { name: 'Snatch',                 based_on: null,             ratio: null, section: 'Snatch' },
        { name: 'Overhead Squat',         based_on: 'Snatch',         ratio: 1.05, section: 'Snatch' },
        { name: 'Power Snatch',           based_on: 'Snatch',         ratio: 0.80, section: 'Snatch' },
        { name: 'Snatch Blocks Abv Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' },
        { name: 'Hang Snatch Below Knee', based_on: 'Snatch',         ratio: 0.95, section: 'Snatch' }
    ];

    var sections = _.chain(exercises).pluck('section').unique().value();
    _.each(sections, function(section) {
        $('#sections').append(`<div class="col-md-${12 / sections.length}">
                                  <div class="panel panel-default">
                                      <div class="panel-heading">${section}</div>
                                      <div class="panel-body">
                                          <form class="form-horizontal" id="form_${nameToId(section)}"></form>
                                          <button class="btn btn-default" id="calculate_${nameToId(section)}">Calculate</button>
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
                                  <span id="ideal_${id}"></span>
                                  <span id="help_${id}" class="help-block"></span>
                              </div>
                          </div>
                          `)
    }

    // $(':input').change(function() {

    function calculate(section) {

        // Make sure the base exercise is filled
        var baseId = nameToId(section)
        if($('#' + baseId).val() == '') {
            $('#formgroup_' + baseId).addClass('has-error');
            $('#help_' + baseId).html('Required!');
            return;
        } else {
            $('#formgroup_' + baseId).removeClass('has-error');
            $('#help_' + baseId).html('');
        }

        var sectionExercises = _.filter(exercises, function(e) { return e.section == section; });

        // Calculate the predicted accessories from the base lifts
        _.each(sectionExercises, function(e) {
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

                $('#ideal_' + id).html('');
                if(predictors.length > 0) {

                    // Calculate the mean predicted value for this lift
                    var mean_prediction = _.chain(predictors).pluck('prediction').reduce(add, 0).value() / predictors.length;

                    $('#ideal_' + id).html('Ideal: ' + mean_prediction.toFixed(2));

                    // Show the standard deviation if this is predicted from > 1 value
                    if(predictors.length > 1) {
                        var stddev = Math.sqrt(
                            _.chain(predictors)
                                .pluck('prediction')
                                .map(function(v) { return (v - mean_prediction) * (v - mean_prediction); })
                                .reduce(add, 0)
                                .value() / (predictors.length - 1)
                        );
                        $('#ideal_' + id).append(' <i>&#177; ' + stddev.toFixed(2) + ' <small>stddev</small></i>');
                    }

                    // Show the percent off the predicted
                    if(value != '') {

                        var ideal_diff = (value / mean_prediction - 1.0) * 100;
                        var color = ideal_diff > 0 ? 'success' : 'danger';
                        $('#ideal_' + id).append(' <span class="label label-' + color + '"> ' +
                                                 (ideal_diff > 0 ? '+' : '') +
                                                 ideal_diff.toFixed(2) + '%</span>');

                    }

                    // Show which lifts predicted this one
                    $('#ideal_' + id).append(' <small>(Predicted by ' + _.pluck(predictors, 'predictor').join(', ') + ')</small>');

                }
        });

    }
    //);
};

