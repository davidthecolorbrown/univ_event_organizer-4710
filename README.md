# Problem
* Most universities in the country hosts events around campus and off campus. These events are organized   by   college   students   in   most   of   the   cases.    Students   are   clustered   (RSO’s   or Registered Student Organizations)  by  different organizations,    clubs, fraternities around campus. These events are of different types: social, fundraising, tech talks, etc.  Now,  each university has a  website  where  they  post  their  events  for  the  upcoming  weeks.     One needs  to  check the website to add each event to his/her calendar.   These events are just official events and not  allevents  around  the  university  are  included.  Another  limitation  is  that  one  has  no  way  to  trackweekly events. 

# Project Description
* You  are  asked  to  implement  a  web  application  that  solves  the  problems.      Any  student  may register with  this  application  to  obtain  a  user  ID  and  a  password.  There  are  three  user  levels: super  adminwho  creates  a  profile  for  a  university  (name,  location,  description,   number  of students, pictures,  etc.), adminwho  owns  an  RSO  and  may  host  events, and student who usesthe application to look up information about the various events.Admin  can  create  events  with  name,  event  category,  description,  time,  date,  location,  contact phone,  and  contact  email    address.   A  location  should  be  set  from  a  map  (Bing,  Google,   open street  map)  with  name,   latitude,  longitude,  etc.  To populate  the  database,   one  can  use feeds (e.g.,  RSS,  XML)  from  events.ucf.edu.    Each  admin  is  affiliated  with  one  university, and  one  or more RSOs. A  student user can request to  create a  new  RSO  or to  join  an  existent one.   A newRSO   can   be created  with   at   least   5   other   students  with   the   same   email domain,   e.g.,@knights.ucf.edu; and one of them should be assigned as an administrator. Student can view events in their university by location, or by selecting the University they want to  see  the  events  from.  They  can  retrieve events  according to  their  level  of  access or  scope.  A student should be able to see all the events around its location or from RSOs they are following. There are different types of events (social, fundraising, tech talks, etc.).  Each event can be public, private, or an RSO event. Public events can be seen by everyone; private events can be seen by the students at the host university; and an RSO events can only be seen by members of the RSO. In addition, events can be created without an RSO.  Such events must be approved by the super admin.   After an  event has been published,  users can add,  remove,  and edit comments on the event, as  well  as  rating  the  event with  up  to  5  stars.  The  application  should  offer  some  social network integration,  e.g., posting from the application to Facebook or Google.

# setup mern app (NodeJS + Express + React + MySQL OR MongoDB)
## clone github repo 
* open linux/macOS terminal and navigate to directory you want to store project
    ```bash
    cd ./full/path/to/project/dir/
    ```
* get the github repo url for cloning 
    ```bash
    # repo_url: https://github.com/davidthecolorbrown/univ_event_organizer-4710.git
    git clone [repo_url] 
    ```
## install node + dependencies for backend
* first install node.js from node website
* then use node package manager (npm) to initialize project and download common dependencies (in terminal for main project directory):
    * mandatory dependencies: express, mongoose (mongodb), cors
    * common dependecies: nodemon, body-parser, bootstrap, node-fetch, moment, mocha, node-cron
    ```bash
    # install dependencies (npm uses package.json to locate dependencies)
    npm install
    # update the dependencies
    npm update 
    ```
## install react dependencies for frontend and set PORT as environment variable
* react dependencies in frontend folder
    ```bash
    # navigate to project's /frontend/ directory
    cd ./frontend/
    # download basic react app dependencies
    npm install react-router-dom axios bootstrap
    ```
* set PORT number as env variable 
    ```bash
    # create .env variable to hold frontend port info (using 8000)
    echo "PORT=8000" > ".env"
    ```
## create dev branch (if not done so already) for development
* create a new 'dev' branch and push the new branch (locally) to remote github repo
    ```bash
    # make branch
    git branch dev
    # push to github repo url
    git push origin dev
    # switch to branch
    git checkout dev
    ```