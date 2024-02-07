const fetchData = async(url)=>{
    const result= await fetch(url);
    const pokemonData = await result.json();
     totalCount=pokemonData.count;
     pervURL=pokemonData.previous;
     nextURL=pokemonData.next;
     displayData(pokemonData.results);


}
var totalCount=1302;
var nextURL="";
var pervURL="";
const displayData = (pokemonList) => {
    
    const container= document.getElementById("data");
   container.innerHTML = ""; 
   const dataElement= document.createElement("div");
   dataElement.id = "container"
   let dataText=""
   pokemonList.forEach((pokemon) => {
    dataText+= `
    <div class="poke">${pokemon.name} </div>
   
    `;
   });
   dataElement.innerHTML=dataText
   container.appendChild(dataElement);
   console.log(pervURL,nextURL)

    // console.log(pokemonData)

};
console.log(pervURL,nextURL)

// const createPaginationControls = () => {
//     $('#pagination-container').pagination({
//         dataSource: function(done) {
//             done(Array.from({ length: Math.ceil(totalCount / 20) }, (_, i) => i + 1));
//         },
//         pageSize: 1,
//         showPrevious: true,
//         showNext: true,
//         showPageNumbers: true,
//         callback: function(data, pagination) {
//             const page = data[0];
//             const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`;
//             fetchData(url);
//         }
//     });
// };


const createPaginationControls = () => {
    $('#pagination-container').pagination({
        dataSource: function(done) {
            done(Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i + 1));
        },
        pageSize: 1,
        showPrevious: true,
        showNext: true,
        showPageNumbers: true,
        callback: function(data, pagination) {
            // We don't need to do anything here since we'll be using prevURL and nextURL to fetch data
        },
        afterPageOnClick: function(e, pageNumber) {
            // This function is called after clicking on a page number
            const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(pageNumber - 1) * 10}`;
            fetchData(url);
        },
        afterPreviousOnClick: function(e) {
            // This function is called after clicking on the Previous button
            fetchData(prevURL);
        },
        afterNextOnClick: function(e) {
            // This function is called after clicking on the Next button
            fetchData(nextURL);
        }
    });
};


document.getElementById("fetchdata").addEventListener("click", function(){
    const url="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    fetchData(url);

})
   


document.addEventListener("DOMContentLoaded", ()=>{
    createPaginationControls();

})


