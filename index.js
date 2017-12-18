/* global angular, Stripe */

(function () {
  'use strict'

  angular
    .module('angularjs-stripe-elements', [])
    .provider('StripeElements', StripeElementsProvider)
    .directive('stripeElementDecorator', stripeElementDecorator)
    .component('stripeElement', getStripeElementComponent())

  function StripeElementsProvider () {
    this.apiKey = null

    this.setAPIKey = function (apiKey) {
      this.apiKey = apiKey
    }

    this.$get = function () {
      return Stripe(this.apiKey)
    }
  }

  function stripeElementDecorator () {
    return {
      restrict: 'A',
      link: link
    }

    function link ($scope, $element, $attr) {
      var $ctrl = $scope.$ctrl

      $scope.$on('$destroy', function () {
        $ctrl.instance.destroy()
      })

      $ctrl.instance.mount($element[0])
    }
  }

  function getStripeElementComponent () {
    return {
      template: '<div stripe-element-decorator></div>',
      controller: function () {},
      bindings: {
        instance: '<'
      }
    }
  }
})()
