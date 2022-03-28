'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Font = {
    text: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};
var Color = {
    surface: '#150233',
    primary: '#D86ADA',
    secondary: '#6957E7',
    textPrimary: '#FFFBF4',
    textSecondary: '#D4CFCD',
};

function adjustColor(color, anmount) {
    return color.replace(/\w\w/g, function (m) {
        return Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16);
    });
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".Badge-module_badge__ZbEBU {\n  min-width: 4rem;\n  min-height: 1.3rem;\n  width: fit-content;\n  padding: 0.3rem 0.8rem 0.3rem 0.8rem;\n  border: 0.4rem solid;\n  border-radius: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 0.3rem;\n  user-select: none;\n  pointer-events: none;\n}\n.Badge-module_badge__ZbEBU img {\n  width: 1.3rem;\n  height: 1.3rem;\n}\n.Badge-module_badge__ZbEBU span {\n  font-size: 15px;\n  font-weight: 300;\n}";
var styles = {"badge":"Badge-module_badge__ZbEBU"};
styleInject(css_248z);

function Badge(_a) {
    var text = _a.text, icon = _a.icon, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? Color.primary : _b, _c = _a.color, color = _c === void 0 ? Color.textPrimary : _c;
    var badgeStyle = {
        backgroundColor: backgroundColor,
        borderColor: adjustColor(backgroundColor, -20),
    };
    var textStyle = {
        color: color,
        fontFamily: Font.text,
    };
    return (React__default["default"].createElement("div", { className: styles.badge, style: badgeStyle },
        icon !== undefined && React__default["default"].createElement("img", { src: icon }),
        text !== undefined && React__default["default"].createElement("span", { style: textStyle }, text)));
}

exports.Badge = Badge;
//# sourceMappingURL=index.js.map
