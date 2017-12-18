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


```bash
npm install --save angularjs-stripe-elements
```

```js
// app.js

import angular from 'angular'
import 'angularjs-stripe-elements'

```

Add as a dependency of your app:

```js
angular.module('myApp', [ 'angularjs-stripe-elements'])

```

Configure the provider:

```js
angular.config(function ($stripeElementProvider) {
  $stripeElementProvider.setAPIKey(STRIPE_API_PUBLISHABLE_KEY)
})
```

Pass an options object the `options` attribute of the component.
You can also register a handler for every event that Stripe Elements supports in it's API.

```html
<form ng-submit="$ctrl.handleSubmit" method="post" id="payment-form">

  <stripe-element
    options="$ctrl.stripeElementOptions"
    on-change="$ctrl.handleChange"
    on-blur="$ctrl.handleBlur">
    <!-- a Stripe Element will be inserted here. -->
  </stripe-element>

  <!-- Used to display form errors -->
  <div id="card-errors" role="alert"></div>

  <button>Submit Payment</button>
</form>
```
