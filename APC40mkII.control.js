// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

loadAPI (1);
load ("Config.js");
load ("framework/ClassLoader.js");
load ("apc/ClassLoader.js");
load ("view/ClassLoader.js");
load ("mode/ClassLoader.js");
load ("Controller.js");

// This is the only global variable, do not use it.
var controller = null;

host.defineController ("Akai", "APC40mkII", "1.0", "14787D10-35DE-11E4-8C21-0800200C9A66");
host.defineMidiPorts (1, 1);
host.defineSysexIdentityReply ("F0 7E ?? 06 02 47 29 00 19 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? F7");

createDeviceDiscoveryPairs ("APC40 mkII");

function init ()
{
    controller = new Controller (APC_PRODUCT.APC_40_MKII);
    println ("Initialized.");
}

function exit ()
{
    if (controller != null)
        controller.shutdown ();
}

function flush ()
{
    if (controller != null)
        controller.flush ();
}
