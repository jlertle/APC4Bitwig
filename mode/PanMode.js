// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function PanMode (model)
{
    BaseMode.call (this, model, 3, 64);
    this.id = MODE_PAN;
}
PanMode.prototype = new BaseMode ();

PanMode.prototype.setValue = function (index, value)
{
    this.model.getCurrentTrackBank ().setPan (index, value);
};

PanMode.prototype.getValue = function (index)
{
    return this.model.getCurrentTrackBank ().getTrack (index).pan;
};
