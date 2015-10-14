```                                     
                                     _              
                                    | |                     ,--.!,  
                          _ __ _   _| | ___   _ ___      __/   -*-      
                         | '__| | | | |/ / | | / __|   ,d08b.  '|`     
                         | |  | |_| |   <| |_| \__ \   0088MM     
                         |_|   \__,_|_|\_\\__,_|___/   `9MMP'    
                                        by iflix.com
```
   

Rukus is a project skeleton, webpack loader and helpers for building [riot.js](http://roitjs.com)
web applications in the iflix style. 

Riot Tag files are replaced with components defined in directories with an index.html template, an index.js (which exports a component 
handler), and a test.js file which validates the component.  

Rukus is an opinionated pattern for building apps with riot.js




## getting started

```
$ npm install -g rukus
$ rukus newproject <yourproject>
$ cd <yourproject>
$ npm start
```

And point your browser to [http://localhost:8080](http://localhost:8080)


## Components

The rukus webpack loader searches directories (./components by default) for 
rukus components and manually registers them as [riot tags](http://riotjs.com/api/#manual-construction). 
A rukus component is a directory with an index.html, index.js and test.js file:

```
yourcomponent/
    index.html
    index.js
    test.js
```

To create a new component, cd into the components directory and run:

```$ rukus newcomponent <yourcomponent>```
