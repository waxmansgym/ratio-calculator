import React, { Component } from 'react';
var _ = require('lodash');
import {isNumber} from './helpers.js';
import Panel from 'react-bootstrap/lib/Panel';
import {ranges, diagnoses, prescriptions} from './data.js';

let formatNumber = Math.round;

class BaseLiftInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
        this.props.onChange({name: this.props.shortname, value: event.target.value});
    }

    render() {
        return(
            <span>
                <strong>{this.props.name}</strong>
                <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
            </span>
        );
    }
}

class AccessoryLiftInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
        this.props.onChange({name: this.props.name, value: event.target.value});
    }

    render() {
        return (
            <span>
                <div className="col-md-5">
                    <strong>{this.props.name}</strong>
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                </div>
            </span>

        );
    }
}

function percentColor(percent, alpha=1, start = 0, end = 120) {
    let a = percent / 100;
    let b = end * a;
    let c = b + start;

    return 'hsla('+c+',70%,40%,' + alpha + ')';
}
    

class AccessoryRatioDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // let actualRatioLabel = <span></span>;
        // let expectedRatioLabel = <span></span>;
        // if(isNumber(this.props.actualRatio)) {
        //     let delta = Math.abs(this.props.actualRatio - this.props.expectedRatio);
        //     let dangerZone = 15;
        //     let percent = 100 - Math.min(Math.abs(delta / dangerZone * 100), 100);
        //     let color = percentColor(percent);

        //     actualRatioLabel = <span className="label label-default" style={{'backgroundColor': color}}>{this.props.actualRatio.toFixed(0)}%</span>;
        //     expectedRatioLabel = <span className="label label-default">{this.props.expectedRatio.toFixed(0)}%</span>;
        // }
        //

         if(!isNumber(this.props.actualRatio)) {
             return null;
         }
        
        let x = Math.max(0, Math.min(100, (50 + this.props.actualRatio - this.props.expectedRatio))) + "%"

        let delta = Math.abs(this.props.actualRatio - this.props.expectedRatio);
        let dangerZone = 15;
        let percent = 100 - Math.min(Math.abs(delta / dangerZone * 100), 100);
        let color = percentColor(percent, 1.0);


                    //<rect x={5} y="25%" width="100%" height={3} color="blue"/>
         //<line x1={x} x2={x} y1="0%" y2="100%" strokeWidth="6" stroke="black"/>
        return (
            <div className="col-md-4">
                <svg width="100%" height={40}>
                    <line x1="0%" x2="100%" y1="50%" y2="50%" strokeWidth="1" stroke="rgba(0,0,0,0.5)"/>

                    <line x1="50%" x2="50%" y1="40%" y2="60%" strokeWidth="1" stroke="rgba(0,0,0,0.5)"/>

                    <circle cx={x} cy="50%" r={15} stroke="black" strokeWidth="1" fill={color}/>

                    <text x={x} y="50%" fontSize="10" textAnchor="middle" alignmentBaseline="middle"> hi </text>

                </svg>
            </div>
        );

        // return (
        //     <span>
        //         <div className="col-md-2">
        //             <center>
        //                 {actualRatioLabel}
        //             </center>
        //         </div>
        //         <div className="col-md-2">
        //             <center>
        //                 {expectedRatioLabel}
        //             </center>
        //         </div>
        //     </span>
        // );
    }
}

class BaseResults extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if(this.props.show === false) {
            return null;
        }

        let resultsContent = '';
        if(!isNumber(this.props.results.snatch) || !isNumber(this.props.results.cnj)) {
            let missing = null;
            if(!isNumber(this.props.results.snatch) && !isNumber(this.props.results.cnj))
                missing = (<span><strong>Snatch</strong> or <strong>Clean & Jerk</strong></span>);
            else if(!isNumber(this.props.results.snatch) && isNumber(this.props.results.cnj))
                missing = (<strong>Snatch</strong>);
            else if(isNumber(this.props.results.snatch) && !isNumber(this.props.results.cnj))
                missing = (<strong>Clean & Jerk</strong>);
            resultsContent = <span>You didn't enter a {missing} number so we can't perform this analysis</span>;
        }
        else {
            let snatchCJIdealRatio = 80;
            let snatchCJRatioTolerance = 2;
            let snatchCJRatio = this.props.results.snatch / this.props.results.cnj * 100;

            let diagnosis = '';
            let prescription = '';
            let description = '';

            // TODO: What should this message and tolerance be?
            if(Math.abs(snatchCJRatio - snatchCJIdealRatio) < snatchCJRatioTolerance) {
                resultsContent = (
                    <span>
                         The ratio of your snatch to clean & jerk demonstrates fairly ideal balance. Keep up
                         the good work! Also, see additional analysis below to determine how you might
                         improve each.
                    </span>
                );
            }
            else {
                description = `The ideal is to have your snatch at ${formatNumber(snatchCJIdealRatio)}% of your C&J, however your snatch is at ${formatNumber(snatchCJRatio)}% of your C&J.
                    That's a ${formatNumber(snatchCJRatio - snatchCJIdealRatio)}% differential.`

                if(snatchCJRatio < snatchCJIdealRatio) {
                    diagnosis =  "Comparing your snatch to your clean & jerk, it appears you have adequate strength to snatch more. Thus your snatch technique appears to be inefficient.";

                    prescription = (
                        <span>
                            <p>
                                While there are a number of common
                                technical problems that could be hampering your snatch,
                                it’s hard to tell from these numbers alone what aspect of
                                your technique is the greatest limiter.
                            </p>
                            <p>
                                We recommend you evaluate your own lifts on video, or seek
                                out a knowledgeable coach, to help you prioritize/fix your
                                technical inefficiencies so you can better harness your
                                strength. Also have a look at the snatch-specific analysis
                                below for potential insights.
                            </p>
                        </span>);
                }
                else {
                    if(this.props.accessories.cnj['Front Squat'] !== undefined) {

                        let fsqRatio = this.props.accessories.cnj['Front Squat'].value / this.props.results.cnj * 100;
                        // let idealFsqRatio = this.props.accessories.cnj['Front Squat'].ratio;

                        if(fsqRatio > 125) {

                            diagnosis = `Based on the numbers you entered, since your best snatch and clean & jerk are closer
                            than ideal, and since you don’t have any apparent weakness in your front squat, it appears you have
                            adequate strength to clean & jerk more. Thus we conclude your clean & jerk technique may be
                            inefficient.`;

                            prescription = (
                                <span>
                                    <p>
                                        While there are a number of common technical problems that could be hampering your clean & jerk, it’s hard to
                                        tell from these numbers alone what aspect of your technique is the greatest limiter. 
                                    </p>
                                    <p>
                                        We recommend you evaluate your own lifts on video, or seek out a knowledgeable coach, to help you
                                        prioritize/fix your technical inefficiencies so you can better harness your strength. 
                                    </p>
                                    <p>
                                        Also look at the clean-specific analysis below for potential insights.
                                    </p>
                                </span>
                            );

                        } 
                        else {
                            diagnosis = (
                                <span>
                                    <p>
                                        Based on the numbers you entered, since your best snatch and
                                        clean & jerk are closer than ideal, and since your front squat
                                        shows room for improvement, we suspect you may be limited in the
                                        clean & jerk by limited strength. 
                                    </p>
                                </span>
                            );
                            prescription = (
                                <span>
                                    You may benefit most in the clean & jerk by improving your strength in the front squat.
                                    Also have a look at the clean-specific analysis below for more potential insights.
                                </span>
                            );

                        }
                    }
                    else {
                        diagnosis = `Your clean & jerk technique appears inefficient given how much you can snatch.`;
                        prescription = `Please enter a front squat number so that we can further diagnose`;
                    }
                }

                resultsContent = (
                    <span>
                    <dl>
                    <dt>Diagnosis</dt>
                    <dd>{diagnosis}</dd>

                    <dt>Prescription</dt>
                    <dd>{prescription}</dd>

                    <dt>How did we get this?</dt>
                    <dd>{description}</dd>
                    </dl>
                    </span>);
            }

        }

        return (
            <span>
                <h3>4. Check out your results:</h3>
                <Panel header="Snatch Compared to C&J" bsStyle="danger">
                    {resultsContent}
                </Panel>
            </span>
        );
    }
}

class AccessoryResults extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if(!isNumber(this.props.base)) {
            return null;
        }

        let results = _.map(this.props.accessories, (accessory, accessoryName) => {
            let actualRatio = accessory.value / this.props.base * 100;
            return {
                name: accessoryName,
                actualRatio: actualRatio,
                expectedRatio: accessory.ratio,
                ratioDiff: actualRatio - accessory.ratio
            };
        });

        let analysisName = this.props.baseName + " Analysis";

        let resultsContent = null;
        if(results.length === 0) {
            resultsContent = (<span>Please enter one or more accessory maxes for analysis</span>);
        }
        else {
            let finished = false;
            let notes = (<span></span>);
            while(finished === false) {
                finished = true;

                let worst = _.maxBy(results, (r) => Math.abs(r.ratioDiff));
                let whichWay = worst.ratioDiff < 0 ? 'too_low' : 'too_high';
                let diagnosis = diagnoses[worst.name][whichWay];
                let prescription = prescriptions[worst.name][whichWay];

                // ######################################################################
                // TODO: As the rule tree becomes more complex, more and more logic made its way here.
                // All diagnoses/prescriptions should just be moved out of the data.js file and into
                // here so that it's all in one place
                // ######################################################################

                // Grab the front squat entry from the list of results as we use it all over the place
                let frontSquat = _.find(results, (r) => { return r.name === 'Front Squat'; });

                // The "acceptable" range for the front squat
                let frontSquatAcceptableRange = 5.0;

                if(Math.abs(worst.ratioDiff) <= ranges.ideal) {
                    if(results.length == 1) {
                        diagnosis = (
                            <span>
                                Congratulations, your {worst.name} is within ideal balance.
                                Since it’s the only accessory exercise you’ve entered, this doesn’t tell us (or you) a whole lot.
                            </span>
                        );

                        prescription = (
                            <span>
                                Please consider adding more than 1 accessory exercise and retrying the analysis.
                            </span>
                        );
                    }
                    else {
                        diagnosis = (
                            <span>
                                All the exercises you’ve entered appear to be within ideal ranges to demonstrate balance. Congratulations.
                            </span>
                        );

                        prescription = (
                            <span>
                                Whatever you’re currently doing appears to be working to keep you balanced. Keep up the great work.
                            </span>
                        );
                    }
                }
                else {

                    //////////////////////////////////////////////////////////////////////
                    // Clean too low
                    if(worst.name === 'Clean' && worst.ratioDiff < 0) {
                        diagnosis = (
                            <span>
                                According to your numbers, you clean less than you can clean & jerk.
                                This seems like a statistical impossibility. If you can clean & jerk it, you can clean it, no?
                            </span>
                        );
                        prescription = (
                            <span>
                                Check the numbers you input and try again?
                            </span>
                        );
                    }
                    else if(worst.name === 'Clean' && frontSquat !== undefined) {
                        console.log('YAAAA', worst.ratioDiff, Math.abs(frontSquat.ratioDiff), frontSquatAcceptableRange);
                        // Clean too high (and front squat ratio is within range) 
                        if(worst.ratioDiff > 0 && Math.abs(frontSquat.ratioDiff) < frontSquatAcceptableRange) {
                            diagnosis = (
                                <span>
                                    Based on the numbers you entered, since your clean is greater than your clean & jerk,
                                    and since you don’t appear to be limited by your front squat strength,
                                    it appears you have technical efficiency problems with your jerk.
                                </span>
                            );
                            prescription = (
                                <span>
                                    <p>
                                        While there are a number of common technical problems that could be hampering your jerk,
                                        it’s hard to tell from these numbers alone what aspect of your technique is the greatest limiter. 
                                    </p>
                                    <p>
                                        We recommend you evaluate your own lifts on video, or seek out a knowledgeable coach,
                                        to help you prioritize/fix your technical inefficiencies so you can better harness your strength in the jerk. 
                                    </p>
                                </span>);
                        }

                        // Clean too high (and front squat ratio is lower than ideal)
                        else if(worst.ratioDiff > 0 && frontSquat.ratioDiff < 0) {
                            diagnosis = (
                                <span>
                                    Based on the numbers you entered, since your clean is greater than your clean & jerk,
                                    and since your front squat numbers are lower than ideal, it appears your jerk is limited by your leg strength.
                                </span>
                            );
                            prescription = (
                                <span>
                                    You’ll likely benefit most by improving your leg strength through squatting.
                                    This includes both squatting more and rising faster from the bottom of the squat.
                                    Both improvements will give you more strength and energy for the jerk.
                                </span>
                            );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Back Squat') {
                        if(worst.ratioDiff > 0) {
                            // Back Squat too high
                            diagnosis = (
                                <span>
                                    Since your back squat is greater than ideal relative to your clean & jerk, and since this is
                                    the biggest disparity in the numbers you entered, it tells us that you likely have adequate strength
                                    levels to clean & jerk more. Since strength likely is not holding you back in the clean & jerk, you
                                    most likely have inefficiencies in your clean technique. 
                                </span>
                            );

                            prescription = (
                                <span>
                                    <p>
                                        While there are a number of common technical problems that could be
                                        hampering your clean & jerk, it’s hard to tell from these numbers
                                        alone what aspect of your technique is the greatest limiter. 
                                    </p>
                                    <p>
                                        We recommend you evaluate your own lifts on video, or seek out
                                        a knowledgeable coach to help you prioritize/fix your technical
                                        inefficiencies so you can better harness your strength. 
                                    </p>
                                    <p>
                                        <i>Note</i>: Since squat strength doesn’t seem to be a big limiter
                                        for you here, you may wish to re-perform the analysis without your
                                        back squat numbers to better hone in on your technical issues in the
                                        clean & jerk. This may tell you which area other than back squat
                                        represents your greatest disparity.
                                    </p>
                                </span>
                            );
                        }
                        else {
                            // Back Squat too low
                            diagnosis = (
                                <span>
                                    Since your ratio of back squat to clean is lower than ideal, and
                                    since this is the biggest disparity in the numbers you entered, it tells
                                    us you may be hampered most in your clean & jerk by weak legs.  If it
                                    doesn’t already cause you to miss lifts, your clean & jerks likely feel
                                    heavy since you are clean & jerking so close to your maximum strength.
                                </span>
                            );

                            prescription = (
                                <span>
                                    We recommend you focus on getting your legs stronger so you have more
                                    strength in reserve to make your clean & jerks more easily. You can do this
                                    by getting stronger in the squat plus practice rising faster from the bottom
                                    of the squat.
                                </span>
                            );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Front Squat') {
                        if(worst.ratioDiff < 0) {
                            // FS too low
                            diagnosis = (
                                <span>
                                    Since your ratio of front squat to clean is lower than ideal, and
                                    since this is the biggest disparity in the numbers you entered, it tells
                                    us you may be hampered most in your clean & jerk by weak legs. If it
                                    doesn’t already cause you to miss lifts, your clean & jerks likely feel
                                    heavy since you are clean & jerking so close to your maximum strength.
                                </span>
                            );

                            prescription = (
                                <span>
                                    We recommend you focus on getting your legs stronger so you have more
                                    strength in reserve to make your clean & jerks more easily. You can do this
                                    by getting stronger in the squat plus practice rising faster from the bottom
                                    of the squat.
                                </span>
                            );
                        }
                        else {
                            // FS too high
                            diagnosis = (
                                <span>
                                    Since your front squat is greater than necessary relative to your clean
                                    & jerk, and since this is the biggest disparity in the numbers you entered,
                                    it tells us you likely have adequate strength levels to clean & jerk more.
                                        Since strength is likely not holding you back in the clean & jerk, you
                                    most likely have inefficiencies in your clean & jerk technique. 
                                </span>
                            );

                            prescription = (
                                <span>
                                    <p>
                                        While there are a number of common technical problems that could be
                                        hampering your clean & jerk, it’s hard to tell from these numbers alone
                                        what aspect of your technique is the greatest limiter. 
                                    </p>
                                    <p>
                                        We recommend you evaluate your own lifts on video, or seek out
                                        a knowledgeable coach to help you prioritize/fix your technical
                                        inefficiencies so you can better harness your strength. 
                                    </p>
                                    <p>
                                        Note: Since squat strength doesn’t seem to be a big limiter for you
                                        here, you may wish to re-perform the analysis without your front
                                        squat numbers to better hone in on your technical issues in the
                                        clean & jerk. This may tell you which area other than front squat
                                        represents the greatest disparity.
                                    </p>
                                </span>
                            );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Jerk') {
                        if(frontSquat === undefined) {
                            // Jerk higher than expected
                            if(worst.ratioDiff > 0) {
                                diagnosis = (
                                    <span>
                                        Since your jerk is well above the ideal range compared with your clean
                                        & jerk, it appears you are likely being held back by your technical
                                        efficiency in the clean. 
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        <p>
                                            While there are a number of common technical problems that could be
                                            hampering your clean, it’s hard to tell from these numbers alone what
                                            aspect of your technique is the greatest limiter. 
                                        </p>
                                        <p>
                                            We recommend you evaluate your own lifts on video, or seek out
                                            a knowledgeable coach to help you prioritize/fix your technical
                                            inefficiencies so you can better harness your strength. 
                                        </p>
                                        <p>
                                            <i>Note</i>: Since the jerk doesn’t seem to be a big limiter for you here, you
                                            may wish to re-perform the analysis without your jerk numbers to better
                                            hone in on your issues in the clean.
                                        </p>
                                    </span>
                                );
                            }
                            // Jerk lower than expected
                            else {
                                diagnosis = (
                                    <span>
                                        Since your jerk is lower than ideal but we don’t know your front squat, our analysis is
                                        limited. If your squat ratios are in the right range, you may have jerk technique issues. If
                                        your squat ratios are below ideal range, you may have a strength and/or energy production
                                        problem.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        Please enter your front squat numbers and perform the analysis again.
                                    </span>
                                );
                            }
                        }
                        else {
                            // Jerk lower than expected (and front squat ratio is within range)
                            if(worst.ratioDiff < 0 && Math.abs(frontSquat.ratioDiff) < frontSquatAcceptableRange) {
                                diagnosis = (
                                    <span>
                                        Since your jerk is lower than ideal, since you don’t appear to be
                                        limited by strength according to your front squat numbers, and since
                                        this is the ratio with the greatest variance from ideal, it is likely
                                        you have technical inefficiencies in your jerk
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        <p>
                                            While there are a number of common technical problems that could be
                                            hampering your jerk, it’s hard to tell from these numbers alone what
                                            aspect of your technique is the greatest limiter. 
                                        </p>
                                        <p>
                                            We recommend you evaluate your own lifts on video, or seek out
                                            a knowledgeable coach to help you prioritize/fix your technical
                                            inefficiencies so you can better harness your strength for the jerk. 
                                        </p>
                                    </span>
                                );
                            }

                            // Jerk lower than expected (and front squat ratio is lower than ideal)
                            else if(worst.ratioDiff < 0 && frontSquat.ratioDiff < 0) {

                                diagnosis = (
                                    <span>
                                        Since your jerk is lower than ideal, and since your front squat is lower
                                        than ideal compared to your clean & jerk, it appears your jerk is
                                        limited by your strength.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        You’ll likely benefit most by improving your squatting. This
                                        includes both squatting more and rising faster from the bottom of
                                        the squat. Both improvements will give you more strength and energy
                                        for the jerk.
                                    </span>
                                );
                            }
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Power Clean') {

                        if(frontSquat === undefined) {
                            // Too low
                            if(worst.ratioDiff < 0) {
                                diagnosis = (
                                    <span>
                                        This tells us you may suffer from either weak legs or poor explosion/transition speed.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        Train to improve your explosion/transition speed. Enter a Front Squat number for further analysis.
                                    </span>
                                );
                            }
                            // Too high
                            else {
                                diagnosis = (
                                    <span>
                                         If your front squat is within acceptable range, you likely have technical
                                         inefficiencies in your clean & jerk. If your front squat is too low, you
                                         may be lacking strength, mobility, or both.       
                                    </span>
                                );

                                prescription = (
                                    <span>
                                         If your front squat is within acceptable range, focus on improving your
                                         mobility in the clean & jerk. If your front squat is too low, spend
                                         some time getting your legs stronger. Enter a front squat number for further analysis.
                                    </span>
                                );
                            }
                        }
                        else {
                            // PCL lower than expected (front squat within or above ideal range)
                            if(worst.ratioDiff < 0 && frontSquat.ratioDiff + frontSquatAcceptableRange >= 0) {
                                diagnosis = (
                                    <span>
                                        Since your power clean is lower than ideal compared with your clean
                                        & jerk, and since your front squat doesn’t appear to be deficient, you
                                        are most likely limited by poor explosion speed and/or slow change of
                                        direction/descent under the bar in your cleans.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        We recommend you work on improving your explosion speed and your
                                        change of direction speed to help you get under the bar faster in
                                        your cleans. You can do this by working on cleans/power cleans from
                                        the power position and hang above the knee (to help with speed and change of direction),
                                        and cleans/power cleans from blocks at the power position and above
                                        the knee (to help with acceleration and change of direction).
                                    </span>
                                );
                            }
                            // PCL lower than expected (front squat below ideal range)
                            else if(worst.ratioDiff < 0 && frontSquat.ratioDiff < -frontSquatAcceptableRange) {
                                diagnosis = (
                                    <span>
                                       Since your power clean is lower than ideal compared with your clean
                                       & jerk, and since your front squat is lower than ideal, you are most
                                       likely limited by poor explosion strength and/or  you are weak in the
                                       receiving position of the clean.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       We recommend you work on improving your explosion strength and your
                                       strength in the receiving position. You can do this by working on
                                       front squats and partial front squats (to improve strength in the receiving position),
                                       cleans/power cleans from the power position and hang above the knee
                                       (to help with speed and change of direction) and cleans/power cleans
                                       from blocks at the power position and above the knee 
                                       (to help with acceleration and change of direction).
                                    </span>
                                );
                            }
                            // PCL higher than expected (and front squat ratio is within range)
                            else if(worst.ratioDiff > 0 && Math.abs(frontSquat.ratioDiff) < frontSquatAcceptableRange) {
                                diagnosis = (
                                    <span>
                                       Since your power clean is higher than ideal compared with your clean
                                       & jerk, but your front squat suggests you have adequate strength in
                                       reserve, it appears you are most likely limited by technical
                                       inefficiencies in receiving the clean (e.g. footwork, elbow speed, and potentially torso position) 
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       First we recommend you double-check that you are in good receiving
                                       position in your cleans (just like your front squats). If you’re not
                                       in good receiving position, you may benefit from spending time with
                                       mobility work. Assuming your receiving position is OK, you’ll likely
                                       get the greatest improvement practicing cleans/power cleans from the
                                       blocks or the hang, either from the power position or from above the
                                       knee. These will help you focus on receiving the bar more
                                       efficiently. 
                                    </span>
                                );
                            }
                            else if(worst.ratioDiff > 0 && frontSquat.ratioDiff < -frontSquatAcceptableRange) {
                                diagnosis = (
                                    <span>
                                       Since your power clean is higher than ideal compared with your clean
                                       & jerk, but your front squat is lower than ideal, it suggests you
                                       have very limited strength reserve, Thus your clean & jerk is likely
                                       limited by your strength. If your positioning is bad, this could also
                                       be related to mobility. 
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       We recommend you work on making sure you are in a good receiving
                                       position. If you’re not in good receiving position, you may benefit
                                       from spending time with mobility work. If you are in good receiving
                                       position, you should focus on getting your legs stronger so you have
                                       more strength reserve to better make your cleans and jerks. This
                                       should include squatting more and rising faster from the squat. 
                                    </span>
                                );
                            }
                        }

                        // // PCL lower than expected
                        // if(worst.ratioDiff < 0) {
                        //     diagnosis = "This tells us you may suffer from poor explosion/transition speed.";
                        //     prescription = "You should work on improving your explosion and your change of direction speed (getting under bar faster)";
                        // }

                        // // PCL higher than expected (and front squat ratio is within range)
                        // else if(frontSquat !== undefined && Math.abs(frontSquat.ratioDiff) < frontSquatAcceptableRange) {
                        //     diagnosis = "Since your front squat is within acceptable range, you likely have technical inefficiencies in your clean & jerk.";
                        //     prescription = "We recommend you analyze (or get coaching help to analyze) your clean & jerk technique and work on fixing it.";
                        // }

                        // // PCL higher than expected (and front squat ratio is lower than ideal)
                        // else if(frontSquat !== undefined && frontSquat.ratioDiff < 0) {
                        //     diagnosis = "Since your front squat is lower than the acceptable range, you may be lacking strength, mobility, or both.";
                        //     prescription = "We recommend you spend some time getting your legs stronger and/or improving your mobility";
                        // }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Clean Blocks Abv Knee') {
                        // Lower than ideal
                        if(worst.ratioDiff < 0) {
                                diagnosis = (
                                    <span>
                                       Since your clean from blocks above the knee is lower than ideal
                                       relative to your clean & jerk, and since this is the biggest
                                       disparity in the numbers you entered, it tell us your biggest
                                       weakness is likely in the vertical explosion.  
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       We recommend you incorporate training to improve your explosion such
                                       as box jumps, heavy partial squats, and jumping squats with the
                                       barbell. 
                                    </span>
                                );
                        }
                        // Higher than ideal
                        else {
                                diagnosis = (
                                    <span>
                                        Since your clean from blocks above the knee is greater than
                                        ideal relative to your clean & jerk, and since this is the biggest
                                        disparity in the numbers you entered, it tells us you likely suffer
                                        from issues in the clean when moving the bar from the floor past
                                        your knees. This may be a strength issue off the floor or
                                        a coordination issue passing your knees.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       We recommend you incorporate training to improve breaking the bar off
                                       the floor and passing your knees. This might include clean pulls to
                                       the knee and clean pulls to the hip. You may also wish to include
                                       lifts from the hang below the knee. 
                                    </span>
                                );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Hang Clean Below Knee') {
                        // Lower than ideal
                        if(worst.ratioDiff < 0) {
                                diagnosis = (
                                    <span>
                                       Since your hang clean from below the knee is lower than ideal
                                       relative to your clean & jerk, and since this is the biggest
                                       disparity in the numbers you entered, it tells us you may have poor
                                       back strength or coordination problems when the bar passes your
                                       knees. 
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       If it’s a back strength issue, we recommend you incorporate exercises
                                       like RDLs, back extensions, clean pulls to the hip. If it’s
                                       a coordination issue, you should practice more lifts from below the
                                       knee (power clean, clean) as well as pulls and extensions. 
                                    </span>
                                );
                        }
                        // Higher than ideal
                        else {
                                diagnosis = (
                                    <span>
                                        Since your hang clean from below the knee is greater than ideal
                                        relative to your clean & jerk, and since this is the biggest
                                        disparity in the numbers you entered, it tells us you likely suffer
                                        from issues when you break the bar off the floor in the clean.
                                    </span>
                                );

                                prescription = (
                                    <span>
                                        We recommend you incorporate training to improve breaking the bar
                                        off the floor. This might include clean pulls to the knee and more
                                        lifts from floor.
                                    </span>
                                );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Overhead Squat') {
                        // OHS lower than ideal
                        if(worst.ratioDiff < 0) {
                                diagnosis = (
                                    <span>
                                       Since your overhead squat is lower than ideal relative to your
                                       snatch, and since this is the biggest disparity in the numbers you
                                       entered, it tells us you likely have a problem with overhead
                                       stability in the receiving position of the snatch. 
                                    </span>
                                );

                                prescription = (
                                    <span>
                                       We recommend you spend some time focused on increasing your overhead
                                       strength and stability. You can do this by adding lots of presses
                                       from different positions (including behind neck, seated, from squat, etc) and with different grips (snatch, clean).
                                       You can also incorporate upper back work with rows, dips, lat pulldowns, pullups, etc. 
                                    </span>
                                );
                        }
                        // OHS higher than ideal
                        else {
                            results = _.filter(results, (r) => r.name !== 'Overhead Squat');
                            if(results.length > 0) {
                                notes = (
                                    <span>
                                    You have a huge Overhead Squat. This isn't a problem, so we moved on to your next weakness for analysis.
                                    </span>
                                );
                                finished = false;
                            }
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Power Snatch') {
                        // Lower than ideal
                        if(worst.ratioDiff < 0) {
                            diagnosis = (
                                <span>
                                    Since your power snatch is lower than ideal compared to your snatch,
                                    and since this is the biggest disparity we detected, you are most
                                    likely limited by poor explosion and/or you are slow changing
                                    directions and getting under the bar.
                                </span>
                            );

                            prescription = (
                                <span>
                                   We recommend you work on improving your explosion speed and your
                                   change of direction speed to help you get under the bar faster. You
                                   can do this by working on snatches/power snatches from the power
                                   position and hang above the knee (to help with speed and change of direction)
                                   and snatches/power snatches from blocks at the power position and above the knee 
                                   (to help with acceleration and change of direction).
                               </span>
                            );
                        }
                        else {
                            diagnosis = (
                                <span>
                                   Since your power snatch is higher than ideal compared with your
                                   snatch, it appears you are most likely being held back by strength or
                                   confidence in your receiving position. 
                                </span>
                            );

                            prescription = (
                                <span>
                                   To improve your strength and confidence in the receiving position of
                                   the snatch, you might work on snatch balance, overhead squat,
                                   overhead squat with a pause, and snatch-grip presses 
                                   (standing, seated, and from squat). 
                                </span>
                            );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Snatch Blocks Abv Knee') {
                        // Lower than ideal
                        if(worst.ratioDiff < 0) {
                            diagnosis = (
                                <span>
                                    Since your snatch from blocks above the knee is lower than ideal
                                    relative to your snatch, and since this is the biggest disparity in the
                                    numbers you entered, it tell us your biggest weakness is likely in the
                                    vertical explosion. 
                                </span>
                            );

                            prescription = (
                                <span>
                                    We recommend you incorporate training to improve your explosion such
                                    as box jumps, heavy partial squats, and jumping squats with the
                                    barbell.
                                </span>
                            );
                        }
                        // Higher than ideal
                        else {
                            diagnosis = (
                                <span>
                                   Since your snatch from blocks above the knee is greater than
                                   ideal relative to your snatch, and since this is the biggest
                                   disparity in the numbers you entered, it tells us you likely suffer
                                   from issues in the snatch when moving the bar from the floor and past
                                   your knees. This may be a strength issue off the floor or
                                   a coordination issue passing your knees. 
                                </span>
                            );

                            prescription = (
                                <span>
                                    We recommend you incorporate training to improve breaking the bar off
                                    the floor and passing your knees. This might include snatch pulls to the
                                    knee and snatch pulls to the hip. You may also wish to include lifts
                                    from the hang below the knee.
                                </span>
                            );
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
                    else if(worst.name === 'Hang Snatch Below Knee') {
                        if(worst.ratioDiff < 0) {
                            diagnosis = (
                                <span>
                                    Since your hang snatch from below the knee is lower than ideal
                                    relative to your snatch, and since this is the biggest disparity in the
                                    numbers you entered, it tells us you may have poor back strength or
                                    coordination problems when the bar passes your knees.
                                </span>
                            );

                            prescription = (
                                <span>
                                   If it’s a back strength issue, we recommend you incorporate exercises
                                   like RDLs (regular grip and snatch grip), back extensions, and snatch
                                   pulls to the hip. If it’s a coordination issue, you should practice
                                   more lifts from below the knee (power snatch, snatch) as well as
                                   snatch pulls and snatch extensions. 
                                </span>
                            );
                        }
                        else {
                            diagnosis = (
                                <span>
                                   Since your hang snatch from below the knee is greater than ideal
                                   relative to your snatch, and since this is the biggest disparity in
                                   the numbers you entered, it tells us you likely suffer from issues
                                   when you break the bar off the floor in the snatch. 
                                </span>
                            );

                            prescription = (
                                <span>
                                   We recommend you incorporate training to improve breaking the bar off
                                   the floor. This might include snatch pulls to the knee and more lifts
                                   from floor. 
                                </span>
                            );
                        }
                    }
                }

                // Create the generic description text for this calculation
                let description = `The ideal is to have your ${worst.name} at
                ${formatNumber(worst.expectedRatio)}% of your ${this.props.baseName}, however your
                ${worst.name} is at ${formatNumber(worst.actualRatio)}%
                    of your ${this.props.baseName}. That's a ${formatNumber(worst.ratioDiff)}% differential.`

                // Create the HTML to display the diagnosis/prescription/description
                resultsContent = (
                        <span>
                            <p>
                                Based on your inputs the ratio with the greatest difference is <u>{worst.name}</u>. 
                            </p>
                            <dl>
                                <dt>Diagnosis</dt>
                                <dd>{diagnosis}</dd>

                                <dt>Prescription</dt>
                                <dd>{prescription}</dd>

                                <dt>How did we get this?</dt>
                                <dd>{description}</dd>
                            </dl>
                            <p>
                                <i>{notes}</i>
                            </p>
                        </span>);
            }
        }

        return (<Panel header={analysisName} bsStyle="danger">{resultsContent}</Panel>);
    }
}

export {BaseResults, AccessoryResults, BaseLiftInput, AccessoryLiftInput, AccessoryRatioDisplay};
