import msToTime from './msToTime.js';

const formatTime = (ms) => {
    let timeObj = msToTime(ms);

    return (
        timeObj.hours + ':' + timeObj.minutes + ':' + timeObj.seconds + '.' + timeObj.milliseconds
    );


};

export default formatTime;