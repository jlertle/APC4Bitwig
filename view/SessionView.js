// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function SessionView (model)
{
    AbstractSessionView.call (this, model, 5, 8);
}
SessionView.prototype = new AbstractSessionView ();

SessionView.prototype.drawSceneButtons = function () {};

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
