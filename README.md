# angularjs-stripe-element

Easily add Stripe Elements in your Angular.js apps.


## Requirements

### Include the Stripe.js script in your index.html

```html
<script src="https://js.stripe.com/v3/"></script>
```

From the Stripe website:
> To best leverage Stripe’s advanced fraud functionality, include this script on every page on your site, not just the checkout page. Including the script on every page allows Stripe to detect anomalous behavior that may be indicative of fraud as users browse your website.


## Usage

##### Install from NPM:

```bash
npm install --save angularjs-stripe-elements
```

##### Add as a dependency of your app:

```js
import angular from 'angular'
import 'angularjs-stripe-elements'

angular.module('myApp', [ 'angularjs-stripe-elements'])

```

##### Configure the provider:

```js
angular.config(function (StripeElementsProvider) {
  StripeElementsProvider.setAPIKey(STRIPE_API_PUBLISHABLE_KEY)
})
```

##### Inject the provider into a component's controller. 

It's a configured instance of [the Stripe object](https://stripe.com/docs/stripe-js/reference#the-stripe-object).

```js
function MyCtrl (StripeElements) {
  var elements = StripeElements.elements()
  var element = elements.create('card', {})

  element.on('change', handleChange)

  this.element = element

  function handleChange (e) {
    this.cardErrors = e.error ? e.error.message || ''
  }
}
```

##### Add a `stripe-element` element to your template and pass it your Element instance.

```html
<form ng-submit="$ctrl.handleSubmit" method="post" id="payment-form">

  <stripe-element instance="$ctrl.element">
    <!-- a Stripe Element will be inserted here. -->
  </stripe-element>

  <!-- Used to display form errors -->
  <div id="card-errors" role="alert">{{$ctrl.cardErrors}}</div>

  <button>Submit Payment</button>
</form>
```
