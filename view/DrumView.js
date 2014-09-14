// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

DrumView.NUM_DISPLAY_COLS = 16;
DrumView.DRUM_START_KEY = 36;

function DrumView (model)
{
    AbstractSequencerView.call (this, model, 128, DrumView.NUM_DISPLAY_COLS);
    this.offsetY = DrumView.DRUM_START_KEY;
    this.canScrollUp = false;
    this.canScrollDown = false;
    // TODO: Read the information in Bitwig 1.1
    this.pads = initArray ({ exists: true, solo: false, mute: false }, 12);
    this.selectedPad = 0;
    this.pressedKeys = initArray (0, 128);
    this.noteMap = this.scales.getEmptyMatrix ();

    var tb = model.getTrackBank ();
    tb.addNoteListener (doObject (this, function (pressed, note, velocity)
    {
        // Light notes send from the sequencer
        this.pressedKeys[note] = pressed ? velocity : 0;
    }));
    tb.addTrackSelectionListener (doObject (this, function (index, isSelected)
    {
        this.clearPressedKeys ();
    }));
}
DrumView.prototype = new AbstractSequencerView ();

DrumView.prototype.onActivate = function ()
{
    AbstractSequencerView.prototype.onActivate.call (this);

    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_4, APC_BUTTON_STATE_ON);
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_5, APC_BUTTON_STATE_ON);
};

DrumView.prototype.updateArrows = function ()
{
    this.canScrollLeft = this.offsetX > 0;
    // this.canScrollRight = true; We do not know the number of steps
    AbstractSequencerView.prototype.updateArrows.call (this);
};

DrumView.prototype.updateNoteMapping = function ()
{
    var t = this.model.getCurrentTrackBank ().getSelectedTrack ();
    this.noteMap = t != null && t.canHoldNotes && !this.surface.isSelectPressed () ? this.scales.getDrumMatrix () : this.scales.getEmptyMatrix ();
    this.surface.setKeyTranslationTable (this.noteMap);
};

DrumView.prototype.onSelect = function (event)
{
    this.updateNoteMapping ();
};

DrumView.prototype.onGridNote = function (note, velocity)
{
    var index = note - 36;
    var x = index % 8;
    var y = Math.floor (index / 8);

    if (x < 4 && y < 3)
    {
        this.selectedPad = 4 * y + x;   // 0-16
        var playedPad = velocity == 0 ? -1 : this.selectedPad;
        // Mark selected note
        this.pressedKeys[this.offsetY + this.selectedPad] = velocity;
        this.surface.sendMidiEvent (0x90, this.offsetY + this.selectedPad, velocity);
        return;
    }
    
    if (y >= 3)
    {
        if (velocity != 0)
        {
            var col = 8 * (4 - y) + x;
            this.clip.toggleStep (col, this.offsetY + this.selectedPad, Config.accentActive ? Config.fixedAccentValue : velocity);
        }
    }
};

DrumView.prototype.onScene = function (index, event)
{
    if (!event.isDown ())
        return;
    switch (index)
    {
        case 3:
            this.onOctaveUp (event);
            break;
        case 4:
            this.onOctaveDown (event);
            break;
    }
}

DrumView.prototype.onOctaveDown = function (event)
{
    this.clearPressedKeys ();
    this.scales.decDrumOctave ();
    this.offsetY = DrumView.DRUM_START_KEY + this.scales.getDrumOctave () * 16;
    this.updateNoteMapping ();
    displayNotification (this.scales.getDrumRangeText ());
};

DrumView.prototype.onOctaveUp = function (event)
{
    this.clearPressedKeys ();
    this.scales.incDrumOctave ();
    this.offsetY = DrumView.DRUM_START_KEY + this.scales.getDrumOctave () * 16;
    this.updateNoteMapping ();
    displayNotification (this.scales.getDrumRangeText ());
};

DrumView.prototype.drawGrid = function ()
{
    var isRecording = this.model.hasRecordingState ();

    // 3x4 Grid
    for (var y = 0; y < 3; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            var index = 4 * y + x;
            var p = this.pads[index];
            var c = this.pressedKeys[this.offsetY + index] > 0 ? (isRecording ? DrumView.COLOR_RECORD : DrumView.COLOR_PLAY) : (this.selectedPad == index ? DrumView.COLOR_SELECTED : (p.exists ? (p.mute ? DrumView.COLOR_MUTED : (p.solo ? DrumView.COLOR_SOLO : DrumView.COLOR_HAS_CONTENT)) : DrumView.COLOR_NO_CONTENT));
            this.surface.pads.lightEx (x, 4 - y, c, null, false);
        }
    }
    
    // Clip length/loop
    for (var x = 4; x < 8; x++)
        for (var y = 0; y < 3; y++)
            this.surface.pads.lightEx (x, 4 - y, APC_COLOR_BLACK, null, false);
            
    // Paint the sequencer steps
    var step = this.clip.getCurrentStep ();
    var hiStep = this.isInXRange (step) ? step % DrumView.NUM_DISPLAY_COLS : -1;
    for (var col = 0; col < DrumView.NUM_DISPLAY_COLS; col++)
    {
        var isSet = this.clip.getStep (col, this.offsetY + this.selectedPad);
        var hilite = col == hiStep;
        var x = col % 8;
        var y = 4 - Math.floor (col / 8);
        this.surface.pads.lightEx (x, 4 - y, isSet ? (hilite ? AbstractSequencerView.COLOR_STEP_HILITE_NO_CONTENT : AbstractSequencerView.COLOR_CONTENT) : hilite ? AbstractSequencerView.COLOR_STEP_HILITE_CONTENT : AbstractSequencerView.COLOR_NO_CONTENT, null, false);
    }
};

DrumView.prototype.clearPressedKeys = function ()
{
    for (var i = 0; i < 128; i++)
        this.pressedKeys[i] = 0;
}