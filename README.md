# BeerStory v1.19 (23.11.2021)

## About BeerStory

Beer Story is my personal project build with React, Redux and Firebase. It is not only training project but also the website that I will officially publish in future. 
Before release, some additional functionalities still need to be added. Official BeerStory webapp will store articles and information about history of beer.
All moderators will be able to publish their own articles about history of beer on BeerStory. Users will be able to read, rate and comment those articles. 

## How It works?

#### Firebase firestore & auth:
- User can sign-in, sign-out, sign-up.
- User has to verify its own email in order to write new article on the website.
- User can delete its own account.
- Firestore stores articles data (title, description, references, author etc.), rates (number of stars given by users), comments (given by users).
- User can load articles from database (articles list of different groups).
- User can load all articles that he has written (user page).
- User can upload articles that he has writen (edit page).
- New articles can be added by verified users.
- Old articles can be deleted only by authors
- All users can: rate article (1-5) and add comments.

#### Redux store:
- Mainly Redux tolkit was used for this project to build the store.
- Redux stores:
  - data about logged in user.
  - data about currently displayed articles.
  - data about comments under displayed article.
  - documents with rates for currently displayed article.
  - data about some styles.
- Selectors were used for displaying articles written only by logged in author and for displaying articles from different groups.
- Two middlewares were used in this project. Authentication middleware connects with firebase/authentication. Api middleware is connected with firebase/firestore.
- Redux-persist is also implemented in this project to persist data whenever the browser refresh.
- Redux controls most of the logic of BeerStory website.

#### React:
- Used to build whole page.
- Used hooks: useState, useEffect, useHistory, useParams.

#### Other technologies

- Styled components library is used for styling componenets.
- Stylelint, stylelint-order.
- LocalStorage stores data if user is 18+ or not. If not page will redirect you to google.com.


## How to use this project?

1. First of all, you have to follow this link. https://determined-darwin-892239.netlify.app/ <- this is current unofficial adress of BeerStory website (test version).

2. You can sign-in to BeerStory via test account written on the website footer, or you can create your own account.

3. How to create new account: simply, click 'rejestracja' button, fill all fileds, accept terms and click 'zarejestruj' button. In the next step the website will tell you that you have to verify your email.

4. How to open article? Click one of the four icons: 'Historia Piwa na Świecie', Zapomniane Receptury, 'Historia piwa w Polsce', 'Opuszczoene Browary'. After a while articles will appear on your screen. Click 'Czytaj dalej' button to see whole content of article.

5. After article is loaded you will see its title, photo (if was added), paragraphs, references, comments and rates.

6. If you are logged but not verified, you can rate the article (by clicking on stars) or add new comment by clicking on 'wyślij' button in comments section.

7. If you created your own comment, you are allowed to deleted it by clicking on trash icon (right side of your comment).

8. If you want to go back just click 'Wróć' button.

9. If you are logged in and verified, you are allowed to add new articles. Click the plus icon in beer articles section. Fill empty fields, select article category, and press 'opublikuj' button to publish your article on BeerStory page.

10. On the right side of the navbar you will find 'użytkownik' button. It will redirect you to userpage where you can find details about your account.


## Link
https://determined-darwin-892239.netlify.app/


## Credits
Author: Marcin Brzozowski.
Author fo illustrations: Natalia Brzozowska.

## Contanct
If you have any questions, you can send me an email: b.gataze@gmail.com.


