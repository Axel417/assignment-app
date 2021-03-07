MINI PROJET ANGULAR : améliorer le TP sur les Assignments

INFORMATIONS IMPORTANTE : 

++Le projet entier est composé de 3 fichiers:
  -assignement-app: l'application angular assignement disponible ici : https://github.com/Axel417/assignment-app/ (1)
  -api: l'api nous permettant de faire l'échange de données avec la base située sur MongoDB Atlas : https://github.com/Axel417/api (2)
  -api_connexion: l'api nous permettant de gérer la connexion de l'administrateur à l'application: https://github.com/Axel417/api_connexion (3)
  
  Toutes ces applications sont hébergées sur heroku donc pas besoin de les télécharger pour pouvoir réaliser les différents tests.
  Elles sont disponibles sur les liens suivants:
  (1): https://gestion-devoir.herokuapp.com/
  (2): https://api-bd.herokuapp.com/api/
  (3): https://api-connexion.herokuapp.com/
  
  
  NB: les identifiants pour la connexion sont les suivants: 
  - email : eude@gmail.com ; pass: koffi 
  - email : soro@gmail.com ; pass: soro


CE QUI A ETE REALISE :

- Formualaire d'authentifiaction donnant l'accès à l'application. Authentificationréalisée à l'aide de Json Web Tokens (JWT) en suivant le tutoriel suivant: https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/;
- Ajout de nouvelles propriétés au modèle des Assignments;
- Amélioration de l'affichage des Assignments en utilisant les matérials card;
- Amélioration du formulaire de création d'assignment en utilisant les stepper;
- Ajout d'un bouton de trie pour l'affichage des assignments permettant d'afficher: tous les assignlents, les assignement rendu et les assignements non rendu;
- Ajout des méssage de notification en utilisant les SnackBar Material personnalisée;
- Enfin Hébergement de l'application sur HEROKU.
