// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

// Midi Notes
var APC_BUTTON_RECORD_ARM      = 0x30;
var APC_BUTTON_SOLO            = 0x31;
var APC_BUTTON_ACTIVATOR       = 0x32;
var APC_BUTTON_TRACK_SELECTION = 0x33;
var APC_BUTTON_CLIP_STOP       = 0x34;
var APC_BUTTON_CLIP_LAUNCH_1   = 0x35;
var APC_BUTTON_CLIP_LAUNCH_2   = 0x36;
var APC_BUTTON_CLIP_LAUNCH_3   = 0x37;
var APC_BUTTON_CLIP_LAUNCH_4   = 0x38;
var APC_BUTTON_CLIP_LAUNCH_5   = 0x39;
var APC_BUTTON_CLIP_TRACK      = 0x3A;
var APC_BUTTON_DEVICE_ON_OFF   = 0x3B;
var APC_BUTTON_DEVICE_LEFT     = 0x3C;
var APC_BUTTON_DEVICE_RIGHT    = 0x3D;
var APC_BUTTON_DETAIL_VIEW     = 0x3E;
var APC_BUTTON_REC_QUANT       = 0x3F;
var APC_BUTTON_MIDI_OVERDUB    = 0x40;
var APC_BUTTON_METRONOME       = 0x41;
var APC_BUTTON_A_B             = 0x42;  // mkII
var APC_BUTTON_MASTER          = 0x50;
var APC_BUTTON_STOP_ALL_CLIPS  = 0x51;
var APC_BUTTON_SCENE_LAUNCH_1  = 0x52;
var APC_BUTTON_SCENE_LAUNCH_2  = 0x53;
var APC_BUTTON_SCENE_LAUNCH_3  = 0x54;
var APC_BUTTON_SCENE_LAUNCH_4  = 0x55;
var APC_BUTTON_SCENE_LAUNCH_5  = 0x56;
var APC_BUTTON_PAN             = 0x57;
var APC_BUTTON_SEND_A          = 0x58;
var APC_BUTTON_SEND_B          = 0x59;
var APC_BUTTON_SEND_C          = 0x5A;
var APC_BUTTON_PLAY            = 0x5B;
var APC_BUTTON_STOP            = 0x5C;
var APC_BUTTON_RECORD          = 0x5D;
var APC_BUTTON_UP              = 0x5E;
var APC_BUTTON_DOWN            = 0x5F;
var APC_BUTTON_RIGHT           = 0x60;
var APC_BUTTON_LEFT            = 0x61;
var APC_BUTTON_SHIFT           = 0x62;
var APC_BUTTON_TAP_TEMPO       = 0x63;
var APC_BUTTON_NUDGE_PLUS      = 0x64;
var APC_BUTTON_NUDGE_MINUS     = 0x65;
var APC_BUTTON_SESSION         = 0x66;  // mkII
var APC_BUTTON_BANK            = 0x67;  // mkII

// Midi CC
var APC_KNOB_TRACK_LEVEL       = 0x07;
var APC_KNOB_TEMPO             = 0x0D;  // mkII
var APC_KNOB_MASTER_LEVEL      = 0x0E;
var APC_KNOB_CROSSFADER        = 0x0F;
var APC_KNOB_DEVICE_KNOB_1     = 0x10;
var APC_KNOB_DEVICE_KNOB_2     = 0x11;
var APC_KNOB_DEVICE_KNOB_3     = 0x12;
var APC_KNOB_DEVICE_KNOB_4     = 0x13;
var APC_KNOB_DEVICE_KNOB_5     = 0x14;
var APC_KNOB_DEVICE_KNOB_6     = 0x15;
var APC_KNOB_DEVICE_KNOB_7     = 0x16;
var APC_KNOB_DEVICE_KNOB_8     = 0x17;
var APC_KNOB_DEVICE_KNOB_LED_1 = 0x18;
var APC_KNOB_DEVICE_KNOB_LED_2 = 0x19;
var APC_KNOB_DEVICE_KNOB_LED_3 = 0x1A;
var APC_KNOB_DEVICE_KNOB_LED_4 = 0x1B;
var APC_KNOB_DEVICE_KNOB_LED_5 = 0x1C;
var APC_KNOB_DEVICE_KNOB_LED_6 = 0x1D;
var APC_KNOB_DEVICE_KNOB_LED_7 = 0x1E;
var APC_KNOB_DEVICE_KNOB_LED_8 = 0x1F;
var APC_KNOB_CUE_LEVEL         = 0x2F;
var APC_KNOB_TRACK_KNOB_1      = 0x30;
var APC_KNOB_TRACK_KNOB_2      = 0x31;
var APC_KNOB_TRACK_KNOB_3      = 0x32;
var APC_KNOB_TRACK_KNOB_4      = 0x33;
var APC_KNOB_TRACK_KNOB_5      = 0x34;
var APC_KNOB_TRACK_KNOB_6      = 0x35;
var APC_KNOB_TRACK_KNOB_7      = 0x36;
var APC_KNOB_TRACK_KNOB_8      = 0x37;
var APC_KNOB_TRACK_KNOB_LED_1  = 0x38;
var APC_KNOB_TRACK_KNOB_LED_2  = 0x39;
var APC_KNOB_TRACK_KNOB_LED_3  = 0x3A;
var APC_KNOB_TRACK_KNOB_LED_4  = 0x3B;
var APC_KNOB_TRACK_KNOB_LED_5  = 0x3C;
var APC_KNOB_TRACK_KNOB_LED_6  = 0x3D;
var APC_KNOB_TRACK_KNOB_LED_7  = 0x3E;
var APC_KNOB_TRACK_KNOB_LED_8  = 0x3F;
var APC_FOOTSWITCH_1           = 0x40;
var APC_FOOTSWITCH_2           = 0x43;

var APC_BUTTON_STATE_OFF   = 0;
var APC_BUTTON_STATE_ON    = 1;
var APC_BUTTON_STATE_BLINK = 2;

var APC_BUTTONS_ALL =
[
    APC_BUTTON_RECORD_ARM,
    APC_BUTTON_SOLO,
    APC_BUTTON_ACTIVATOR,
    APC_BUTTON_TRACK_SELECTION,
    APC_BUTTON_CLIP_STOP,
    APC_BUTTON_CLIP_LAUNCH_1,
    APC_BUTTON_CLIP_LAUNCH_2,
    APC_BUTTON_CLIP_LAUNCH_3,
    APC_BUTTON_CLIP_LAUNCH_4,
    APC_BUTTON_CLIP_LAUNCH_5,
    APC_BUTTON_CLIP_TRACK,
    APC_BUTTON_DEVICE_ON_OFF,
    APC_BUTTON_DEVICE_LEFT,
    APC_BUTTON_DEVICE_RIGHT,
    APC_BUTTON_DETAIL_VIEW,
    APC_BUTTON_REC_QUANT,
    APC_BUTTON_MIDI_OVERDUB,
    APC_BUTTON_METRONOME,
    APC_BUTTON_A_B,
    APC_BUTTON_MASTER,
    APC_BUTTON_STOP_ALL_CLIPS,
    APC_BUTTON_SCENE_LAUNCH_1,
    APC_BUTTON_SCENE_LAUNCH_2,
    APC_BUTTON_SCENE_LAUNCH_3,
    APC_BUTTON_SCENE_LAUNCH_4,
    APC_BUTTON_SCENE_LAUNCH_5,
    APC_BUTTON_PAN,
    APC_BUTTON_SEND_A,
    APC_BUTTON_SEND_B,
    APC_BUTTON_SEND_C,
    APC_BUTTON_PLAY,
    APC_BUTTON_STOP,
    APC_BUTTON_RECORD,
    APC_BUTTON_UP,
    APC_BUTTON_DOWN,
    APC_BUTTON_RIGHT,
    APC_BUTTON_LEFT,
    APC_BUTTON_SHIFT,
    APC_BUTTON_TAP_TEMPO,
    APC_BUTTON_NUDGE_PLUS,
    APC_BUTTON_NUDGE_MINUS,
    APC_BUTTON_SESSION,
    APC_BUTTON_BANK
];

var APC_PRODUCT =
{
    APC_20     : '7B',
    APC_40     : '73',
    APC_40_MKII: '29'
};


function APC (output, input, product)
{
    AbstractControlSurface.call (this, output, input, APC_BUTTONS_ALL);
    
    this.product = product;
    this.shiftButtonId  = APC_BUTTON_SHIFT;
    output.sendSysex ("F0 47 7F " + product + " 60 00 04 41 08 02 01 F7"); // Set Mode 2

    this.pads = new Grid (output, this.isMkII ());
}
APC.prototype = new AbstractControlSurface ();

APC.prototype.isMkII = function ()
{
    return this.product == APC_PRODUCT.APC_40_MKII;
};

APC.prototype.shutdown = function ()
{
    // Turn off all buttons
    for (var i = 0; i < this.buttons.length; i++)
        this.setButton (this.buttons[i], APC_BUTTON_STATE_OFF);

    this.pads.turnOff ();
};

// Note: Weird to send to the DAW via APC...
APC.prototype.sendMidiEvent = function (status, data1, data2)
{
    this.noteInput.sendRawMidiEvent (status, data1, data2);
};


//--------------------------------------
// ViewState
//--------------------------------------

APC.prototype.updateButtons = function ()
{
    var view = this.getActiveView ();
    for (var i = 0; i < this.buttons.length; i++)
        this.setButton (this.buttons[i], view.usesButton (this.buttons[i]) ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
};

//--------------------------------------
// Display
//--------------------------------------

APC.prototype.setButton = function (button, state)
{
    this.output.sendNote (button, state);
};

APC.prototype.setButtonEx = function (button, channel, state)
{
    this.output.sendNoteEx (channel, button, state);
};

APC.prototype.setLED = function (knob, value)
{
    this.output.sendCC (knob, value);
};

//--------------------------------------
// Handlers
//--------------------------------------

APC.prototype.handleMidi = function (status, data1, data2)
{
    var code = status & 0xF0;
    var channel = status & 0xF;

    switch (code)
    {
        case 0x80:
            this.handleButtons (channel, data1, 0);
            break;

        case 0x90:
            this.handleButtons (channel, data1, data2);
            break;

        case 0xB0:
            this.handleCC (channel, data1, data2);
            break;
    }
};

APC.prototype.handleButtons = function (channel, note, value)
{
    if (this.isButton (note))
    {
        this.buttonStates[note] = value > 0 ? ButtonEvent.DOWN : ButtonEvent.UP;
        /* No long presses for APCs
        if (this.buttonStates[note] == ButtonEvent.DOWN)
        {
            scheduleTask (function (object, buttonID)
            {
                object.checkButtonState (buttonID);
            }, [this, note], AbstractControlSurface.buttonStateInterval);
        }*/

        // If consumed flag is set ignore the UP event
        if (this.buttonStates[note] == ButtonEvent.UP && this.buttonConsumed[note])
        {
            this.buttonConsumed[note] = false;
            return;
        }
    }

    this.handleEvent (note, value, channel);
};


APC.prototype.handleEvent = function (note, value, channel)
{
    var view = this.getActiveView ();
    if (view == null)
        return;
        
    var event = this.isButton (note) ? new ButtonEvent (this.buttonStates[note]) : null;
    
    // Clip pads on mkII
    if (note < 40)
    {
        view.onGridNote (36 + note, value);
        return;
    }
        
    switch (note)
    {
        ///////////////////////
        // Transport
        ///////////////////////
        
        case APC_BUTTON_PLAY:
            view.onPlay (event);
            break;
            
        case APC_BUTTON_STOP:
            view.onStop (event);
            break;
            
        case APC_BUTTON_RECORD:
            view.onRecord (event);
            break;

        case APC_BUTTON_MIDI_OVERDUB: // mkI
            if (this.isMkII ())
                view.onClipTrack (event);
            else
                view.onMidiOverdub (event);
            break;

        case APC_BUTTON_SESSION:      // mkII
            view.onMidiOverdub (event);
            break;
            
        ///////////////////////
        // Navigation
        ///////////////////////

        case APC_BUTTON_LEFT:
            view.onLeft (event);
            break;
            
        case APC_BUTTON_RIGHT:
            view.onRight (event);
            break;

        case APC_BUTTON_UP:
            view.onUp (event);
            break;

        case APC_BUTTON_DOWN:
            view.onDown (event);
            break;
            
        case APC_BUTTON_NUDGE_PLUS:
            view.onNudge (!this.isMkII (), event);
            break;

        case APC_BUTTON_NUDGE_MINUS:
            view.onNudge (this.isMkII (), event);
            break;
            
        case APC_BUTTON_SHIFT:
            view.onShift (event);
            break;

            
        ///////////////////////
        // Track
        ///////////////////////

        case APC_BUTTON_TRACK_SELECTION:
            view.onSelectTrack (channel, event);
            break;
            
        case APC_BUTTON_ACTIVATOR:
            if (this.isShiftPressed ())
                view.onAorB (channel, event);
            else
                view.onActivator (channel, event);
            break;
            
        case APC_BUTTON_A_B:
            view.onAorB (channel, event);
            break;

        case APC_BUTTON_SOLO:
            view.onSolo (channel, event);
            break;
            
        case APC_BUTTON_RECORD_ARM:
            view.onRecArm (channel, event);
            break;
            
        case APC_BUTTON_PAN:
            if (this.isShiftPressed ())
                view.onUser (event);
            else
                view.onPan (event);
            break;
            
        case APC_BUTTON_SEND_A:
            view.onSend (note - APC_BUTTON_SEND_A, event);
            break;
            
        case APC_BUTTON_SEND_B:
            if (this.isMkII ())
                view.onUser (event);
            else
                view.onSend (note - APC_BUTTON_SEND_A, event);
            break;

        case APC_BUTTON_SEND_C:
            if (this.isMkII ())
                view.onMetronome (event);
            else
                view.onSend (note - APC_BUTTON_SEND_A, event);
            break;
            
        case APC_BUTTON_MASTER:
            if (this.isShiftPressed ())
                view.onBank (event);
            else
                view.onMaster (event);
            break;

            
        ///////////////////////
        // Device
        ///////////////////////

        case APC_BUTTON_CLIP_TRACK:
            if (this.isMkII ())
                view.onDeviceLeft (event);
            else
                view.onClipTrack (event);
            break;

        case APC_BUTTON_DEVICE_ON_OFF:
            if (this.isMkII ())
                view.onDeviceRight (event);
            else
                view.onDeviceOnOff (event);
            break;

        case APC_BUTTON_DEVICE_LEFT:
            if (this.isMkII ())
                this.buttonStates[this.shiftButtonId] = ButtonEvent.DOWN;
            view.onDeviceLeft (event);
            if (this.isMkII ())
                this.buttonStates[this.shiftButtonId] = ButtonEvent.UP;
            break;
        
        case APC_BUTTON_DEVICE_RIGHT:
            if (this.isMkII ())
                this.buttonStates[this.shiftButtonId] = ButtonEvent.DOWN;
            view.onDeviceRight (event);
            if (this.isMkII ())
                this.buttonStates[this.shiftButtonId] = ButtonEvent.UP;
            break;
            
        case APC_BUTTON_BANK:
            view.onBank (event);
            break;


        ///////////////////////
        // Further buttons
        ///////////////////////

        // Tap Tempo
        case APC_BUTTON_TAP_TEMPO:
            view.onTapTempo (event);
            break;
    
        // Click
        case APC_BUTTON_METRONOME:
            if (this.isMkII ())
                view.onDetailView (event);
            else
                view.onMetronome (event);
            break;
            
        case APC_BUTTON_REC_QUANT:
            view.onQuantize (event);
            break;
            
        case APC_BUTTON_DETAIL_VIEW:
            if (this.isMkII ())
                view.onDeviceOnOff (event);
            else
                view.onDetailView (event);
            break;
            

        ///////////////////////
        // Clips
        ///////////////////////

        case APC_BUTTON_SCENE_LAUNCH_1:
        case APC_BUTTON_SCENE_LAUNCH_2:
        case APC_BUTTON_SCENE_LAUNCH_3:
        case APC_BUTTON_SCENE_LAUNCH_4:
        case APC_BUTTON_SCENE_LAUNCH_5:
            if (this.isShiftPressed ())
                view.onShiftScene (note - APC_BUTTON_SCENE_LAUNCH_1, event);
            else
                view.onScene (note - APC_BUTTON_SCENE_LAUNCH_1, event);
            break;
            
        case APC_BUTTON_CLIP_LAUNCH_1:
        case APC_BUTTON_CLIP_LAUNCH_2:
        case APC_BUTTON_CLIP_LAUNCH_3:
        case APC_BUTTON_CLIP_LAUNCH_4:
        case APC_BUTTON_CLIP_LAUNCH_5:
            view.onGridNote (36 + (4 - (note - APC_BUTTON_CLIP_LAUNCH_1)) * 8 + channel, value);
            break;
            
        case APC_BUTTON_STOP_ALL_CLIPS:
            view.onStopAllClips (event);
            break;
            
        case APC_BUTTON_CLIP_STOP:
            view.onClipStop (channel, event);
            break;
            
        default:
            println ("Unused note: " + note);
            break;
    }
};

APC.prototype.handleCC = function (channel, cc, value)
{
    var view = this.getActiveView ();
    if (view == null)
        return;
        
    switch (cc)
    {
        case APC_KNOB_TRACK_LEVEL:
            view.onVolume (channel, value);
            break;

        case APC_KNOB_MASTER_LEVEL:
            view.onMasterVolume (value);
            break;
            
        case APC_KNOB_CROSSFADER:
            view.onCrossfader (value);
            break;
            
        case APC_KNOB_CUE_LEVEL:
            view.onCueLevel (value);
            break;
            
        case APC_KNOB_TRACK_KNOB_1:
        case APC_KNOB_TRACK_KNOB_2:
        case APC_KNOB_TRACK_KNOB_3:
        case APC_KNOB_TRACK_KNOB_4:
        case APC_KNOB_TRACK_KNOB_5:
        case APC_KNOB_TRACK_KNOB_6:
        case APC_KNOB_TRACK_KNOB_7:
        case APC_KNOB_TRACK_KNOB_8:
            view.onValueKnob (cc - APC_KNOB_TRACK_KNOB_1, value);
            break;
            
        case APC_KNOB_DEVICE_KNOB_1:
        case APC_KNOB_DEVICE_KNOB_2:
        case APC_KNOB_DEVICE_KNOB_3:
        case APC_KNOB_DEVICE_KNOB_4:
        case APC_KNOB_DEVICE_KNOB_5:
        case APC_KNOB_DEVICE_KNOB_6:
        case APC_KNOB_DEVICE_KNOB_7:
        case APC_KNOB_DEVICE_KNOB_8:
            view.onDeviceValueKnob (cc - APC_KNOB_DEVICE_KNOB_1, value);
            break;

        // Note: Sustain already directly send to the DAW
        case APC_FOOTSWITCH_1:
            view.onFootswitch1 (value);
            break;

        case APC_FOOTSWITCH_2:
            view.onFootswitch2 (value);
            break;
            
        case APC_KNOB_TEMPO:
            view.onTempo (value == 1);
            break;
            
        default:
            println ("Unused CC: " + cc);
            break;
    }
};
