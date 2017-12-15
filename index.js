/* global angular, Stripe */

(function () {
  'use strict'

  angular
    .module('angularjs-stripe-elements', [])
    .provider('$stripeElementProvider', stripeElementProvider)
    .directive('stripeElement', stripeElementDirective)

  function stripeElementProvider () {
    this.apiKey = null
    this.cardElementId = '#card-element'
    this.errorsElementId = '#card-errors'

    this.setAPIKey = function (apiKey) {
      this.apiKey = apiKey
    }

    this.$get = function () {
      return this
    }
  }

  stripeElementDirective.$inject = ['$stripeElementProvider']

  function stripeElementDirective ($stripeElementProvider) {
    var possibleEvents = ['ready', 'change', 'click', 'focus', 'blur']

    return {
      restrict: 'EA',
      link: link,
      template: '<div id="card-element"></div>',
      controller: controller,
      controllerAs: 'ctrl',
      scope: true,
      bindToController: {
        options: '<'
      }
    }

    function link ($scope, $element, $attrs) {
      var stripe = Stripe($stripeElementProvider.apiKey)
      var elements = stripe.elements()
      var card = elements.create('card', $attrs.options)
      var el = $element[0]

      // pass on every event to the scope
      possibleEvents.map(function (eventName) {
        card.on(eventName, function (e) {
          $scope.$emit('stripe:' + eventName, e)
        })
      })
      $scope.$on('$destroy', card.destroy)
      card.mount(el)
    }

    function controller () {

    }
  }
})()
