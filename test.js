// Question 1
function outsideTheContinent(){
    let pays_sf=[];
    for (var code in Country.all_countries){
      for (var frontiere in Country.all_countries[code].getBorders()){
        if(Country.all_countries[code].getBorders()[frontiere].continent != Country.all_countries[code].continent){
          //console.log(Country.all_countries[code].continent);
          
          if (!(pays_sf.includes(Country.all_countries[code].continent))){
              
            pays_sf.push(Country.all_countries[code].continent);
            console.log(Country.all_countries[code].continent);
            
          }
        }
      }
    }
    return pays_sf;
  }


// Question 2
function moreNeighbors(){
    let max = 0;
    let res = [];
    // for each country in Country.all_countries
    for(let country in Country.all_countries){
      if(Country.all_countries[country].borders != null){
        if(Country.all_countries[country].borders.length > max){
          max = Country.all_countries[country].borders.length;
          res = [];
          res.push(Country.all_countries[country]);
        }else if(Country.all_countries[country].borders.length == max){
          res.push(Country.all_countries[country]);
        }
      }
    }
  
    return res;
}

// Question 3
function neighborless(){
    let res = [];
    for(let country in Country.all_countries){
      if(Country.all_countries[country].borders == null){
        res.push(Country.all_countries[country]);
      }
    }
    return res;
}
  

// Question 4
function moreLanguages(){
    let max = 0;
    let res = [];
    for(let country in Country.all_countries){
      if(Country.all_countries[country].languages.length > max){
        max = Country.all_countries[country].languages.length;
        res = [];
        res.push(Country.all_countries[country]);
      }else if(Country.all_countries[country].languages.length == max){
        res.push(Country.all_countries[country]);
      }
    }
    console.log("le pays avec le plus de langues est : " + res[0].fr + ", avec " + max + " langues");
    console.log("Les langues suivantes y sont parlées : ");
    for(let i = 0; i < res[0].languages.length; i++){
      console.log(res[0].languages[i].name);
    }
  
    return res;
}


// Question 5
function withCommonLanguage(){
    for (var code in Country.all_countries){
        console.log(Country.all_countries[code].name);
        for(var lang_parle in Country.all_countries[code].getLanguages()){
            for(var frontiere in Country.all_countries[code].getBorders()){
                if(Country.all_countries[code].getBorders()!='No borders'){

                    for(var lang_voisin in Country.all_countries[code].getBorders()[frontiere].getLanguages()){                        
                        if(Country.all_countries[code].getBorders()[frontiere].getLanguages().length!=0){
                            if( (Country.all_countries[code].getBorders()[frontiere].getLanguages()[lang_voisin].name) == (Country.all_countries[code].getLanguages()[lang_parle].name)){
                                console.log(Country.all_countries[code].name +" et "+ Country.all_countries[code].getBorders()[frontiere].name + " parle tout les deux " + Country.all_countries[code].getLanguages()[lang_parle].name);
                            }
                        }  
                    }
                    
                }
                
            }
        }
    }
}

// Question 6
function withoutCommonCurrency(){
    let res = [];
    for(let country in Country.all_countries){
        var currencies = false;
        if(Country.all_countries[country].borders != null){
            if(Country.all_countries[country].currencies != null){
                for(let i=0; i < Country.all_countries[country].borders.length; i++){
                    let bordering_country = Country.all_countries[country].borders[i];
                    if(two_countries_same_currency(Country.all_countries[country], Country.all_countries[bordering_country])){
                        currencies = true;
                        break;
                    }
                }
                if(!currencies){
                    res.push(Country.all_countries[country]);
                }
            }
        }
        
    }
    return res;
}

// Question 7
function sortingDecreasingDensity(){
    let res = [];
    let tuples = [];
    for(let country in Country.all_countries){ // remplit un tableau de tableau avec le nom du pays et sa densité
      tuples.push([country, Country.all_countries[country].getPopDensity()]);
    }

    tuples.sort(function(a, b) { // trie le tableau en fonction de la densité décroissante
      a = a[1];
      b = b[1];

      return b - a;
    });

    for(let i = 0; i < tuples.length; i++){ // remplit le tableau de résultat avec les pays
          res.push(Country.all_countries[tuples[i][0]]);
    }
    return res;
}

// Question 8
function moreTopLevelDomain(){
    let res = [];
  
    for(let country in Country.all_countries){
      if(Country.all_countries[country].topLevelDomain.length > 1){
        res.push(Country.all_countries[country]);
      }
    }
  
    return res;
}

// Question 9
function veryLongTrip(nom_pays){
    let pays = Country.all_countries[nom_pays];
    let pays_visitables = [];

    if(pays.borders != null){
      for(let i = 0; i < pays.borders.length; i++){
          pays_visitables.push(pays.borders[i]);
      }

      for(let i = 0; i < pays_visitables.length; i++){
          pays_visitables = pays_visitables.concat(borders_not_in(Country.all_countries[pays_visitables[i]], pays_visitables));
      }

      // suppression des doublons
      pays_visitables = pays_visitables.filter(function(item, pos) {
          return pays_visitables.indexOf(item) == pos;
      })

      // suppression du pays de départ
      pays_visitables.splice(pays_visitables.indexOf(nom_pays), 1);
    }

    return pays_visitables;
}

function borders_not_in(pays, tab){
    let res = [];
    if(pays.borders != null){
      for(let i = 0; i < pays.borders.length; i++){
        if(!tab.includes(pays.borders[i])){
          res.push(pays.borders[i]);
        }
      }
    }
    return res;
}



function two_countries_same_currency(c1, c2){
    for(var i = 0; i < c1.currencies.length; i++){
        for(var j = 0; j < c2.currencies.length; j++){
            if(c1.currencies[i].name == c2.currencies[j].name){
                return true;
            }
        }
    }
    return false;
}

function test(){
   var tab ={1 : a,2 : b};
   tab.push({3 : c});
}


// test very long trip, quel pays peut visiter le plus de pays
function test_very_long_trip(){
    let max = 0;
    let res = [];
    for(let country in Country.all_countries){
      let nb_pays = veryLongTrip(Country.all_countries[country].alpha3Code).length;
      if(nb_pays > max){
        max = nb_pays;
        res = [];
        res.push(Country.all_countries[country]);
      }else if(nb_pays == max){
        res.push(Country.all_countries[country]);
      }
    }
    return res;
}