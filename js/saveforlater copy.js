/* Requiurements:
Create a functional “Save for later” page for your website, where users can earmark articles, 
images, recipes, etc. in a personal folder to be able to go back and see them later.
    ○ Each item/recipe/image, etc. must have the option to “Save for later”.
    ○ When an item is added, an alert should tell the user how many items are in their “Save for later” folder.
    ○ Create a new HTML page for the “Save for later” section, which allows the user to see what is in their folder.
*/

// this function will add 'Save for Later' item as a row in the table in 'Save for Later'



const addRowToTable = (listObj) => {
    const rowArr = document.querySelector('#saveLaterRows')                     // all the 'tr' elements in table body
    // create a new row for a new book
    let row = document.createElement('tr')
    // add title, author, genre and review as td
    for (let key in listObj) {
        let data = document.createElement('td')
        data.innerHTML = listObj[key]
        row.appendChild(data)
    }

    // add Delete button as a child element of a td
    let dataDeleteBtn = document.createElement('td')
    let btnDelete = document.createElement('button')
    btnDelete.innerHTML = 'Delete'
    dataDeleteBtn.appendChild(btnDelete)
    row.appendChild(dataDeleteBtn)

    rowArr.appendChild(row)
}


const onLoad = () => {
    let saveForLaterList = []

    // if the page is loading for the first time, initialise the localStorage
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem("savedItems", JSON.stringify(saveForLaterList))
        localStorage.setItem("hasCodeRunBefore", true)
    } else {
        saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))
    }

    // 'Save for Later' option is link in the HTML file. Thus, we collect all 'a' elements. 
    let saveForLater = document.querySelectorAll('a')
    Array.from(saveForLater).forEach(a => {
        if (a.innerText == "Save for Later") {
            // identify the 'a' element in the immediate previous sibling. This is the url that we want to save for later read.
            Array.from(a.previousElementSibling.children).forEach(ele => {
                if (ele.nodeName == "A") {
                    a.addEventListener("click", () => {
                        // check if there are existing items in the saveForLaterList
                        try {
                            existingItems = []
                            for (obj of saveForLaterList) {
                                existingItems.push(obj.link)
                                // addRowToTable(obj)
                            }
                            // add only those items that are not already there in the saveForLaterList
                            if (!(existingItems.includes(ele.href))) {
                                let listObj = { item: ele.innerText, link: ele.href }
                                saveForLaterList.push(listObj)
                                localStorage.setItem("savedItems", JSON.stringify(saveForLaterList))
                                saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))
                                alert(`The items in 'Save for Later' list are:\n\n ${JSON.stringify(saveForLaterList)}`)
                                // addRowToTable(listObj)
                            }
                            else {
                                alert(`This item is already present in 'Save for Later' list. \n\n ${JSON.stringify(saveForLaterList)}`)
                            }
                        }
                        catch (error) {
                            alert(error)
                        }
                    })
                }
            })
        }
    })

}

// saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))
// for (obj of saveForLaterList) {
//     addRowToTable(obj)
// }
