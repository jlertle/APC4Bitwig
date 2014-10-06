// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function Controller (product)
{
    Config.init ();

    var output = new MidiOutput ();
    var input = new APCMidiInput ();
    input.init ();
    
    this.scales = new Scales (36, 100, 8, 8);
    setModelSpecificColors (product);
    this.model = new Model (1, this.scales, 8, 5, 8);
    this.model.getTrackBank ().addTrackSelectionListener (doObject (this, function (index, isSelected)
    {
        if (this.surface.isActiveView (VIEW_PLAY))
            this.surface.getActiveView ().updateNoteMapping ();
    }));
    
    this.surface = new APC (output, input, product);
    for (var i = 0; i < 8; i++)
        this.surface.setLED (APC_KNOB_DEVICE_KNOB_LED_1 + i, 1);

    this.surface.setDefaultMode (MODE_PAN);

    this.surface.addMode (MODE_PAN, new PanMode (this.model));
    for (var i = 0; i < 8; i++)
        this.surface.addMode (MODE_SEND1 + i, new SendMode (this.model, i));
    this.surface.addMode (MODE_MACRO, new MacroMode (this.model));

    this.surface.addModeListener (doObject (this, function (oldMode, newMode)
    {
        this.updateMode (-1);
        this.updateMode (newMode);
    }));
    
    Config.addPropertyListener (Config.SCALES_SCALE, doObject (this, function ()
    {
        this.scales.setScaleByName (Config.scale);
        this.surface.getActiveView ().updateNoteMapping ();
    }));
    Config.addPropertyListener (Config.SCALES_BASE, doObject (this, function ()
    {
        this.scales.setScaleOffsetByName (Config.scaleBase);
        this.surface.getActiveView ().updateNoteMapping ();
    }));

    this.surface.addView (VIEW_PLAY, new PlayView (this.model));
    this.surface.addView (VIEW_SESSION, new SessionView (this.model));
    this.surface.addView (VIEW_SEQUENCER, new SequencerView (this.model));
    this.surface.addView (VIEW_DRUM, new DrumView (this.model));
    
    this.surface.setActiveView (VIEW_SESSION);
    this.surface.setPendingMode (MODE_PAN);
}
Controller.prototype = new AbstractController ();

Controller.prototype.flush = function ()
{
    AbstractController.prototype.flush.call (this);

    var t = this.model.getTransport ();
    this.surface.setButton (APC_BUTTON_PLAY, t.isPlaying ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
    this.surface.setButton (APC_BUTTON_RECORD, t.isRecording ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);

    // Activator, Solo, Record Arm
    var tb = this.model.getCurrentTrackBank ();
    var selTrack = tb.getSelectedTrack ();
    var selIndex = selTrack == null ? -1 : selTrack.index;
    for (var i = 0; i < 8; i++)
    {
        var track = tb.getTrack (i);
        this.surface.setButtonEx (APC_BUTTON_TRACK_SELECTION, i, i == selIndex ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButtonEx (APC_BUTTON_SOLO, i, track.exists && track.solo ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButtonEx (APC_BUTTON_RECORD_ARM, i, track.exists && track.recarm ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        if (this.surface.isMkII ())
        {
            this.surface.setButtonEx (APC_BUTTON_ACTIVATOR, i, track.exists && !track.mute ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
            this.surface.setButtonEx (APC_BUTTON_A_B, i, track.exists && track.crossfadeMode != 'AB' ? (track.crossfadeMode == 'A' ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_BLINK) : APC_MKII_COLOR_BLACK);
        }
        else
        {
            if (this.surface.isShiftPressed ())
                this.surface.setButtonEx (APC_BUTTON_ACTIVATOR, i, track.exists && track.crossfadeMode != 'AB' ? (track.crossfadeMode == 'A' ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_BLINK) : APC_MKII_COLOR_BLACK);
            else
                this.surface.setButtonEx (APC_BUTTON_ACTIVATOR, i, track.exists && !track.mute ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        }
    }
    this.surface.setButton (APC_BUTTON_MASTER, this.model.getMasterTrack ().isSelected () ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
    
    var device = this.model.getCursorDevice ();

    if (this.surface.isMkII ())
    {
        this.surface.setButton (APC_BUTTON_SESSION, t.isLauncherOverdub ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_C, t.isClickOn ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        
        this.surface.setButton (APC_BUTTON_DETAIL_VIEW, device.getSelectedDevice ().enabled ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_REC_QUANT, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_MIDI_OVERDUB, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_METRONOME, APC_BUTTON_STATE_OFF);
        
        this.surface.setButton (APC_BUTTON_CLIP_TRACK, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_ON_OFF, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_LEFT, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_RIGHT, APC_BUTTON_STATE_OFF);
        
        this.surface.setButton (APC_BUTTON_BANK, this.model.isEffectTrackBankActive () ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
    }
    else
    {
        this.surface.setButton (APC_BUTTON_DETAIL_VIEW, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_REC_QUANT, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_MIDI_OVERDUB, t.isLauncherOverdub ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_METRONOME, t.isClickOn ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        
        this.surface.setButton (APC_BUTTON_CLIP_TRACK, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_ON_OFF, device.getSelectedDevice ().enabled ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_LEFT, APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_DEVICE_RIGHT, APC_BUTTON_STATE_OFF);
    }
    
    this.updateDeviceKnobs ();
};

Controller.prototype.updateMode = function (mode)
{
    this.updateIndication (mode);
    if (this.surface.isMkII ())
    {
        this.surface.setButton (APC_BUTTON_PAN, mode == MODE_PAN ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_A, mode >= MODE_SEND1 && mode <= MODE_SEND8 ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_B, mode == MODE_MACRO ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
    }
    else
    {
        this.surface.setButton (APC_BUTTON_PAN, mode == MODE_PAN || mode == MODE_MACRO ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_A, mode == MODE_SEND1 || mode == MODE_SEND4 ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_B, mode == MODE_SEND2 || mode == MODE_SEND5 ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
        this.surface.setButton (APC_BUTTON_SEND_C, mode == MODE_SEND3 || mode == MODE_SEND6 ? APC_BUTTON_STATE_ON : APC_BUTTON_STATE_OFF);
    }        
};

Controller.prototype.updateIndication = function (mode)
{
    var isPan = mode == MODE_PAN;
    
    var tb = this.model.getCurrentTrackBank ();
    for (var i = 0; i < 8; i++)
    {
        tb.setPanIndication (i, isPan);
        for (var j = 0; j < 8; j++)
        {
            tb.setSendIndication (i, j, mode == MODE_SEND1 && j == 0 ||
                                        mode == MODE_SEND2 && j == 1 ||
                                        mode == MODE_SEND3 && j == 2 ||
                                        mode == MODE_SEND4 && j == 3 ||
                                        mode == MODE_SEND5 && j == 4 ||
                                        mode == MODE_SEND6 && j == 5 ||
                                        mode == MODE_SEND7 && j == 6 ||
                                        mode == MODE_SEND8 && j == 7);
        }

        var cd = this.model.getCursorDevice ();
        cd.getParameter (i).setIndication (true);
        cd.getMacro (i).getAmount ().setIndication (mode == MODE_MACRO);
    }
};

Controller.prototype.updateDeviceKnobs = function ()
{
    if (this.surface.getActiveView ().isKnobMoving)
        return;

    var cd = this.model.getCursorDevice ();
    for (var i = 0; i < 8; i++)
    {
        var value = cd.getFXParam (i).value;
        this.surface.setLED (APC_KNOB_DEVICE_KNOB_1 + i, value ? value : 0);
    }
};