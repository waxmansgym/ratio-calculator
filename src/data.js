const accessories = {
    snatch: {
        'Overhead Squat':         { ratio: 105 },
        'Power Snatch':           { ratio:  80 },
        'Snatch Blocks Abv Knee': { ratio:  95 },
        'Hang Snatch Below Knee': { ratio:  95 }
    },
    cnj: {
        'Clean':                  { ratio: 102 },
        'Back Squat':             { ratio: 134 },
        'Front Squat':            { ratio: 115 },
        'Jerk':                   { ratio: 105 },
        'Power Clean':            { ratio:  80 },
        'Clean Blocks Abv Knee':  { ratio:  95 },
        'Hang Clean Below Knee':  { ratio:  95 }
    }
};

// Accessory Diagnoses
const diagnoses = {
    'Clean': {
        'too_low': 'This seems like a statistical impossibility. If you can clean & jerk it, you can clean it. Check your numbers and try again?',
        'too_high': 'You seem to have an issue with your jerk. If your squat ratios are in the right range, you may have jerk technique issues. If your squat ratios are below ideal range, you may have a strength and/or energy production problem.'
    },
    'Back Squat': {
        'too_low': 'You may be hampered by weak legs. If it doesnt already plaugue your lifts, you may be operating at a high level of stress.',
        'too_high': 'You appear to have adequate strength levels to clean & jerk more. You are likely being held back by your technique.'
    },
    'Front Squat': {
        'too_low': 'You may be hampered by weak legs. If it doesnt already plaugue your lifts, you may be operating at a high level of stress.',
        'too_high': 'You appear to have adequate strength levels to clean & jerk more. You are likely being held back by your technique.'
    },
    'Jerk': {
        'too_low': 'If your squat ratios are in the right range, you may have jerk technique issues. If your squat ratios are below ideal range, you may have a strength and/or energy production problem.',
        'too_high': 'Assuming your strength levels are adequate, this tells us you may have issues with your efficiency (technique and/or power production) in the clean.'
    },
    'Power Clean': {
        'too_low': 'This tells us you may suffer from either weak legs or poor explosion/transition speed.',
        'too_high': 'If your front squat is within acceptable range, you likely have technical inefficiencies in your clean & jerk. If your front squat is too low, you may be lacking strength, mobility, or both.'
    },
    'Clean Blocks Abv Knee': {
        'too_low': 'You likely have difficulty with vertical explosion. ',
        'too_high': 'You likely have issues when you break the bar off the floor.'
    },
    'Hang Clean Below Knee': {
        'too_low': 'You may have poor back strength or coordination problems.',
        'too_high': 'You likely have issues when you break the bar off the floor.'
    },
    'Overhead Squat': {
        'too_low': 'This tells us you have a problem with overhead stability.',
        'too_high': 'Even if you can overhead squat a large house, it doesnt tell us much.'
    },
    'Power Snatch': {
        'too_low': 'This tells us you may suffer from either weak legs or poor explosion/transition speed.',
        'too_high': 'This tells us you may be lacking sufficient mobility or coordination.'
    },
    'Snatch Blocks Abv Knee': {
        'too_low': 'You likely have difficulty with vertical explosion.',
        'too_high': 'You likely have issues when you break the bar off the floor.'
    },
    'Hang Snatch Below Knee': {
        'too_low': 'You may have poor back strength or coordination problems.',
        'too_high': 'You likely have issues when you break the bar off the floor.'
    }
};

// Accessory Prescriptions
const prescriptions = {
    'Clean': {
        'too_low': '',
        'too_high': 'Check to make sure your squat ratios are in the right range (enter them above for analysis). If not, you may get near-term benefit by getting stronger. If squats are in the right range, you should analyze your jerk technique and spend time trying to improve it.'
    },
    'Back Squat': {
        'too_low': 'We recommend you focus on getting your legs stronger.',
        'too_high': 'We recommend you focus on improving your efficiency and technique in the clean & jerk.'
    },
    'Front Squat': {
        'too_low': 'We recommend you focus on getting your legs stronger.',
        'too_high': 'We recommend you focus on improving your efficiency and technique in the clean & jerk.'
    },
    'Jerk': {
        'too_low': 'If your squat ratios are in the right range, we recommend you focus on improving your technique in the jerk. If your squats are below range, you need to get your legs stronger.',
        'too_high': 'Assuming your squat ratios are within adequate range, we recommend you focus on improving your efficiency and technique in the clean.'
    },
    'Power Clean': {
        'too_low': 'Train to improve your explosion/transition speed.',
        'too_high': 'If your front squat is within acceptable range, focus on improving your mobility in the clean & jerk. If your front squat is too low, spend some time getting your legs stronger.'
    },
    'Clean Blocks Abv Knee': {
        'too_low': 'You should spend more time improving your explosion',
        'too_high': 'You should spend more time practicing clean pulls from the floor and/or from a deficit.'
    },
    'Hang Clean Below Knee': {
        'too_low': 'You should get your back stronger, or find a coach to help you isolate and fix likely coordination problems.',
        'too_high': 'You should spend more time practicing clean pulls from the floor and/or from a deficit.'
    },
    'Overhead Squat': {
        'too_low': 'You should work on overhead strength and stability.',
        'too_high': 'Congratulations Mr./Mrs. Overhead Squat. We have no prescription for you.'
    },
    'Power Snatch': {
        'too_low': 'You should think about getting your legs stronger...or improving your explosion and speed changing directions/getting under the bar.',
        'too_high': 'You either need to improve your mobility or find a coach to help you isolate and fix likely coordination problems.'
    },
    'Snatch Blocks Abv Knee': {
        'too_low': 'You should spend more time improving your explosion.',
        'too_high': 'You should spend more time practicing clean pulls from the floor and/or from a deficit.'
    },
    'Hang Snatch Below Knee': {
        'too_low': 'You should get your back stronger, or find a coach to help you isolate and fix likely coordination problems.',
        'too_high': 'You should spend more time practicing clean pulls from the floor and/or from a deficit.'
    }
};
export {accessories, diagnoses, prescriptions};
