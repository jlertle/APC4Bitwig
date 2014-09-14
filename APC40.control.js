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

host.defineController ("Akai", "APC40", "2.0", "35E958A0-345F-11E4-8C21-0800200C9A66");
host.defineMidiPorts (1, 1);
host.defineSysexIdentityReply ("F0 7E ?? 06 02 47 73 00 19 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? F7");

createDeviceDiscoveryPairs ("Akai APC40");

function init ()
{
    controller = new Controller (APC_PRODUCT.APC_40);
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
