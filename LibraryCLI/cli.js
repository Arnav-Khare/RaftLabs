import fs from 'fs'
import { parse } from 'csv-parse';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

async function cli() {
    const __filename = fileURLToPath(import.meta.url);
    const port = process.env.PORT || 6001
    const __dirname = dirname(__filename);
    let Authors = []
    let Magazine = []
    let Books = []
    
   /**
    * Converting JSON string to formatted CSV
   * @param objArray The stringy format of the data.
   * @returns return string with values separated by delimeters
   */

   function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
 }
  /**
    * Parassing CSV dataset into JS Array's
   * Calculates the valid knight moves in n turns given a starting position.
   * @param DataSet CSV DataSet.
   */
    async function parseCSV(DataSet){
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

    //Sorting my library Array

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

    /**
    * Creating HashMap with Email of Author and name associated with it
    * Calculates the valid knight moves in n turns given a starting position.
    */
   
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

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        })

    function printData(){
        const table = []
        for(const key in isbnLibraryMap){
            let entry = {}
            const authorString = isbnLibraryMap[key].authors.map((e)=>{
                return `${e}`
            })
            entry = {'ISBN' : key,"Category":isbnLibraryMap[key].category,"Title":isbnLibraryMap[key].document.title,authors:authorString}
            table.push(entry)
        }
        console.table(table)
    }


    async function findByISBN(){
        var table = []
        var isbn = await question('Enter ISBN number of Book/Magazaine : ')
        console.log(`The Details of the document requested are as follow : `);
            
        const authorString = isbnLibraryMap[isbn].authors.map((e)=>{
            return `${e}`
        })
        var entry = {'ISBN' : isbn,"Category":isbnLibraryMap[isbn].category,"Title":isbnLibraryMap[isbn].document.title,authors:authorString}
        table.push(entry)
        console.table(table)
    }

    async function findByEmail(){
        var table = []
        var email = await question('Enter email of Author of Book/Magazaine : ')
        console.log(`The Details of the document requested are as follow : `);
            
        for(const key in isbnLibraryMap){
            if(isbnLibraryMap[key].document.authors === email){
                const authorString = isbnLibraryMap[key].authors.map((e)=>{
                    return `${e}`
                })
                var entry = {'ISBN' : key,"Category":isbnLibraryMap[key].category,"Title":isbnLibraryMap[key].document.title,authors:authorString}
                table.push(entry)
            }
        }
      
        console.table(table)

    }

      
   /**
    * Asking Query 
   * @param theQuestion The Query.
   * @returns User inputted Value
   */

    function question(theQuestion) {
        return new Promise(resolve => rl.question(theQuestion, answ => resolve(answ)))
    }

    async function askQuestions(){
        return new Promise (async (resolve,reject)=>{
            var isbn = await question('Enter the ISBN of Book/Magazine : ')
        var authorsEmail = ""
        if(isbnLibraryMap[isbn]!== undefined){
            console.log('Document Present in Library ')
            return;
        }else{
            var category = await question('Press B for Book and M for Magazine: ')
            if(category === 'B'){
                var title = await question('Enter Title of the : ')
                authorsEmail = await question ('Enter Email Address of the Author: ')
                var desc = await question('Enter Description of the Book: ');
                Books.push({title:title,isbn:isbn,authors:authorsEmail,description:desc})
                var jsonObject = JSON.stringify(Authors);
                const arr = ConvertToCSV(jsonObject)
                fs.writeFile('./Data/Books.csv', jsonObject, err => {
                    if (err) {
                    console.error(err)
                    return
                    }
                })
            }else{
                var title = await question('Enter Title of the Magazine ')
                authorsEmail = await question ('Enter Email Address of the Author ')
                var  pennedAt = await question('Enter published Date of the Magazine ');
                Magazine.push({title:magazineTitle,isbn:isbn,authors:authorsEmail,publisedAt:pennedAt})
                var jsonObject = JSON.stringify(Magazine);
                const arr = ConvertToCSV(jsonObject)
                fs.writeFile('./Data/Magazine.csv', jsonObject, err => {
                    if (err) {
                    console.error(err)
                    return
                    }
                })
            }   
            for(const key in Authors){
                if(Authors[key].email === authorsEmail){
                    return;
                } 
            }
            var firstname = await question("Enter Firstname of the Author ")
            var lastname = await question("Enter lastname of the Author ")
            Authors.push({email:authorsEmail,firstname:firstname,lastname:lastname})
            var jsonObject = JSON.stringify(Authors);
            const arr = ConvertToCSV(jsonObject)
            fs.writeFile('./Data/Authors.csv', jsonObject, err => {
                if (err) {
                console.error(err)
                return
                }
            })
            resolve()
        }
        })

    }
        console.log('Library Database')

        console.log("Press 1 to print all the document present in Library")
        console.log("Press 2 to search document  from their ISBN number")
        console.log("Press 3 to search the document by their author")
        console.log("Press 4 Enter new Document in Library")
        const choice = await question("Enter your choice : ")
        if(choice === '1'){
            await printData()
        }else if(choice === '2'){
            await findByISBN()
        }else if( choice === '3'){
            await findByEmail();
        }else if(choice === '4'){
           await askQuestions()
        }else{
            console.log('Please Enter Valid Input...!')
   }
   cli()
    
}

// findByEmail()




cli()