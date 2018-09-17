var angular = require('angular')
require('../.')

angular.module('example', [ 'angularjs-stripe-elements' ])
  .config(function (StripeElementsProvider) {
    StripeElementsProvider.setAPIKey(process.env.STRIPE_KEY)
  })
  .component('paymentForm', {
    controller: PaymentForm,
    template: `
      <form ng-submit="$ctrl.handleSubmit" method="post" id="payment-form">

        <stripe-element instance="$ctrl.element"></stripe-element>

        <div id="card-errors" role="alert">{{$ctrl.cardErrors}}</div>

        <button>Submit Payment</button>
      </form>`
  })

function PaymentForm (StripeElements) {
  var ctrl = this

  var elements = StripeElements.elements()
  var element = elements.create('card', {})

  element.on('change', handleChange)

  ctrl.element = element

  function handleChange (e) {
    ctrl.cardErrors = e.error ? e.error.message : ''
  }
  
  ctrl.handleSubmit = function($event) {
		console.log(ctrl.product);
		StripeElements.createToken(element).then(function(result) {
			if (result.error) {
				ctrl.cardErrors = result.error.message;
			} else {
				// Send the token to your server.
				console.log(result);
			}
		});
	};
}

var doc = angular.element(document)

doc.ready(() => angular.bootstrap(doc, ['example']))
