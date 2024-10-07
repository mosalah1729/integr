"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("../User_comp/css/Banner.css");
var _Upcoming = _interopRequireDefault(require("./Upcoming"));
var _Nowshow = _interopRequireDefault(require("./Nowshow"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// function Banner() {
//   return (
//     <div className='Banner'>
//       <div className='select'>
//         <button className='buttons'>Now showing</button>
//         <button className='buttons'>Coming soon</button>
//       </div>
//       <div className='lang'>
//       <h1>Language</h1>
//       </div>
//       <div className='movies'>
//       <h1 style={{marginLeft:'400px'}}>Movies in</h1>

//       <Nowshow/>
//       <Upcoming/>
//       </div>
//     </div>
//   )
// }

function Banner(props) {
  const {
    userName
  } = props;
  const [showNowShowing, setShowNowShowing] = (0, _react.useState)(true);
  const handleNowShowingClick = () => {
    setShowNowShowing(true);
  };
  const handleUpcomingClick = () => {
    setShowNowShowing(false);
  };
  const [selectedOption, setSelectedOption] = (0, _react.useState)('');
  const [displayedOption, setDisplayedOption] = (0, _react.useState)('');
  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
    setDisplayedOption(event.target.value);
    props.onSelect(event.target.value); // Call the onSelect function passed in as a prop with the selected value
  };
  console.log(selectedOption);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Banner"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/random"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "random"
  }, "Ratings")), /*#__PURE__*/_react.default.createElement("div", {
    className: "select"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "buttons",
    onClick: handleNowShowingClick
  }, "Now showing"), /*#__PURE__*/_react.default.createElement("button", {
    className: "buttons",
    onClick: handleUpcomingClick
  }, "Coming soon"), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "simple-select-box"
  }), /*#__PURE__*/_react.default.createElement("select", {
    id: "simple-select-box",
    value: selectedOption,
    onChange: handleSelectChange,
    style: {
      marginLeft: '19cm'
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Location"), /*#__PURE__*/_react.default.createElement("option", {
    value: "mananthavady"
  }, "mananthavady "), /*#__PURE__*/_react.default.createElement("option", {
    value: "kozhikode"
  }, "kozhikode "), /*#__PURE__*/_react.default.createElement("option", {
    value: "kochi"
  }, "kochi "))), /*#__PURE__*/_react.default.createElement("div", {
    className: "lang",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      marginRight: '20px'
    }
  }, "Language"), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      marginRight: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "language",
    value: "english"
  }), "English"), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      marginRight: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "language",
    value: "malayalam"
  }), "Malayalam"), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      marginRight: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "language",
    value: "hindi"
  }), "Hindi"), /*#__PURE__*/_react.default.createElement("label", {
    style: {
      marginRight: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "language",
    value: "kannada"
  }), "Kannada"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: "language",
    value: "telugu"
  }), "Telugu"), /*#__PURE__*/_react.default.createElement("div", {
    className: "genres"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Genres"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "genre",
    value: "horror"
  }), "Horror"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "genre",
    value: "action"
  }), "Action"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "genre",
    value: "animation"
  }), "Animation"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "genre",
    value: "adventure"
  }), "Adventure"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "genre",
    value: "thriller"
  }), "Thriller"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "movies"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      marginLeft: '400px'
    }
  }, "Movies in"), showNowShowing ? /*#__PURE__*/_react.default.createElement(_Nowshow.default, {
    movieLoc: selectedOption,
    userName: userName
  }) : /*#__PURE__*/_react.default.createElement(_Upcoming.default, {
    movieLoc: selectedOption,
    userName: userName
  })));
}
var _default = exports.default = Banner;