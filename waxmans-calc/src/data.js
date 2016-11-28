const accessories = {
    snatch: {
        'Overhead Press': { ratio: 105 },
        'Power Snatch': { ratio: 80 },
        'Snatch Blocks Abv Knee': { ratio: 95 }
    },
    cnj: {
        'Clean': { ratio: 120 },
        'Back Squat': { ratio: 134}
    }
};

const diagnoses = {
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

const prescriptions = {
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
export {accessories, diagnoses, prescriptions};
