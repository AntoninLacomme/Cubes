
export default class Chat {
    listUsers = [];

    commands = {
        "/help": {
            "description": "Commande help",
            "command": () => {
                Object.keys(this.commands).forEach ((key) => {
                    this.addMessage (key, this.commands[key].description);
                });
            }
        },
        "/participants": {
            "description": "liste des participants présents dans le chat",
            "command": () => {
                this.listUsers.forEach ((user) => {
                    this.addMessage ("", user);
                });
            }
        },
        "/setArtificialLag": {
            "description": "permet de générer du lag artificiel",
            "command": () => {

            }
        }
    };

    setListUsers (listUsers) {
        this.listUsers = listUsers;
    }

    addMessage (emetteur, message) {
        $("#container-chat")
            .append(
                $("<div></div>")
                .addClass ("line-chat")
                .append($("<div></div>")
                    .addClass ("user-chat")
                    .text(emetteur))
                .append($("<div></div>")
                    .addClass ("text-chat")
                    .text(message)
                )
        );
        $("#container-chat").animate({scrollTop: $("#container-chat").height()}, 30);
    }

    validationChat (CONNECTION, message) {
        let commande = false;
        let effect = false;
        if (message[0] == "/") {
            commande = true;
        }
        Object.keys(this.commands).forEach ((key) => {
            if (message == key) {
                this.commands[key].command ();
                effect = true;
            }
        });
        if (commande && !effect) {
            this.commands["/help"].command ();
        }
        if (!commande) {
            CONNECTION.shareMessage (message);
        }
    }
}