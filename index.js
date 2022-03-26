class Search {
    constructor(url) {
        console.log(url);
        fetch(url)
            .then(response => { return response.json() })
            .then(commits => {
                const list = document.getElementById("imageCollection");
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }

                console.log(' commits : ', commits)
                commits.map(
                    (e) => {
                        const image = document.createElement("img");
                        image.src = e.url;
                        let cover = document.createElement("div");
                        cover.className = 'image_container'
                        cover.append(image);
                        document.getElementById('imageCollection').append(cover)
                    })
            });
    }
}

class BreedSelector {
    constructor() {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then(response => response.json())
            .then(commits => {
                commits.map(
                    (e) => {
                        let option = document.createElement('option');
                        option.innerHTML = `${e.name}`;
                        option.value = `${e.id}`
                        document.getElementById('breedSelector').append(option);
                    })
            });
    }
};

class CategorySelector {
    constructor() {
        fetch('https://api.thecatapi.com/v1/categories')
            .then(response => response.json())
            .then(commits => {
                commits.map(
                    (e) => {
                        let option = document.createElement('option');
                        option.innerHTML = `${e.name}`;
                        option.value = `${e.id}`
                        document.getElementById('categorySelector').append(option);
                    })
            });
    }
}

let defaultLoader = function () {
    new BreedSelector();
    new CategorySelector();

    let loader = function (event) {
        //let search = new Search();

        let categorySelector = document.getElementById('categorySelector');
        let breedSelector = document.getElementById('breedSelector');
        let typeSelector = document.getElementById('typeSelector');
        let orderSelector = document.getElementById('orderSelector');
        let limitSelector = document.getElementById('limitSelector');

        let category = categorySelector.options[categorySelector.selectedIndex].value;
        let breed = breedSelector.options[breedSelector.selectedIndex].value;
        let type = typeSelector.options[typeSelector.selectedIndex].value;
        let order = orderSelector.options[orderSelector.selectedIndex].value;
        let limit = limitSelector.options[limitSelector.selectedIndex].value;

        //console.log(`category : ${category}, breed:${breed},  type : ${type}, order: ${order}, limit : ${limit}`);

        try {
            if (order === 'null') {
                order = 'random';
            }
            if (type === 'null') {
                type = 'All';
            }
            if (limit === 'null') {
                limit = 9;
            }
            if (category == "none") {
                category = '';
            }
            if (breed == "none") {
                breed = ' ';
            }

            //console.log(`category : ${category}, breed:${breed},  type : ${type}, order: ${order}, limit : ${limit}`);
            new Search(`https://api.thecatapi.com/v1/images/search?limit=${limit}&&order=${order}&mime_types=${type}&category_ids=${category}&breed_ids=${breed}`);
        } catch (error) {
            console.log('error : ', error);
        }
    };

    (function () {
        let temp = document.getElementById('navBar').getElementsByTagName('button')[0];
        temp.addEventListener('click', loader);

        fetch(`https://api.thecatapi.com/v1/images/search?limit=8`)
            .then(response => response.json())
            .then(commits => {
                commits.map(
                    (e) => {
                        const image = document.createElement("img");
                        image.src = e.url;
                        let cover = document.createElement("div");
                        cover.className = 'image_container';
                        cover.append(image);
                        document.getElementById('imageCollection').append(cover)
                    })
            });
    })();
}

window.onload = defaultLoader;