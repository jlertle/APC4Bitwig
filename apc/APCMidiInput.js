// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function APCMidiInput ()
{
    MidiInput.call (this);
}

APCMidiInput.prototype = new MidiInput();

APCMidiInput.prototype.createNoteInput = function ()
{
    var noteInput = this.port.createNoteInput ("Akai APC", "B040??" /* Sustainpedal */);
    noteInput.setShouldConsumeEvents (false);
    return noteInput;
};
