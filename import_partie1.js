

class Country {
   static all_countries = {};


  constructor(alpha3Code, area, borders, capital, continent, demonym, flag, fr, name, de, es, it, population, topLevelDomain, currencies, languages) {
      console.log(alpha3Code)

      this.alpha3Code = alpha3Code;
      this.area = area;
      this.borders = borders;
      this.capital = capital;
      this.continent = continent;
      this.demonym = demonym;
      this.flag = flag;
      this.fr = fr;
      this.name = name;
      this.de = de;
      this.es = es;
      this.it = it;
      this.population = population;
      this.topLevelDomain = topLevelDomain;
      this.currencies = currencies;
      this.languages = languages;

      Country.all_countries[this.alpha3Code] = this;
  }

  toString(){
    return this.name;
  }

  getPopDensity(){
    return this.population / this.area;
  }

  getBorders(){
    let borders = [];
    if(this.borders == null) return "No borders";
    for(let i = 0; i < this.borders.length; i++){
      borders.push(Country.all_countries[this.borders[i]]);
    }
    return borders;
  }

  getCurrencies(){
    let currencies = [];
    if(this.currencies == null) return "No currencies";
    for(let i = 0; i < this.currencies.length; i++){
      currencies.push(Currency.all_currencies[this.currencies[i].code]);
    }
    return currencies;
  }

  getLanguages(){
    let languages = [];
    if(this.languages == null) return "No languages";
    for(let i = 0; i < this.languages.length; i++){
      languages.push(Language.all_languages[this.languages[i].iso639_2]);
    }
    return languages;
  }
}

function fill_db() {
  for (let i = 0; i < countries.length; i++) {
    new Country(countries[i].alpha3Code, countries[i].area, countries[i].borders, countries[i].capital, countries[i].region, countries[i].demonym, countries[i].flags['svg'] , countries[i].translations['fr'], countries[i].name, countries[i].translations['de'], countries[i].translations['es'], countries[i].translations['it'], countries[i].population, countries[i].topLevelDomain[0], countries[i].currencies, countries[i].languages);


    if(countries[i].currencies != null){
      for(let j = 0; j < countries[i].currencies.length; j++){
        new Currency(countries[i].currencies[j].code, countries[i].currencies[j].name, countries[i].currencies[j].symbol);
        console.log("Currency " + countries[i].currencies[j].name + " created");
      }
    }

    for(let j = 0; j < countries[i].languages.length; j++){
      new Language(countries[i].languages[j].iso639_2, countries[i].languages[j].name);
      console.log("Language " + countries[i].languages[j].name + " created");
    }

  }

}

class Currency{
   static all_currencies = {};

  constructor(code, name, symbol){
    this.code = code;
    this.name = name;
    this.symbol = symbol;

    Currency.all_currencies[this.code] = this;
  }

  toString(){
    return this.name;
  }
}

class Language{
  static all_languages = {};
  
  constructor(iso639_2,name){
    this.iso639_2 = iso639_2;
    this.name = name;

    Language.all_languages[this.iso639_2] = this;
  }

  toString(){
    return this.name;
  }
}

fill_db();
