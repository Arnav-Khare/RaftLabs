const fs = require('fs')
const express = require("express")
const { parse } =   require('csv-parse');



 (async ()=>{
    const app = express();
    const port = process.env.PORT || 6001
    
    let Authors = []
    let Magazine = []
    let Books = []
    function parseCSV(DataSet,callback){
        return new Promise((resolve,reject)=>{
              var parser = parse({columns: true,delimiter:';',bom: true}, function (err, records) {
               if(DataSet === 'Authors'){
                 Authors = records
               }else if(DataSet === 'Magazine'){
                 Magazine = records
               }else{
                 Books = records
               }
               resolve();
             });
             fs.createReadStream(__dirname+`/Data/${DataSet}.csv`).pipe(parser);
        })
   
      
   }
   
   await parseCSV("Authors")
   await parseCSV("Magazine")
   await parseCSV("Books")
   
   
   const library = [...Books,...Magazine]
   
   //Sorting my libabry
   
   library.sort((a, b) => {
       let fa = a.title.toLowerCase(),
           fb = b.title.toLowerCase();
   
       if (fa < fb) {
           return -1;
       }
       if (fa > fb) {
           return 1;
       }
       return 0;
   });
   // Creating HashMap with Email of Author and name associated with it
   
   var res = Authors.reduce(function(map,obj){              
       map[obj.email] = {firstname:obj.firstname,lastname:obj.lastname}
       return map;
   },{});
   
   
   const isbnLibraryMap = {}          //Creating HashMap with isbn number and correspong details with it
   
   for(const key in library){
     
       if("publishedAt" in library[key]){              //Data is of Magazine
           
           if(library[key].authors.includes(',')){       //Magazine have Multiple Authors
               const temp1 = []
               library[key].authors.split(',').forEach(e=>{
                   const name = `Mr ${res[e].firstname} ${res[e].lastname}`
                   temp1.push(name)
               })
               isbnLibraryMap[library[key].isbn] = {authors : temp1,category:'M',document : library[key]}
       
           }else{                              //Magazine has Single Author
               const temp2 = []
               const name = `Mr ${res[library[key].authors].firstname} ${res[library[key].authors].lastname}`
               temp2.push(name)
               isbnLibraryMap[library[key].isbn] = {authors : temp2,category:'M',document : library[key]}
       
           }
       }else{
           if(library[key].authors.includes(',')){       //Book have Multiple Authors
               const temp1 = []
               library[key].authors.split(',').forEach(e=>{
                   const name = `Mr ${res[e].firstname} ${res[e].lastname}`
                   temp1.push(name)
               })
               isbnLibraryMap[library[key].isbn] = {authors : temp1,category:'B',document : library[key]}
       
           }else{                              //Book have Single Author
               const temp2 = []
               const name = `Mr ${res[library[key].authors].firstname} ${library[key].authors.lastname}`
               temp2.push(name)
               isbnLibraryMap[library[key].isbn] = {authors : temp2,category:'B',document : library[key]}
       
           }
       }
       
   }
   
   
   
   app.use(express.json());
   app.use(express.urlencoded({extendend:false}));
   
   app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "https://arnav-khare.github.io"); 
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       next();
     });
   
   
   app.get('/',(req,res)=>{
       res.send("Hello form the server");
   })
   
   app.get('/getAllBooks',async(req,res)=>{
       res.send(isbnLibraryMap)
   })
   app.listen(port,()=>{
     console.log(`Server is running at ${port}`)
   })
   

 })();
  