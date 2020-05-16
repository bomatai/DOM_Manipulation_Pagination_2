/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/* 
i'd like to try for the exceed expectation and would not want to get a grade if it doesn't reach that level 
*/

/* 
This is a Project in Unobstrctive Javascript implementation and DOM manipulation .
it implements a series of functions that allows a user search through a list of students.

*/


/*
The parseList Fxn takes all the student data and stores them in arrays 

The PageCount fxn takes the numberOfItems variable which is the number of items to display per page

The showStudents fxn hides all other students in the HTML List and displays the required students Per Page

*/


/*A couple of global variables that store the array of students , their names , search results  & starter page*/

let studentList;
let numberOfItems=10;
let searchResults=[];
let page =1 ;
let studentNames=[];
let pageList1;





/* NOW the code begins */



// The parseList Fxn takes all the student data and stores them in arrays 
function parseList()
      {
      x= document.querySelectorAll('ul li');
      studentList=Array.from(x);
      let y= document.querySelectorAll('h3');
      for (i=0;i<y.length;i++){studentNames.push(String(y[i].innerText));}
       
      }


// This function hideItems alters the display Parameters of any List array passed to it by changing the display parameter to none therfore 'hiding' it
function hideItems(hide)
      {
         for (i=0 ;i<hide.length ;i++){
            hide[i].style.display ='none';}
            clearApendix();            
       }
     
      //  The showStudents fxn hides all other students in the HTML List and displays the required students Per Page
function showStudents(list,page){
     
      hideItems(studentList);
      let startIndex = ((page*numberOfItems)-numberOfItems);
      let endIndex = page*numberOfItems;
      
      for (i = 0; i< list.length; i++) {
    
         if (i >= startIndex && i< endIndex) {
            //  console.log(list[i]);
             list[i].style.display ='';  } 
              }  
            if(searchResults.length >1||list==studentList){appendPageLinks(list);
            document.querySelectorAll('.specificButtons')[page-1].classList.add('active');}
            return null;    
            }

/*This function takes any array passed to it and computes the pagecount based on the predetermied number set in the 'numberofItems' Variable ...
 Nothing fancy just division and rounding up to the nearest interger*/

 function pageCount (listCollection)
      {return Math.ceil((listCollection.length)/numberOfItems);}



/* This Crazy function does something really simple , based on the value returned from the pagecount function above
 it creates page buttons and allows them listen to the click event */

 function appendPageLinks(list)
      { 
         let pageBody =document.querySelector('.student-list');
   
         pageBody.insertAdjacentHTML('afterend','<div class ="pagination"> <ul class="pageButtons"> </ul> </div>');
         
            pageList= document.querySelector('.pageButtons');

            pageList1= document.querySelectorAll('.pageButtons');

            if(pageList1.length > 0)
               {clearApendix();}

             for (i =1; i<pageCount(list)+1; i++)
               {
               
               let li = document.createElement('li');
               li.id="pageButtons";
               pageList.appendChild(li);
               let a = document.createElement('a');
               a.classList.add('specificButtons');
               a.textContent=i;
               a.href ="#";
               
                  a.addEventListener("click", ()=>
                     {  let specificButtons = document.querySelectorAll('.specificButtons');
                        for(i=0; i< specificButtons.length; i++){specificButtons[i].classList.remove('active');}
                        showStudents(list,a.textContent);
                        a.classList.add('active');
                     });
                  li.appendChild(a);
                  }
                  
               }

// The ClearApendix fnx removes all the page buttons at the bottom of the page

                  function clearApendix()
                  {let p = document.getElementsByClassName('specificButtons');   
                  while(p.length > 0){
                     p[0].parentNode.removeChild(p[0]);}}

//The resetSearch function is triggered by the users hitting the reset button , this clears the the page and resets the page to initial view 

                  function resetSearch()
                     {
                        searchResults=[];
                        searchBar.value='';
                        showStudents(studentList,1);
                        clearError();
                     }

//This is a function that clears the Error message printed to the screen when a user searches and the search returns a null result

                     function clearError(){
                        let p1 = document.getElementsByClassName('errorMsg');   
                         while(p1.length > 0){
              p1[0].parentNode.removeChild(p1[0]);}

                     }
  

  
   
/* WELCOME TO THE SEARCH SECTION OF THIS SCRIPT */


/* This implements the search bar & button that allows the user perform a search 
it has event handlers for both a search button and a "keyup" in the input text field */


      let searchButton=document.createElement('button');
      searchButton.textContent='Search';
      searchButton.style.marginLeft ='5px';
      let searchBar = document.createElement('INPUT');
      searchBar.type = "text";
      searchBar.placeholder = "Find Students here..";

      let resetButton =document.createElement('button');
      resetButton.textContent ='Reset';
      resetButton.style.marginLeft ='5px';
      resetButton.addEventListener("click", ()=>resetSearch());

      let searchHeader = document.getElementsByClassName('page-header cf')[0];
      let searchDiv =document.createElement('div');
      searchDiv.classList ="student-search";
      searchHeader.appendChild(searchDiv);
      searchDiv.appendChild(searchBar);
      searchDiv.appendChild(searchButton);
      searchDiv.appendChild(resetButton);

      // Event Listeners for search bar

      searchButton.addEventListener("click", ()=>{searchStudents(); searchBar.value=''});

      searchBar.addEventListener("keyup",()=> {searchStudents();});


//Search & Display function

//The search function iterrates through the whole list and returns an array for each occurenc that the Index of is true

function searchStudents()
            {
            searchResults=[];
            for(i=0 ; i<studentNames.length; i++)
                  {
                     if(studentNames[i].indexOf(searchBar.value) >-1)
                     {
                           searchResults.push(studentList[i]);
                           clearError();
            }
            } 
            if (searchResults.length<1){hideItems(studentList); 
               let opps =document.getElementsByClassName('page-header cf');
               clearError();
               opps[0].insertAdjacentHTML('afterend', '<p class="errorMsg" style="color:red" > There is no Student that goes by this name, hit the Reset button to view the whole list again  </p>');
            }

            showStudents(searchResults,1);
            }
      

/*Main Function Call*/ 
parseList();
pageCount(studentList);                  
showStudents(studentList,1);
