/* global angular, Stripe */

(function () {
  'use strict'

  var possibleEvents = ['ready', 'change', 'click', 'focus', 'blur']

  angular
    .module('angularjs-stripe-elements', [])
    .provider('$stripeElementProvider', stripeElementProvider)
    .component('stripeElementComponent', stripeElementComponent())

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

  function stripeElementComponent () {
    var bindings = {
      options: '<'
    }

    for (var i = 0; i < possibleEvents.length; i++) {
      var eventName = possibleEvents[i]
      var handlerName = getHandlerName(eventName)
      bindings[handlerName] = '&'
    }

    return {
      template: '<div></div>',
      controller: StripeElementController,
      bindings: bindings
    }
  }

  function StripeElementController ($element, $stripeElementProvider) {
    var ctrl = this

    ctrl.card = null

    ctrl.getCard = function () {
      return this
    }

    ctrl.$postLink = function () {
      var stripe = Stripe($stripeElementProvider.apiKey)
      var elements = stripe.elements()

      ctrl.card = elements.create('card', ctrl.options)

      ctrl.card.mount($element[0])

      possibleEvents.map(function (eventName) {
        ctrl.card.on(eventName, function (e) {
          var fnName = getHandlerName(eventName)
          var fn = ctrl[fnName]
          if (fn && angular.isFunction(fn)) fn(e)
        })
      })
    }

    ctrl.$onDestroy = function () {
      ctrl.card.destroy()
    }
  }

  function getHandlerName (eventName) {
    return 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1)
  }
})()
