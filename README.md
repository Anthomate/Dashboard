# Dashboard

### Introduction

Ceci est une application React Native créée avec Expo. L'application permet aux utilisateurs de gérer des tickets et de visualiser des compteurs pour différents états de tickets.

### Comment utiliser l'application ?

Il vous faut tout d'abord possèder l'application Simplydesk pour utiliser cette application. Ensuite il vous suffit simplement de vous rendre dans les paramètres en cliquant sur le bouton **"Paramètres"** puis remplir votre nom d'utilisateur, mot de passe, sous-domaine ainsi que le protocole et l'extension de votre environnement. Une fois toutes ces informations remplies, vous devrez cliquer sur le bouton **"Valider"**. Vous serez ensuite redirigé vers la page principale.

Vous retrouverez sur cette page 4 compteurs représentants les 4 status principaux qu'un ticket peut avoir. Vous retrouverez aussi la liste des tickets dont le status est "Nouveau". En cliquant sur un ticket, vous pourrez accèder à plus d'informations sur le ticket. Pour ne plus voir ces informations il vous suffit de re cliquer sur le ticket.

### Composants

1. DashboardView
   Ce composant représente la vue du tableau de bord qui affiche plusieurs compteurs pour différents états de tickets. Les compteurs sont affichés dans une grille et sont cliquables pour montrer plus de détails.

2. SettingsView
   Ce composant représente la vue des paramètres où les utilisateurs peuvent configurer leurs identifiants de connexion et autres paramètres tels que le sous-domaine et le protocole. L'utilisateur peut valider les paramètres et naviguer vers le tableau de bord.

3. CounterItem
   Ce composant représente un élément de compteur individuel qui est utilisé dans la vue du tableau de bord. Chaque élément de compteur affiche un état de ticket et un nombre.

4. TicketDetails
   Ce composant représente les détails d'un ticket sélectionné. Il affiche le numéro de ticket, le sujet et la description. Il comprend également un bouton pour partager les détails du ticket par e-mail.

### Dépendances
- expo
- react
- react-native
- react-navigation
- @react-navigation/native
- @react-navigation/stack
- react-native-picker/picker
- expo-file-system
- he
- expo-mail-composer

### Maquettes

![img.png](img.png)

### Design final

![img_3.png](img_3.png)

![img_2.png](img_2.png)

![img_4.png](img_4.png)