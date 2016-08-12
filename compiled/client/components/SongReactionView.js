"use strict";

// stateless functional component
var SongReactionView = function SongReactionView(_ref) {
  var count = _ref.count;

  // this will be inside the SongQueueEntryView
  return React.createElement(
    "div",
    null,
    "// create reference to upview and downview // this will not work... but I want to get the thought out there",
    React.createElement(UpView, { up: count }),
    React.createElement(DownView, { down: count })
  );
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NvbmdSZWFjdGlvblZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQixPQUFhO0FBQUEsTUFBWCxLQUFXLFFBQVgsS0FBVzs7O0FBRXBDLFNBQ0U7QUFBQTtJQUFBO0lBQUE7SUFHRSxvQkFBQyxNQUFELElBQVEsSUFBSSxLQUFaLEdBSEY7SUFJRSxvQkFBQyxRQUFELElBQVUsTUFBTSxLQUFoQjtBQUpGLEdBREY7QUFTRCxDQVhEIiwiZmlsZSI6IlNvbmdSZWFjdGlvblZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzdGF0ZWxlc3MgZnVuY3Rpb25hbCBjb21wb25lbnRcbmNvbnN0IFNvbmdSZWFjdGlvblZpZXcgPSAoe2NvdW50fSkgPT4ge1xuICAvLyB0aGlzIHdpbGwgYmUgaW5zaWRlIHRoZSBTb25nUXVldWVFbnRyeVZpZXdcbiAgcmV0dXJuKFxuICAgIDxkaXY+XG4gICAgICAvLyBjcmVhdGUgcmVmZXJlbmNlIHRvIHVwdmlldyBhbmQgZG93bnZpZXdcbiAgICAgIC8vIHRoaXMgd2lsbCBub3Qgd29yay4uLiBidXQgSSB3YW50IHRvIGdldCB0aGUgdGhvdWdodCBvdXQgdGhlcmVcbiAgICAgIDxVcFZpZXcgdXA9e2NvdW50fS8+XG4gICAgICA8RG93blZpZXcgZG93bj17Y291bnR9Lz5cbiAgICA8L2Rpdj5cbiAgKTtcblxufTsiXX0=