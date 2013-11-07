(function (window, $) {

  window.MAPP = window.MAPP || {};
  window.MAPP.Model = window.MAPP.Model || {};
  var ns = window.MAPP,
    model = window.MAPP.Model;

  ns.RoomsViewModel = function () {
    var self = this;

    self.rooms = ko.observableArray();

    self.filteredRooms = ko.computed(function () {
      return self.rooms();
    });

    function success(resp) {
      $.each(resp.rooms, function (index, room) {
        self.rooms.push(new model.Room(room.id, room.name, room.type, room.state));
      });

      setInterval(function () {
        $.each(self.rooms(), function (index, room) {
          room.setState(Math.round(Math.random() * 100, 2));
        });
      }, 10000);
    }

    function error(resp) {
      console.log("ERROR:" + resp);
    }

    (function() {
      $.getJSON('assets/testdata/data.json', success)
        .fail(error);
    }());
  };

}(window, jQuery));