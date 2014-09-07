// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function SessionView (model)
{
    BaseView.call (this, model);

    this.scrollerInterval = Config.sceneScrollInterval;
    this.isTemporary = false;
}
SessionView.prototype = new BaseView ();

SessionView.prototype.onActivate = function ()
{
    BaseView.prototype.onActivate.call (this);

    this.model.getCurrentTrackBank ().setIndication (true);
    this.drawSceneButtons ();
};

SessionView.prototype.drawSceneButtons = function () {};

SessionView.prototype.onGridNote = function (channel, scene, event)
{
    if (!event.isDown ())
        return;
        
    var tb = this.model.getCurrentTrackBank ();
    var slot = tb.getTrack (channel).slots[scene];
    var slots = tb.getClipLauncherSlots (channel);
    
    if (tb.getTrack (channel).recarm)
    {
        if (slot.isRecording)
            slots.launch (scene);
        else
            slots.record (scene);
    }
    else
        slots.launch (scene);
    slots.select (scene);
};

SessionView.prototype.scrollLeft = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    if (this.surface.isShiftPressed ())
        tb.scrollTracksPageUp ();
    else
        tb.scrollTracksUp ();
};

SessionView.prototype.scrollRight = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    if (this.surface.isShiftPressed ())
        tb.scrollTracksPageDown ();
    else
        tb.scrollTracksDown ();
};

SessionView.prototype.scrollUp = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    if (this.surface.isShiftPressed ())
        tb.scrollScenesPageUp ();
    else
        tb.scrollScenesUp ();
};

SessionView.prototype.scrollDown = function (event)
{
    var tb = this.model.getCurrentTrackBank ();
    if (this.surface.isShiftPressed ())
        tb.scrollScenesPageDown ();
    else
        tb.scrollScenesDown ();
};

SessionView.prototype.onScene = function (scene, event)
{
    if (event.isDown ())
    {
        this.model.getCurrentTrackBank ().launchScene (scene);
        this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_1 + scene, APC_BUTTON_STATE_ON);
    }
    else if (event.isUp ())
        this.surface.setButton (APC_BUTTON_SCENE_LAUNCH_1 + scene, APC_BUTTON_STATE_OFF);
};

SessionView.prototype.drawGrid = function ()
{
    var tb = this.model.getCurrentTrackBank ();
    for (var x = 0; x < 8; x++)
    {
        var t = tb.getTrack (x);
        for (var y = 0; y < 5; y++)
            this.drawPad (t.slots[y], x, y, t.recarm);
    }
};

SessionView.prototype.drawPad = function (slot, x, y, isArmed)
{
    var color = APC_COLOR_BLACK;

    if (this.surface.isMkII ())
    {
        var color = slot.isRecording ? APC_MKII_COLOR_RED_HI :
            (slot.hasContent ?
                (slot.color ? slot.color : APC_MKII_COLOR_AMBER) :
                (isArmed ? APC_MKII_COLOR_RED_LO : APC_MKII_COLOR_BLACK));
    }
    else
    {
        if (slot.isRecording)
            color = slot.isQueued ? APC_COLOR_RED_BLINK : APC_COLOR_RED;
        else if (slot.isPlaying)
            color = APC_COLOR_GREEN;
        else if (slot.isQueued)
            color = APC_COLOR_GREEN_BLINK;
        else if (slot.hasContent)
            color = APC_COLOR_YELLOW;
    }
    this.surface.pads.light (x, y, color, slot.isPlaying, slot.isQueued);
};
