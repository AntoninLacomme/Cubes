import Connection from "/js/Connection.js";
import Chat from "/js/Chat.js";
import Game from "/js/Game.js";

var CHAT = new Chat ();
var GAME = new Game ();

const CONNECTION = new Connection (CHAT, GAME);

window.onload = init;

function init () {
    // $("#gameCanvas").attr({
    //     width: $("#div-canvas").width (),
    //     height: $("#div-canvas").height ()
    // });
    let canvas = document.querySelector ("#gameCanvas");
    canvas.width = document.querySelector ("#div-canvas").clientWidth;
    canvas.height = document.querySelector ("#div-canvas").clientHeight;

    GAME.setConnection (CONNECTION);
    //GAME.setContext (canvas.getContext('2d'), canvas);
    GAME.setEngine (canvas);

    $("div#get-name").show ();
    $("div#chat").hide ();

    // initialisation du nom
    $('input#prompt-name').keyup((ev) => {
        if(ev.keyCode == 13) {
            validationName ($("input#prompt-name").val());
        }
    });

    $("button#validation-name").click (() => {
        validationName ($("input#prompt-name").val());
    });

    // validation d'un message dans le chat
    $('input#prompt-command').keyup((ev) => {
        if(ev.keyCode == 13) {
            CHAT.validationChat (CONNECTION, $("input#prompt-command").val());
            $("input#prompt-command").val('');
        }
    });

}

function validationName (name) {
    CONNECTION.shareName (name);

    $("div#get-name").hide ();
    $("div#chat").show ();

    GAME.start ();
}
