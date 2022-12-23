# brunch_clone

npx sequelize model:generate --name KakaoUser --attributes socialId:string,writer:string,profileImage:string,selfIntro:string,accessToken:string

npx sequelize model:generate --name Posts --attributes userId:integer,coverImage:string,title:string,content:string,image:string

npx sequelize model:generate --name Comments --attributes postId:integer,userId:integer,content:string

npx sequelize model:generate --name Likes --attributes postId:integer,userId:integer

npx sequelize model:generate --name Following --attributes userId: integer

npx sequelize model:generate --name Follower --attributes userId: integer
