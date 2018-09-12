/* Waxman's Gym Ratio Calculator Copyright (C) 2017 Waxman's Gym

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

import React, { Component } from 'react';
import {formatNumber, isNumber} from '../helpers.js';

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
                                below for potential insights.</p>

                            <p>If you need a training program that targets your snatch, check 
                                out our <a href="https://store.waxmansgym.com/collections/programming-and-downloads">downloadable 
                                Snatch program</a>.
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
                                        prioritize/fix your technical inefficiencies so you can better harness your strength. Also look at the clean-specific analysis below for potential insights.
                                    </p>
                                    <p>
                                     If you need a training program that targets your clean & jerk, check out our <a href="https://store.waxmansgym.com/collections/programming-and-downloads">doanloadable clean & jerk program</a>.   
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
                                    You may benefit most in the clean & jerk by improving your strength in the front squat. Also have a look at the clean-specific analysis below for more potential insights.
                                

                                <p>If you need a training program that targets your leg strength, including front squats,  
                                check out our <a href="https://store.waxmansgym.com/collections/programming-and-downloads">downloadable Leg Strength program</a>.
                                </p>
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
                            <h3>Diagnosis</h3>
                            {diagnosis}

                            <h3>Prescription</h3>
                            {prescription}

                            <h3>How did we get this?</h3>
                            {description}
                        </span>);
            }
        }

        return (
            <span>
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">Snatch Compared to C&J</h3>
                    </div>
                    <div className="panel-body" style={{textAlign: 'left'}}>
                        {resultsContent}
                    </div>
                </div>
            </span>
        );
    }
}

export {BaseResults};
// vim: filetype=javascript.jsx
