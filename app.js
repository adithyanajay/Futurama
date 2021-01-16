const container = document.querySelector(".container")
const url = "http://futuramaapi.herokuapp.com/api/v2/characters";
let arrived;
// fetching data from Api =)
fetch(url).then(response=>{
    response.json().then(data=>{
        data.map((data)=>{
            return cardData(data)
        })
        if(response.status === 200){
            popUp()
            addIdToCards()
        }
    })
})



// Search Functions and feauters 😉
const search = ()=>{

    let searchText = document.getElementById("searchBox").value.toLowerCase();
    let card = document.querySelectorAll(".card")
    for(i=0; i<card.length; i++){
        let name = card[i].querySelector(".name").innerHTML.toLowerCase() 
        

        if(name.indexOf(searchText)> -1){
            card[i].style.display = "";
        }
        else{
            card[i].style.display = "none";
        }
        
    }

// Shows Not found when there is no result

const noneArr = []
const notFound = container.querySelector(".not-found")
    for(i=0; i<card.length; i++){
        if(card[i].style.display == "none"){
            noneArr.push("no")
            if(noneArr.length>=20){
                
                notFound.style.display = "block";
            }
        }else{
            notFound.style.display = "none";
        }
    }
}




// Function that make a cards after reciveing the data!
let apiData = [];
const cardData = (data)=>{
    apiData.push(data)
    var cards = document.createElement('div');
            cards.classList.add('card')
            container.appendChild(cards)

            var img = document.createElement('img');
            img.src = data.PicUrl;
            img.classList.add('img')
            cards.appendChild(img)
            
            var name = document.createElement('h2');
            name.classList.add("name");
            name.innerHTML = data.Name;
            cards.appendChild(name);
}

const addIdToCards = ()=>{
    let i = 0
    const cards = container.querySelectorAll(".card")
    cards.forEach((card)=>{
        card.setAttribute("id", i)
        i++;
    })
}

const popUp = ()=>{
    const cards = container.querySelectorAll(".card")
    cards.forEach((card)=>{
        card.addEventListener("click", ()=>{
            const popup = document.querySelector(".popup")
            const overlay = document.querySelector(".overlay")
            const close = popup.querySelector("button")

          
            popupData(apiData, card)
            
            popup.style.display = "block";
            overlay.style.display = "block"

            close.addEventListener("click", ()=>{
                popup.style.display = "none"
                overlay.style.display = "none"
                document.querySelector(".chr-img").innerHTML = "";
                document.querySelector(".static-data").innerHTML = "";

            })

            overlay.addEventListener("click", ()=>{
                popup.style.display = "none"
                overlay.style.display = "none"
                document.querySelector(".chr-img").innerHTML = "";
                document.querySelector(".static-data").innerHTML = "";
            })
            
        })
       
})

}

// This brings extra details about the character in a popup window
const popupData = (api, card)=> {
    let img = document.querySelector(".chr-img");
    let field = document.querySelector(".static-data");
    

    let name = document.createElement("p");
    name.innerHTML = api[card.id].Name
    field.append(name)

    let age = document.createElement("p");
    age.innerHTML = api[card.id].Age
    field.append(age)

    let status = document.createElement("p")
    status.innerHTML = api[card.id].Status;
    field.append(status)

    let species = document.createElement("p");
    species.innerHTML = api[card.id].Species;
    field.append(species)

    let image = document.createElement("img")
    image.src = api[card.id].PicUrl;
    img.append(image)
}

// This clears the search flied while refreshing.

window.addEventListener("load", ()=>{
    document.querySelector("#searchBox").value = '';
})









