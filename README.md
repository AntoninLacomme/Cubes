# Cubes

Le projet se lance avec la commande :
node startingServer.js

Le serveur écoute sur le port 8001. On peut voir dans la console du serveur tous les pings reçus.
Chaque joueur a un identifiant unique généré aléatoirement. Le projet introduit un chat entre toutes les personnes connectées.
Le projet recrée toute la communication via socketIO en programmation objet.
Côté Serveur :
- la classe ServerConnection gère les communications avec les joueurs
- la classe GameServer centralise la partie
- la classe PlayerServer permet au serveur de visualiser chacun des clients

Côté Client :
- la classe Connection gère la communication avec le serveur. Cette classe communique avec la classe Chat, Game et Joueur
- la classe Chat gère tous les évènements liés au chat
- la classe Game crée la partie
- la classe Joueur crée le joueur
- la classe InputState gère les évènements clavier 
 
 Pour lancer la création d'un personnage il est nécessaire de créer se choisir un nom en l'écrivant dans la barre de chat. On incarne un simple cube. Il n'y a encore aucun objectif.

 Les contrôle de font via ZQSD.
 
 
