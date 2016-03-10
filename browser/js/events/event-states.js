app.config(function ($stateProvider) {

    $stateProvider.state('event', {
        url: '/event',
        templateUrl: '/js/events/event.html',
        controller: 'EventCtrl',
        resolve: {
          theEvent: function() {
            return { id: "pres", name: "2016 U.S. Presidential Election", desc: "blah"};
          }
        }
    });

});
