// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function SendMode (model, sendIndex)
{
    BaseMode.call (this, model, 2, 0);
    this.id = MODE_SEND1 + sendIndex;
    this.sendIndex = sendIndex;
}
SendMode.prototype = new BaseMode ();

SendMode.prototype.setValue = function (index, value)
{
    this.model.getCurrentTrackBank ().setSend (index, this.sendIndex, value);
};

SendMode.prototype.getValue = function (index)
{
    return this.model.getCurrentTrackBank ().getTrack (index).sends[this.sendIndex].volume;
};
