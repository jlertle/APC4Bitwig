// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

// APC Colors for 5x8 clip matrix
var APC_COLOR_BLACK        = 0;   // off, 
var APC_COLOR_GREEN        = 1;   // green, 7-127 also green
var APC_COLOR_GREEN_BLINK  = 2;   // green blink, 
var APC_COLOR_RED          = 3;   // red, 
var APC_COLOR_RED_BLINK    = 4;   // red blink, 
var APC_COLOR_YELLOW       = 5;   // yellow, 
var APC_COLOR_YELLOW_BLINK = 6;   // yellow blink, 

// APC40mkII Colors for 5x8 clip matrix
var APC_MKII_COLOR_BLACK            = 0;
var APC_MKII_COLOR_GREY_LO          = 1;
var APC_MKII_COLOR_GREY_MD          = 2;
var APC_MKII_COLOR_WHITE            = 3;
var APC_MKII_COLOR_ROSE             = 4;
var APC_MKII_COLOR_RED_HI           = 5;
var APC_MKII_COLOR_RED              = 6;
var APC_MKII_COLOR_RED_LO           = 7;
var APC_MKII_COLOR_RED_AMBER        = 8;
var APC_MKII_COLOR_AMBER_HI         = 9;
var APC_MKII_COLOR_AMBER            = 10;
var APC_MKII_COLOR_AMBER_LO         = 11;
var APC_MKII_COLOR_AMBER_YELLOW     = 12;
var APC_MKII_COLOR_YELLOW_HI        = 13;
var APC_MKII_COLOR_YELLOW           = 14;
var APC_MKII_COLOR_YELLOW_LO        = 15;
var APC_MKII_COLOR_YELLOW_LIME      = 16;
var APC_MKII_COLOR_LIME_HI          = 17;
var APC_MKII_COLOR_LIME             = 18;
var APC_MKII_COLOR_LIME_LO          = 19;
var APC_MKII_COLOR_LIME_GREEN       = 20;
var APC_MKII_COLOR_GREEN_HI         = 21;
var APC_MKII_COLOR_GREEN            = 22;
var APC_MKII_COLOR_GREEN_LO         = 23;
var APC_MKII_COLOR_GREEN_SPRING     = 24;
var APC_MKII_COLOR_SPRING_HI        = 25;
var APC_MKII_COLOR_SPRING           = 26;
var APC_MKII_COLOR_SPRING_LO        = 27;
var APC_MKII_COLOR_SPRING_TURQUOISE = 28;
var APC_MKII_COLOR_TURQUOISE_LO     = 29;
var APC_MKII_COLOR_TURQUOISE        = 30;
var APC_MKII_COLOR_TURQUOISE_HI     = 31;
var APC_MKII_COLOR_TURQUOISE_CYAN   = 32;
var APC_MKII_COLOR_CYAN_HI          = 33;
var APC_MKII_COLOR_CYAN             = 34;
var APC_MKII_COLOR_CYAN_LO          = 35;
var APC_MKII_COLOR_CYAN_SKY         = 36;
var APC_MKII_COLOR_SKY_HI           = 37;
var APC_MKII_COLOR_SKY              = 38;
var APC_MKII_COLOR_SKY_LO           = 39;
var APC_MKII_COLOR_SKY_OCEAN        = 40;
var APC_MKII_COLOR_OCEAN_HI         = 41;
var APC_MKII_COLOR_OCEAN            = 42;
var APC_MKII_COLOR_OCEAN_LO         = 43;
var APC_MKII_COLOR_OCEAN_BLUE       = 44;
var APC_MKII_COLOR_BLUE_HI          = 45;
var APC_MKII_COLOR_BLUE             = 46;
var APC_MKII_COLOR_BLUE_LO          = 47;
var APC_MKII_COLOR_BLUE_ORCHID      = 48;
var APC_MKII_COLOR_ORCHID_HI        = 49;
var APC_MKII_COLOR_ORCHID           = 50;
var APC_MKII_COLOR_ORCHID_LO        = 51;
var APC_MKII_COLOR_ORCHID_MAGENTA   = 52;
var APC_MKII_COLOR_MAGENTA_HI       = 53;
var APC_MKII_COLOR_MAGENTA          = 54;
var APC_MKII_COLOR_MAGENTA_LO       = 55;
var APC_MKII_COLOR_MAGENTA_PINK     = 56;
var APC_MKII_COLOR_PINK_HI          = 57;
var APC_MKII_COLOR_PINK             = 58;
var APC_MKII_COLOR_PINK_LO          = 59;

function setModelSpecificColors (product)
{
    switch (product)
    {
        case APC_PRODUCT.APC_40_MKII:
            Scales.SCALE_COLOR_OFF          = APC_MKII_COLOR_BLACK;
            Scales.SCALE_COLOR_OCTAVE       = APC_MKII_COLOR_OCEAN_HI;
            Scales.SCALE_COLOR_NOTE         = APC_MKII_COLOR_WHITE;
            Scales.SCALE_COLOR_OUT_OF_SCALE = APC_MKII_COLOR_BLACK;
            
            AbstractView.VIEW_SELECTED   = APC_MKII_COLOR_GREEN;
            AbstractView.VIEW_UNSELECTED = APC_MKII_COLOR_AMBER;
            AbstractView.VIEW_OFF        = APC_MKII_COLOR_BLACK;

            AbstractSessionView.CLIP_COLOR_IS_RECORDING        = { color: APC_MKII_COLOR_RED_HI,   blink: APC_MKII_COLOR_RED_HI,   fast: false };
            AbstractSessionView.CLIP_COLOR_IS_RECORDING_QUEUED = { color: APC_MKII_COLOR_RED_HI,   blink: APC_MKII_COLOR_RED_HI,   fast: true  };
            AbstractSessionView.CLIP_COLOR_IS_PLAYING          = { color: APC_MKII_COLOR_GREEN_HI, blink: APC_MKII_COLOR_GREEN_HI, fast: false };
            AbstractSessionView.CLIP_COLOR_IS_PLAYING_QUEUED   = { color: APC_MKII_COLOR_GREEN_HI, blink: APC_MKII_COLOR_GREEN_HI, fast: true  };
            AbstractSessionView.CLIP_COLOR_HAS_CONTENT         = { color: APC_MKII_COLOR_AMBER,    blink: null,                    fast: false };
            AbstractSessionView.CLIP_COLOR_NO_CONTENT          = { color: APC_MKII_COLOR_BLACK,    blink: null,                    fast: false };
            AbstractSessionView.CLIP_COLOR_RECORDING_ARMED     = { color: APC_MKII_COLOR_RED_LO,   blink: null,                    fast: false };
            AbstractSessionView.USE_CLIP_COLOR                 = true;
 
            AbstractSequencerView.COLOR_SELECTED_RESOLUTION_OFF = APC_MKII_COLOR_BLACK;
            AbstractSequencerView.COLOR_SELECTED_RESOLUTION_ON  = APC_MKII_COLOR_GREEN_HI;
            AbstractSequencerView.COLOR_STEP_HILITE_NO_CONTENT  = APC_MKII_COLOR_GREEN_HI;
            AbstractSequencerView.COLOR_STEP_HILITE_CONTENT     = APC_MKII_COLOR_GREEN_LO;
            AbstractSequencerView.COLOR_NO_CONTENT              = APC_MKII_COLOR_BLACK;
            AbstractSequencerView.COLOR_CONTENT                 = APC_MKII_COLOR_BLUE_HI;
 
            DrumView.COLOR_RECORD         = APC_MKII_COLOR_RED_HI;
            DrumView.COLOR_PLAY           = APC_MKII_COLOR_GREEN_HI;
            DrumView.COLOR_SELECTED       = APC_MKII_COLOR_BLUE_HI;
            DrumView.COLOR_MUTED          = APC_MKII_COLOR_AMBER_LO;
            DrumView.COLOR_SOLO           = APC_MKII_COLOR_BLUE_LO;
            DrumView.COLOR_HAS_CONTENT    = APC_MKII_COLOR_YELLOW_HI;
            DrumView.COLOR_NO_CONTENT     = APC_MKII_COLOR_YELLOW_LO;
            DrumView.COLOR_MEASURE        = APC_MKII_COLOR_WHITE;
            DrumView.COLOR_ACTIVE_MEASURE = APC_MKII_COLOR_GREEN_HI;
            break;

        default:
            Scales.SCALE_COLOR_OFF          = APC_COLOR_BLACK;
            Scales.SCALE_COLOR_OCTAVE       = APC_COLOR_YELLOW;
            Scales.SCALE_COLOR_NOTE         = APC_COLOR_BLACK;
            Scales.SCALE_COLOR_OUT_OF_SCALE = APC_COLOR_BLACK;

            AbstractView.VIEW_SELECTED   = APC_COLOR_GREEN;
            AbstractView.VIEW_UNSELECTED = APC_COLOR_BLACK;
            AbstractView.VIEW_OFF        = APC_COLOR_BLACK;
            
            AbstractSessionView.CLIP_COLOR_IS_RECORDING        = { color: APC_COLOR_RED,    blink: null,                  fast: false };
            AbstractSessionView.CLIP_COLOR_IS_RECORDING_QUEUED = { color: APC_COLOR_RED,    blink: APC_COLOR_RED_BLINK,   fast: false };
            AbstractSessionView.CLIP_COLOR_IS_PLAYING          = { color: APC_COLOR_GREEN,  blink: null,                  fast: false };
            AbstractSessionView.CLIP_COLOR_IS_PLAYING_QUEUED   = { color: APC_COLOR_GREEN,  blink: APC_COLOR_GREEN_BLINK, fast: false };
            AbstractSessionView.CLIP_COLOR_HAS_CONTENT         = { color: APC_COLOR_YELLOW, blink: null,                  fast: false };
            AbstractSessionView.CLIP_COLOR_NO_CONTENT          = { color: APC_COLOR_BLACK,  blink: null,                  fast: false };
            AbstractSessionView.CLIP_COLOR_RECORDING_ARMED     = { color: APC_COLOR_BLACK,  blink: null,                  fast: false };
            AbstractSessionView.USE_CLIP_COLOR                 = false;
            
            AbstractSequencerView.COLOR_SELECTED_RESOLUTION_OFF = APC_COLOR_BLACK;
            AbstractSequencerView.COLOR_SELECTED_RESOLUTION_ON  = APC_COLOR_GREEN;
            AbstractSequencerView.COLOR_STEP_HILITE_NO_CONTENT  = APC_COLOR_GREEN;
            AbstractSequencerView.COLOR_STEP_HILITE_CONTENT     = APC_COLOR_GREEN;
            AbstractSequencerView.COLOR_NO_CONTENT              = APC_COLOR_BLACK;
            AbstractSequencerView.COLOR_CONTENT                 = APC_COLOR_RED;
            
            DrumView.COLOR_RECORD         = APC_COLOR_RED;
            DrumView.COLOR_PLAY           = APC_COLOR_GREEN;
            DrumView.COLOR_SELECTED       = APC_COLOR_YELLOW_BLINK;
            DrumView.COLOR_MUTED          = APC_COLOR_BLACK;
            DrumView.COLOR_SOLO           = APC_COLOR_YELLOW;
            DrumView.COLOR_HAS_CONTENT    = APC_COLOR_YELLOW;
            DrumView.COLOR_NO_CONTENT     = APC_COLOR_BLACK;
            DrumView.COLOR_MEASURE        = APC_COLOR_GREEN;
            DrumView.COLOR_ACTIVE_MEASURE = APC_COLOR_YELLOW;
            
            break;
    }
}