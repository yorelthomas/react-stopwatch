const msToTime = (ms) => {
    var milliseconds = Math.round((ms % 1000) / 10);
    //console.log(milliseconds, (ms % 1000) / 10)
    var seconds = Math.trunc((ms / 1000) % 60);
    var minutes = Math.trunc((ms / (1000 * 60)) % 60);
    var hours = Math.trunc((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return {
        "hours": hours,
        'minutes': minutes,
        'seconds': seconds,
        'milliseconds': milliseconds
    }
}

export default msToTime;