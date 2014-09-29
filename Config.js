Config.INC_FRACTION_VALUE  = 0;
Config.MAX_PARAMETER_VALUE = 1;

// Inc/Dec of knobs
Config.fractionValue     = 1;
Config.fractionMinValue  = 0.5;
Config.maxParameterValue = 128;

// How fast the track and scene arrows scroll the banks/scenes
Config.trackScrollInterval = 100;
Config.sceneScrollInterval = 100;


//
// Property listeners
//

Config.listeners = [];
for (var i = Config.INC_FRACTION_VALUE; i <= Config.MAX_PARAMETER_VALUE; i++)
    Config.listeners[i] = [];

Config.addPropertyListener = function (property, listener)
{
    Config.listeners[property].push (listener);
};

Config.notifyListeners = function (property)
{
    var ls = Config.listeners[property];
    for (var i = 0; i < ls.length; i++)
        ls[i].call (null);
};

function Config () {}
