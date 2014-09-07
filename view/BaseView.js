// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

CLIP_LENGTHS = [ '1 Beat', '2 Beats', '1 Bar', '2 Bars', '4 Bars', '8 Bars', '16 Bars', '32 Bars' ];
CLIP_LENGTHS_INDICES = [ 6, 5, 4, 3, 2, 1, 0, 7 ];

function BaseView (model)
{
    AbstractView.call (this, model);

    this.stopPressed = false;
    
    this.isTempoInc = false;
    this.isTempoDec = false;
    
    this.isKnobMoving = false;
    this.moveStartTime = 0;
}
BaseView.prototype = new AbstractView ();
BaseView.prototype.constructor = BaseView;

BaseView.prototype.usesButton = function (buttonID)
{
    switch (buttonID)
    {
        case APC_BUTTON_STOP_ALL_CLIPS:
        case APC_BUTTON_CLIP_STOP:
        case APC_BUTTON_CLIP_LAUNCH_1:
        case APC_BUTTON_CLIP_LAUNCH_2:
        case APC_BUTTON_CLIP_LAUNCH_3:
        case APC_BUTTON_CLIP_LAUNCH_4:
        case APC_BUTTON_CLIP_LAUNCH_5:
        case APC_BUTTON_SCENE_LAUNCH_1:
        case APC_BUTTON_SCENE_LAUNCH_2:
        case APC_BUTTON_SCENE_LAUNCH_3:
        case APC_BUTTON_SCENE_LAUNCH_4:
        case APC_BUTTON_SCENE_LAUNCH_5:
            return false;
    }
    return true;
};


//--------------------------------------
// Transport
//--------------------------------------

BaseView.prototype.onPlay = function (event)
{
    if (!event.isDown ())
        return;
    if (this.surface.isShiftPressed ())
        this.model.getTransport ().toggleLoop ();
    else
    {
        if (!this.restartFlag)
        {
            this.model.getTransport ().play ();
            this.doubleClickTest ();
        }
        else
        {
            this.model.getTransport ().stopAndRewind ();
            this.restartFlag = false;
        }
    }
};

BaseView.prototype.onStop = function (event)
{
    if (event.isDown ())
        this.model.getTransport ().stop ();
};

BaseView.prototype.onRecord = function (event)
{
    if (!event.isDown ())
        return;
    
    if (this.surface.isShiftPressed ())
        this.onFootswitch2 (127);
    else
        this.model.getTransport ().record ();
};

//--------------------------------------
// Navigation
//--------------------------------------

BaseView.prototype.onTempo = function (increase)
{
    this.model.getTransport ().changeTempo (increase, this.surface.isShiftPressed ());
};

BaseView.prototype.onNudge = function (isPlus, event)
{
    if (isPlus)
    {
        if (event.isDown ())
            this.isTempoInc = true;
        else if (event.isUp ())
            this.isTempoInc = false;
    }
    else
    {
        if (event.isDown ())
            this.isTempoDec = true;
        else if (event.isUp ())
            this.isTempoDec = false;
    }
    this.doChangeTempo ();
};

BaseView.prototype.doChangeTempo = function ()
{
    if (!this.isTempoInc && !this.isTempoDec)
        return;
    this.model.getTransport ().changeTempo (this.isTempoInc, this.surface.isShiftPressed ());
    scheduleTask (doObject (this, function ()
    {
        this.doChangeTempo ();
    }), null, 200);
};

BaseView.prototype.onCueLevel = function (value)
{
    this.model.getTransport ().changePosition (value < 65, this.surface.isShiftPressed ());
};

BaseView.prototype.onShift = function (event) {};

//--------------------------------------
// Track
//--------------------------------------

BaseView.prototype.onSelectTrack = function (index, event)
{
    if (!event.isDown ())
        return;
        
    if (this.surface.isPressed (APC_BUTTON_SEND_A))
        this.surface.setPendingMode (MODE_SEND1 + index);
    else if (this.surface.isShiftPressed ())
    {
        index = CLIP_LENGTHS_INDICES[index];
        displayNotification (CLIP_LENGTHS[index]);
        this.model.getCurrentTrackBank ().setNewClipLength (index);
    }
    else
        this.model.getCurrentTrackBank ().select (index);
};

BaseView.prototype.onActivator = function (index, event)
{
    if (event.isDown ())
        this.model.getCurrentTrackBank ().toggleMute (index);
};

BaseView.prototype.onSolo = function (index, event)
{
    if (event.isDown ())
        this.model.getCurrentTrackBank ().toggleSolo (index);
};

BaseView.prototype.onRecArm = function (index, event)
{
    if (event.isDown ())
        this.model.getCurrentTrackBank ().toggleArm (index);
};

BaseView.prototype.onVolume = function (index, value)
{
    this.model.getCurrentTrackBank ().setVolume (index, value);
};

BaseView.prototype.onPan = function (event)
{
    if (event.isDown ())
        this.surface.setPendingMode (MODE_PAN);
};
     
BaseView.prototype.onSend = function (sendIndex, event)
{
    if (!event.isDown ())
        return;
     
    // No Sends on FX tracks
    if (this.model.isEffectTrackBankActive ())
        return;
    this.surface.setPendingMode (MODE_SEND1 + (sendIndex + (this.surface.isShiftPressed () ? 3 : 0)));
};

BaseView.prototype.onUser = function (event)
{
    if (!event.isDown ())
        return;

    this.surface.setPendingMode (MODE_MACRO);
};

BaseView.prototype.onMasterVolume = function (value)
{
    this.model.getMasterTrack ().setVolume (value);
};

BaseView.prototype.onMaster = function (event)
{
    if (event.isDown ())
        this.model.getMasterTrack ().select ();
};

BaseView.prototype.onBank = function (event)
{
    if (!event.isDown ())
        return;
    this.model.toggleCurrentTrackBank ();
    if (this.model.isEffectTrackBankActive ())
    {
        // No Sends on effect tracks
        var mode = this.surface.getCurrentMode ();
        if (mode >= MODE_SEND1 && mode <= MODE_SEND8)
            this.surface.setPendingMode (MODE_PAN);
    }
};

//--------------------------------------
// Device
//--------------------------------------

BaseView.prototype.onDeviceOnOff = function (event)
{
    if (event.isDown ())
        this.model.getCursorDevice ().toggleEnabledState ();
};

BaseView.prototype.onDeviceValueKnob = function (index, value)
{
    var cd = this.model.getCursorDevice ();
    var param = cd.getFXParam (index);
    param.value = value;
    cd.setParameter (index, param.value);
    
    this.moveStartTime = new Date ().getTime ();
    if (this.isKnobMoving)
        return;

    this.isKnobMoving = true;
    this.startCheckKnobMovement ();
};

BaseView.prototype.onDeviceLeft = function (event)
{
    if (!event.isDown ())
        return;

    if (this.surface.isShiftPressed ())
        this.model.getCursorDevice ().previousParameterPage ();
    else
        this.model.getCursorDevice ().selectPrevious ();
};

BaseView.prototype.onDeviceRight = function (event)
{
    if (!event.isDown ())
        return;
    if (this.surface.isShiftPressed ())
        this.model.getCursorDevice ().nextParameterPage ();
    else
        this.model.getCursorDevice ().selectNext ();
};

BaseView.prototype.onClipTrack = function (event)
{
    if (event.isDown ())
        this.model.getApplication ().toggleDevices ();
};


//--------------------------------------
// Further buttons
//--------------------------------------

BaseView.prototype.onTapTempo = function (event)
{
    if (event.isDown ())
        this.model.getTransport ().tapTempo ();
};

BaseView.prototype.onMetronome = function (event)
{
    if (event.isDown ())
        this.model.getTransport ().toggleClick ();
};

BaseView.prototype.onMidiOverdub = function (event)
{
    if (event.isDown ())
        this.model.getTransport ().toggleLauncherOverdub ();
};

BaseView.prototype.onQuantize = function (event)
{
    if (event.isDown ())
        this.model.getApplication ().quantize ();
};

BaseView.prototype.onDetailView = function (event)
{
    if (!event.isDown ())
        return;
        
    var app = this.model.getApplication ();
    switch (app.perspective)
    {
        case 'ARRANGE':
            app.setPerspective ('MIX');
            break;
        case 'MIX':
            app.setPerspective ('EDIT');
            break;
        case 'EDIT':
            app.setPerspective ('ARRANGE');
            break;
    }
};

//--------------------------------------
// Clips
//--------------------------------------

BaseView.prototype.onStopAllClips = function (event)
{
    if (event.isDown ())
        this.model.getCurrentTrackBank ().getClipLauncherScenes ().stop ();
};

BaseView.prototype.onClipStop = function (channel, event)
{
    if (event.isDown ())
    {
        if (this.surface.isShiftPressed ())
            this.model.getCurrentTrackBank ().returnToArrangement (channel);
        else
            this.model.getCurrentTrackBank ().stop (channel);
        this.surface.setButtonEx (APC_BUTTON_CLIP_STOP, channel, APC_BUTTON_STATE_ON);
    }
    else if (event.isUp ())
        this.surface.setButtonEx (APC_BUTTON_CLIP_STOP, channel, APC_BUTTON_STATE_OFF);
};

//--------------------------------------
// Footswitch
//--------------------------------------

BaseView.prototype.onFootswitch1 = function (value) {};

BaseView.prototype.onFootswitch2 = function (value)
{
    if (value != 127)
        return;
    var tb = this.model.getCurrentTrackBank ();
    var t = tb.getSelectedTrack ();
    if (t != null)
    {
        var slotIndex = this.getSelectedSlot (t);
        if (slotIndex == -1)
            slotIndex = 0;
            
        for (var i = 0; i < 8; i++)
        {
            var sIndex = (slotIndex + i) % 8;
            var s = t.slots[sIndex];
            if (!s.hasContent)
            {
                var slots = tb.getClipLauncherSlots (t.index);
                slots.createEmptyClip (sIndex, Math.pow (2, tb.getNewClipLength ()));
                if (slotIndex != sIndex)
                    slots.select (sIndex);
                slots.launch (sIndex);
                this.model.getTransport ().setLauncherOverdub (true);
                return;
            }
        }
    }
    displayNotification ("In the current selected grid view there is no empty slot. Please scroll down.");
};

//--------------------------------------
// Protected API
//--------------------------------------

BaseView.prototype.getSelectedSlot = function (track)
{
    for (var i = 0; i < track.slots.length; i++)
        if (track.slots[i].isSelected)
            return i;
    return -1;
};

BaseView.prototype.checkKnobMovement = function ()
{
    if (!this.isKnobMoving)
        return;
    if (new Date ().getTime () - this.moveStartTime > 200)
        this.isKnobMoving = false;
    else
        this.startCheckKnobMovement ();
};

BaseView.prototype.startCheckKnobMovement = function ()
{
    scheduleTask (doObject (this, function ()
    {
        this.checkKnobMovement ();
    }), [], 100);
}
