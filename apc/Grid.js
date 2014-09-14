// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function Grid (output, isMkII)
{
    this.output = output;
    this.isMkII = isMkII;

    this.arraySize = 5 * 8;
    this.currentButtonColors = initArray ([ APC_COLOR_BLACK, false, false], this.arraySize);
    this.buttonColors = initArray ([ APC_COLOR_BLACK, false, false], this.arraySize);
}

Grid.prototype.light = function (index, color, blinkColor, fast)
{
    index = index - 36;
    index = (4 - Math.floor (index / 8)) * 8 + (index % 8);
    this.setLight (index, color, blinkColor, fast);
};

Grid.prototype.lightEx = function (x, y, color, blinkColor, fast)
{
    this.setLight (y * 8 + x, color, blinkColor, fast);
};

Grid.prototype.setLight = function (index, color, blinkColor, fast)
{
    this.buttonColors[index] = [ color, blinkColor, fast ];
}

Grid.prototype.flush = function ()
{
    for (var i = 0; i < this.arraySize; i++)
    {
        var baseChanged = false;
        if (this.equalsPads (this.currentButtonColors[i], this.buttonColors[i]))
            continue;
        this.currentButtonColors[i] = this.buttonColors[i];
        if (this.isMkII)
        {
            var pos = (4 - Math.floor (i / 8)) * 8 + (i % 8);
            this.output.sendNoteEx (0, pos, this.buttonColors[i][0]);
            if (this.buttonColors[i][1] != null)
                this.output.sendNoteEx (this.buttonColors[i][2] ? 14 : 10, pos, this.buttonColors[i][1]);
        }
        else
            this.output.sendNoteEx (i % 8, APC_BUTTON_CLIP_LAUNCH_1 + Math.floor (i / 8), this.buttonColors[i][1] == null ? this.buttonColors[i][0] : this.buttonColors[i][1]);
        baseChanged = true;
    }
};

Grid.prototype.turnOff = function ()
{
    for (var i = 0; i < this.arraySize; i++)
    {
        this.buttonColors[i][0] = APC_COLOR_BLACK;
        this.buttonColors[i][1] = null;
        this.buttonColors[i][2] = false;
    }
    this.flush ();
};

Grid.prototype.equalsPads = function (pad1, pad2)
{
    for (var i = 0; i < 3; i++)
    {
        if (pad1[i] != pad2[i])
            return false;
    }
    return true;
};