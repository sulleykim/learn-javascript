beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        /**
         * @param {Player} actual 
         * @param {Song} expected 
         */
        compare: function (actual, expected) {
          var player = actual;
          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});
