// How to hack an equalizer with two biquad filters
//
// 1. Extract the low frequencies (highshelf)
// 2. Extract the high frequencies (lowshelf)
// 3. Subtract low and high frequencies (add invert) from the source for the mid frequencies.
// 4. Add everything back together
//
// andre.michelle@gmail.com
var context = new AudioContext();
var mediaElement = document.getElementById('player');
//var mediaElement = document.getElementById('player');

var sourceNode = context.createMediaElementSource(mediaElement);

// EQ Properties
//
var panner = context.createPanner();
panner.setPosition(0, 0, 1);
panner.panningModel = "equalpower";
panner.connect(context.destination);
var gainL = context.createGain();
var gainR = context.createGain();
gainL.gain.value = 0;
gainR.gain.value = 1;
var splitter = context.createChannelSplitter(2);
sourceNode.connect(splitter, 0, 0);
sourceNode.connect(panner);
splitter.connect(gainL, 0);
splitter.connect(gainR, 1);

gainL.connect(context.destination, 0);
gainR.connect(context.destination, 0);


// Input
//
function changeGain(string) {
    var value = parseFloat(string);
    if (value > 0) {
        gainL.gain.value = 1;
        gainR.gain.value = 1 - value;
    } else {
        gainL.gain.value = 1 - Math.abs(value);
        gainR.gain.value = 1;
    }
}
function changePanner(string) {
    var value = parseFloat(string);
    panner.setPosition(value, 0, 1 - Math.abs(value));
}