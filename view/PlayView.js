// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function PlayView (model)
{
    AbstractView.call (this, model);
    this.scales = model.getScales ();
    this.noteMap = this.scales.getEmptyMatrix ();
    this.pressedKeys = initArray (0, 128);
    this.defaultVelocity = [];
    for (var i = 0; i < 128; i++)
        this.defaultVelocity.push (i);
    var tb = model.getTrackBank ();
    tb.addNoteListener (doObject (this, function (pressed, note, velocity)
    {
        // Light notes send from the sequencer
        for (var i = 0; i < 128; i++)
        {
            if (this.noteMap[i] == note)
                this.pressedKeys[i] = pressed ? velocity : 0;
        }
    }));
    tb.addTrackSelectionListener (doObject (this, function (index, isSelected)
    {
        this.clearPressedKeys ();
    }));

    this.scrollerInterval = Config.trackScrollInterval;
}
PlayView.prototype = new AbstractView ();

PlayView.prototype.updateNoteMapping = function ()
{
    var t = this.model.getCurrentTrackBank ().getSelectedTrack ();
    this.noteMap = t != null && t.canHoldNotes ? this.scales.getNoteMatrix () : this.scales.getEmptyMatrix ();
    // Workaround: https://github.com/git-moss/Push4Bitwig/issues/7
    scheduleTask (doObject (this, function () { this.surface.setKeyTranslationTable (this.noteMap); }), null, 100);
};

PlayView.prototype.onActivate = function ()
{
    AbstractView.prototype.onActivate.call (this);

    this.model.getCurrentTrackBank ().setIndication (false);
    this.initMaxVelocity ();
    this.drawSceneButtons ();
};

PlayView.prototype.drawSceneButtons = function ()
{
    if (this.surface.isShiftPressed ())
    {
        AbstractView.prototype.drawSceneButtons.call (this);
        return;
    }
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_1, APC_BUTTON_STATE_ON);
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_2, APC_BUTTON_STATE_ON);
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_3, APC_BUTTON_STATE_OFF);
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_4, APC_BUTTON_STATE_ON);
    this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_5, APC_BUTTON_STATE_ON);
};

PlayView.prototype.updateArrows = function ()
{
    var tb = this.model.getCurrentTrackBank ();
    var sel = tb.getSelectedTrack ();
    this.canScrollLeft = sel != null && sel.index > 0 || tb.canScrollTracksUp ();
    this.canScrollRight = sel != null && sel.index < 7 || tb.canScrollTracksDown ();

    AbstractView.prototype.updateArrows.call (this);
};

PlayView.prototype.drawGrid = function ()
{
    var t = this.model.getCurrentTrackBank ().getSelectedTrack ();
    var isKeyboardEnabled = t != null && t.canHoldNotes;
    var isRecording = this.model.hasRecordingState ();

    for (var i = 36; i < 76; i++)
    {
        this.surface.pads.light (i, isKeyboardEnabled ? (this.pressedKeys[i] > 0 ?
            (isRecording ? AbstractSessionView.CLIP_COLOR_IS_RECORDING.color : AbstractSessionView.CLIP_COLOR_IS_PLAYING.color) :
            this.scales.getColor (this.noteMap, i)) : APC_COLOR_BLACK, null, false);
    }
};

PlayView.prototype.onScene = function (scene, event)
{
    if (!event.isDown ())
        return;
    switch (scene)
    {
        case 0:
            this.scales.nextScale ();
            Config.setScale (this.scales.getName (this.scales.getSelectedScale ()));
            displayNotification (this.scales.getName (this.scales.getSelectedScale ()));
            break;
        case 1:
            this.scales.prevScale ();
            Config.setScale (this.scales.getName (this.scales.getSelectedScale ()));
            displayNotification (this.scales.getName (this.scales.getSelectedScale ()));
            break;
        case 3:
            this.onOctaveUp (event);
            break;
        case 4:
            this.onOctaveDown (event);
            break;
    }
    this.updateNoteMapping ();
};

PlayView.prototype.onGridNote = function (note, velocity)
{
    var t = this.model.getCurrentTrackBank ().getSelectedTrack ();
    if (t == null || !t.canHoldNotes)
        return;

    this.surface.sendMidiEvent (0x90, this.noteMap[note], velocity);
        
    // Mark selected notes
    for (var i = 0; i < 128; i++)
    {
        if (this.noteMap[note] == this.noteMap[i])
            this.pressedKeys[i] = velocity;
    }
};

PlayView.prototype.onOctaveDown = function (event)
{
    this.clearPressedKeys ();
    this.scales.decOctave ();
    displayNotification (this.scales.getRangeText ());
};

PlayView.prototype.onOctaveUp = function (event)
{
    this.clearPressedKeys ();
    this.scales.incOctave ();
    displayNotification (this.scales.getRangeText ());
};

PlayView.prototype.scrollUp = function (event)
{
    if (this.surface.isShiftPressed ())
        this.model.getApplication ().arrowKeyLeft ();
    else
        this.model.getApplication ().arrowKeyUp ();
};

PlayView.prototype.scrollDown = function (event)
{
    if (this.surface.isShiftPressed ())
        this.model.getApplication ().arrowKeyRight ();
    else
        this.model.getApplication ().arrowKeyDown ();
};

PlayView.prototype.scrollLeft = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    var sel = tb.getSelectedTrack ();
    var index = sel == null ? 0 : sel.index - 1;
    if (index == -1)
    {
        if (!tb.canScrollTracksUp ())
            return;
        tb.scrollTracksPageUp ();
        scheduleTask (doObject (this, this.selectTrack), [7], 75);
        return;
    }
    this.selectTrack (index);
};

PlayView.prototype.scrollRight = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    var sel = tb.getSelectedTrack ();
    var index = sel == null ? 0 : sel.index + 1;
    if (index == 8)
    {
        if (!tb.canScrollTracksDown ())
            return;
        tb.scrollTracksPageDown ();
        scheduleTask (doObject (this, this.selectTrack), [0], 75);
    }
    this.selectTrack (index);
};

PlayView.prototype.onAccent = function (event)
{
    AbstractView.prototype.onAccent.call (this, event);
    if (event.isUp ())
        this.initMaxVelocity ();
};

PlayView.prototype.initMaxVelocity = function ()
{
    this.maxVelocity = initArray (Config.fixedAccentValue, 128);
    this.maxVelocity[0] = 0;
    this.surface.setVelocityTranslationTable (Config.accentActive ? this.maxVelocity : this.defaultVelocity);
};

PlayView.prototype.clearPressedKeys = function ()
{
    for (var i = 0; i < 128; i++)
        this.pressedKeys[i] = 0;
};