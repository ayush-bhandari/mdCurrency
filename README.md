# mdCurrency
This is an [angular-material](https://material.angularjs.org/latest/) directive for [AngularJS](https://angularjs.org/) for basic currency selection and conversion from http request to Any Currency API

## Install

Install using [npm](https://www.npmjs.com/)

`npm install md-currency`

Include `<script>` in `index.html`:

`<script type="text/javascript" src="node_modules/md-currency/md-currency.js"></script>`

Minified:
 `<script type="text/javascript" src="node_modules/md-currency/md-currency.min.js"></script>`

## Usage

Inject `mdCurrency` as an dependency in the angular app

`angular.module('app',['ngMaterial','mdCurrency'])`

Use as :

**Select Currency directive :**
 `<md-select-currency base="USD"></md-select-currency>`

`base` attribute sets the base currency while making `http` request to get currency conversion rates to currency API. [Fixer API](http://fixer.io/) is used here. 

**Get Currency**
`<md-currency amount="12.345" fraction="2"></md-currency>`

`amount` attribute sets the amount of currency.
`fraction` attribute sets the number of integers after decimal point.

*Output*
**`$`**`12.35`

**currencies.json** file contains list of currencies for different countries.

`"name":"US Dollar",
"short_name":"USD",
"symbol":"$"`

`rate` property is dynamically added to the currency after an API call.

**currencyAPI.json** file contains currency api info.

`"api_url":"http://api.fixer.io/latest",
"api_key":"",
"api_params":"?base="`

**Follow me on:**
**[website](http://ayushbhandari.com.np/)**
**[facebook](https://www.facebook.com/jhilkhe.khancha)**
**[twitter](https://twitter.com/ayush_da)** 
**[linkedIn](https://www.linkedin.com/in/ayush-bhandari-3b5776126)**