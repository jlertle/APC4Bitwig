// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function MacroMode (model)
{
    BaseMode.call (this, model, 2, 0);
    this.id = MODE_MACRO;
    this.params = [ { index: 0, name: '' }, { index: 1, name: '' }, { index: 2, name: '' }, { index: 3, name: '' }, { index: 4, name: '' }, { index: 5, name: '' }, { index: 6, name: '' }, { index: 7, name: '' } ];
}
MacroMode.prototype = new BaseMode ();

MacroMode.prototype.attachTo = function (surface)
{
    BaseMode.prototype.attachTo.call (this, surface);
    
    for (var i = 0; i < 8; i++)
    {
        var p = this.model.getCursorDevice ().getMacro (i).getAmount ();
        p.addValueObserver (Config.maxParameterValue, doObjectIndex (this, i, function (index, value)
        {
            this.params[index].value = value;
        }));
    }
};

MacroMode.prototype.setValue = function (index, value)
{
    this.model.getCursorDevice ().getMacro (index).getAmount ().set (value, Config.maxParameterValue);
};

MacroMode.prototype.getValue = function (index)
{
    return this.params[index].value;
};
