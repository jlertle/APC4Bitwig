// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function BaseMode (model, ledMode, defaultValue)
{
    AbstractMode.call (this, model);
    
    this.ledMode = ledMode;
    this.defaultValue = defaultValue;
    
    this.isKnobMoving = false;
    this.moveStartTime = 0;
}
BaseMode.prototype = new AbstractMode ();

// Abstract
BaseMode.prototype.setValue = function (index, value) {};
BaseMode.prototype.getValue = function (index) { return null; };


BaseMode.prototype.onActivate = function ()
{
    for (var i = 0; i < 8; i++)
        this.surface.setLED (APC_KNOB_TRACK_KNOB_LED_1 + i, this.ledMode);
};

BaseMode.prototype.onValueKnob = function (index, value)
{
    this.setValue (index, value);
    
    this.moveStartTime = new Date ().getTime ();
    if (this.isKnobMoving)
        return;

    this.isKnobMoving = true;
    this.startCheckKnobMovement ();
};

BaseMode.prototype.checkKnobMovement = function ()
{
    if (!this.isKnobMoving)
        return;
    if (new Date ().getTime () - this.moveStartTime > 200)
        this.isKnobMoving = false;
    else
        this.startCheckKnobMovement ();
};

BaseMode.prototype.startCheckKnobMovement = function ()
{
    scheduleTask (doObject (this, function ()
    {
        this.checkKnobMovement ();
    }), [], 100);
};

BaseMode.prototype.updateDisplay = function ()
{
    if (this.isKnobMoving)
        return;
    for (var i = 0; i < 8; i++)
    {
        var value = this.getValue (i);
        this.surface.setLED (APC_KNOB_TRACK_KNOB_1 + i, value ? value : this.defaultValue);
    }
};