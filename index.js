class Note {
    constructor(name,content){
        this.name = name
        this.content = content
    }
}

const input = document.getElementById('note')
let isNew = ''

document.getElementById('new').addEventListener('click',()=>{
    isNew = ''
 input.value = ''
});
// returns array of saved User files.
const savedFile = ()=>{
    const SavedFiles = new Array()
    for(var i=0; i < localStorage.length; i++){
     if(localStorage.key(i).includes("BarnaanNote")){
    SavedFiles.push(localStorage.key(i)) }
 }
    return SavedFiles;
}


// method for adding file to localstorage
const save=(newFile,fileName)=>{    
const serialized = JSON.stringify(newFile)
localStorage.setItem(fileName,serialized)
return true;}


// displaying existing files
const displayFile = () =>{
    let parentItem = document.querySelector('ul')
    const savedFiles = savedFile()
    savedFiles.forEach(file=>{
        let listItem = document.createElement('li')
       let item =  parentItem.appendChild(listItem)
       let name = file.split(" ")
       item.innerHTML = name[1] ;
       item.className='file';
    });

}

const noteFinder = (item) =>{
    let itemName = "BarnaanNote " + item
    let note = JSON.parse(localStorage.getItem(itemName))
    isNew = note;
    input.value = note.content
    

}

  


const selectedFile=(item)=>{
    item.addEventListener('click',()=>{
 noteFinder(item.innerHTML)
    })

}

let items = document.querySelectorAll('.file')
document.getElementById('files').addEventListener('click',()=>{
if(!items.length){
    console.log('what is wrong with you?')
    displayFile()
    items = document.querySelectorAll('.file')
}

items.forEach(item=>{
    item.addEventListener('click',selectedFile(item)); });
});


document.querySelector('button').addEventListener('click',()=>{
if(isNew){
    if(!input.value){
        alert('cannot save empty files')
    }
    else{
        isNew.content = input.value
        let fileName = "BarnaanNote " +  isNew.name
    let item = JSON.stringify(isNew)
        localStorage.setItem(fileName,item)
        alert('the file has been saved')
    }

}
else if(!input.value){
    alert('Cannot save empty files')

}
else{
 let userInput = prompt("Note Name ")
let fileName = "BarnaanNote " + userInput;
let savedFiles = savedFile();
if(savedFiles.filter(file=>{return  file == fileName;}).length){
    alert(`the file name already exists! 
              please choose another!`)
}
else{
    const newFile = new Note(userInput,input.value)
     let status = save(newFile,fileName);
     console.log(status);}
}
});