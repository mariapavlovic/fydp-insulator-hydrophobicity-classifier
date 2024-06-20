"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AnimationResolver: true
};
exports.AnimationResolver = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@gluestack-style/react");
var _utils = require("./utils");
var _propertyTokenMap = require("./propertyTokenMap");
var _AnimatedComponents = require("./AnimatedComponents");
Object.keys(_AnimatedComponents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AnimatedComponents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AnimatedComponents[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function tokenizeAnimationPropsFromConfig(props = {}, config, animationAliases, path = [], tokenizedAnimatedProps = {}) {
  for (const prop in props) {
    if (Array.isArray(props[prop])) {
      path.push(prop);
      (0, _utils.setObjectKeyValue)(tokenizedAnimatedProps, path, props[prop]);
      path.pop();
    } else if (animationAliases[prop]) {
      path.push(prop);
      const tokenizedValue = (0, _utils.resolvedTokenization)(props[prop], config);
      (0, _utils.setObjectKeyValue)(tokenizedAnimatedProps, path, tokenizedValue);
      path.pop();
    } else if (typeof props[prop] === 'object') {
      path.push(prop);
      const tokenizedValue = (0, _utils.resolvedTokenization)(props[prop], config);
      (0, _utils.setObjectKeyValue)(tokenizedAnimatedProps, path, tokenizedValue);
      // path.pop();
      tokenizeAnimationPropsFromConfig(props[prop], config, animationAliases, path, tokenizedAnimatedProps);
      path.pop();
    } else {
      path.push(prop);
      (0, _utils.setObjectKeyValue)(tokenizedAnimatedProps, path, props[prop]);
      path.pop();
    }
  }
  return tokenizedAnimatedProps;
}
function getVariantProps(props, theme) {
  const variantTypes = theme !== null && theme !== void 0 && theme.variants ? Object.keys(theme.variants) : [];
  const restProps = {
    ...props
  };
  const variantProps = {};
  variantTypes === null || variantTypes === void 0 || variantTypes.forEach(variant => {
    if (props[variant]) {
      variantProps[variant] = props[variant];
      // delete restProps[variant];
    }
  });
  return {
    variantProps,
    restProps
  };
}
function resolveVariantAnimationProps(variantProps, styledObject) {
  let resolvedVariant = {};
  Object.keys(variantProps).forEach(variant => {
    var _styledObject$variant;
    const variantValue = variantProps[variant];
    const variantObject = styledObject === null || styledObject === void 0 || (_styledObject$variant = styledObject.variants) === null || _styledObject$variant === void 0 || (_styledObject$variant = _styledObject$variant[variant]) === null || _styledObject$variant === void 0 ? void 0 : _styledObject$variant[variantValue];
    resolvedVariant = (0, _utils.deepMerge)(resolvedVariant, variantObject);
  });
  return resolvedVariant;
}
class AnimationResolver {
  config = {
    aliases: {
      ':animate': 'animate',
      ':initial': 'initial',
      ':exit': 'exit',
      ':initialProps': 'initialProps',
      ':animateProps': 'animateProps',
      ':transition': 'transition',
      ':transformOrigin': 'transformOrigin',
      ':whileTap': 'whileTap',
      ':whileHover': 'whileHover',
      ':onAnimationComplete': 'onAnimationComplete'
    },
    tokens: {},
    animatedPropMap: {}
  };
  AnimatePresenceComp = _react.default.Fragment;
  register(config) {
    if (this.config) {
      if (config !== null && config !== void 0 && config.aliases) {
        var _this$config;
        this.config.aliases = {
          ...((_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.aliases),
          ...(config === null || config === void 0 ? void 0 : config.aliases)
        };
      }
      if (config !== null && config !== void 0 && config.tokens) {
        var _this$config2;
        this.config.tokens = {
          ...((_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : _this$config2.tokens),
          ...(config === null || config === void 0 ? void 0 : config.tokens)
        };
      }
      if (config !== null && config !== void 0 && config.animatedPropMap) {
        var _this$config3;
        this.config.animatedPropMap = {
          ...((_this$config3 = this.config) === null || _this$config3 === void 0 ? void 0 : _this$config3.animatedPropMap),
          ...(config === null || config === void 0 ? void 0 : config.animatedPropMap)
        };
      }
      // @ts-ignore
      this.config.ref = config === null || config === void 0 ? void 0 : config.ref;
    }
  }
  constructor(ComponentDriverClass, config = {}) {
    // @ts-ignore
    const componentDriver = new ComponentDriverClass(config);
    this.name = 'AnimationResolver';
    this.componentDriver = componentDriver;
    if (componentDriver.engine.AnimatePresence) {
      this.AnimatePresenceComp = componentDriver.engine.AnimatePresence;
    }
    this.#childrenExitPropsMap = {};
    this.#extendedConfig = {};
    this.register(componentDriver.config);
  }
  #childrenExitPropsMap;
  #extendedConfig;
  inputMiddleWare(styledObj = {}, shouldUpdateConfig = true, _, Component, componentStyleConfig) {
    var _Component$displayNam;
    const ignoreKeys = new Set();
    const uniqueComponentId = componentStyleConfig === null || componentStyleConfig === void 0 ? void 0 : componentStyleConfig.uniqueComponentId;
    if (Component && ((_Component$displayNam = Component.displayName) !== null && _Component$displayNam !== void 0 && _Component$displayNam.startsWith('Gluestack-AnimatedResolver-Animated') ||
    // @ts-ignore
    Component.isAnimatedComponent)) {
      var _this$componentDriver;
      const componentDisplayName = Component.displayName;
      const AnimatedComponent = this === null || this === void 0 || (_this$componentDriver = this.componentDriver) === null || _this$componentDriver === void 0 ? void 0 : _this$componentDriver.engine[// @ts-ignore
      componentDisplayName === null || componentDisplayName === void 0 ? void 0 : componentDisplayName.replace('Gluestack-AnimatedResolver-Animated', '')];
      if (AnimatedComponent) {
        AnimatedComponent.isAnimatedComponent = true;
      }
      // if (!AnimatedComponent) {
      //   AnimatedComponent = Component;
      // }
      const resolvedAnimatedProps = this.updateStyledObject(styledObj, shouldUpdateConfig, ignoreKeys, {}, uniqueComponentId ? [uniqueComponentId] : []);
      const resolvedStyledObjectWithAnimatedProps = (0, _utils.deepMerge)(styledObj, resolvedAnimatedProps);

      // if (shouldUpdateConfig) {
      //   // @ts-ignore
      //   return [styledObj, shouldUpdateConfig, _, AnimatedComponent];
      // }

      // @ts-ignore

      return [resolvedStyledObjectWithAnimatedProps, shouldUpdateConfig, _, Component, ignoreKeys];
    }
    // @ts-ignore
    return [styledObj, shouldUpdateConfig, _, Component, ignoreKeys];
  }
  updateStyledObject(styledObject = {}, shouldUpdateConfig, ignoreKeys, resolvedStyledObject = {}, keyPath = []) {
    var _this$config4, _this$config5;
    const aliases = (_this$config4 = this.config) === null || _this$config4 === void 0 ? void 0 : _this$config4.aliases;
    const animatedPropMap = (_this$config5 = this.config) === null || _this$config5 === void 0 ? void 0 : _this$config5.animatedPropMap;
    for (const prop in styledObject) {
      if (aliases && aliases !== null && aliases !== void 0 && aliases[prop]) {
        ignoreKeys.add(prop);
        if (shouldUpdateConfig) {
          // this.#childrenExitPropsMap[prop] = styledObject[prop];

          this.#childrenExitPropsMap = (0, _utils.setObjectKeyValue)(this.#childrenExitPropsMap, [...keyPath, prop], styledObject[prop]);
        } else {
          const value = styledObject[prop];

          // @ts-ignore
          keyPath.push('props', aliases[prop]);
          // setObjectKeyValue(resolvedStyledObject, keyPath, value);

          (0, _utils.setObjectKeyValue)(resolvedStyledObject, keyPath, value);
          keyPath.pop();
          keyPath.pop();
        }
        delete styledObject[prop];
      } else if (typeof styledObject[prop] === 'object') {
        keyPath.push(prop);
        this.updateStyledObject(styledObject[prop], shouldUpdateConfig, resolvedStyledObject, keyPath);
        keyPath.pop();
      }

      // @ts-ignore

      if (animatedPropMap && animatedPropMap[prop]) {
        this.renameObjectKey(styledObject, prop, animatedPropMap[prop]);
      }
    }
    return resolvedStyledObject;
  }
  renameObjectKey(obj, from, to) {
    obj[to] = obj[from];
    delete obj[from];
    return obj;
  }
  componentMiddleWare({
    Component,
    ExtendedConfig,
    componentStyleConfig
  }) {
    var _this$childrenExitPro, _Component$displayNam2;
    const styledConfig = (_this$childrenExitPro = this.#childrenExitPropsMap) === null || _this$childrenExitPro === void 0 ? void 0 : _this$childrenExitPro[componentStyleConfig === null || componentStyleConfig === void 0 ? void 0 : componentStyleConfig.uniqueComponentId];
    if (Component && ((_Component$displayNam2 = Component.displayName) !== null && _Component$displayNam2 !== void 0 && _Component$displayNam2.startsWith('Gluestack-AnimatedResolver-Animated') ||
    // @ts-ignore
    Component.isAnimatedComponent)) {
      var _Component$displayNam3;
      Component = this === null || this === void 0 ? void 0 : this.componentDriver.engine[(_Component$displayNam3 = Component.displayName) === null || _Component$displayNam3 === void 0 ? void 0 : _Component$displayNam3.replace('Gluestack-AnimatedResolver-Animated', '')];
      const NewComponent = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
        var _this$config6;
        const {
          sx,
          ...rest
        } = props;
        const styledContext = (0, _react2.useStyled)();
        (0, _react.useEffect)(() => {
          if (!styledContext.animationDriverData) {
            styledContext.setAnimationDriverData(this.componentDriver);
          }
        }, [styledContext]);
        const CONFIG = (0, _react.useMemo)(() => ({
          ...styledContext.config,
          propertyTokenMap: _propertyTokenMap.propertyTokenMap
        }), [styledContext.config]);
        this.#extendedConfig = CONFIG;
        if (ExtendedConfig) {
          this.#extendedConfig = (0, _utils.deepMerge)(CONFIG, ExtendedConfig);
        }
        let tokenizedAnimatedProps = {};
        const {
          variantProps,
          restProps
        } = getVariantProps(rest, styledConfig);
        const variantStyledObject = resolveVariantAnimationProps(variantProps, styledConfig);
        const componentStyledObject = (0, _utils.deepMerge)(variantStyledObject, styledConfig);
        const animationAliases = (_this$config6 = this.config) === null || _this$config6 === void 0 ? void 0 : _this$config6.aliases;
        const config = this.#extendedConfig;
        tokenizedAnimatedProps = tokenizeAnimationPropsFromConfig(componentStyledObject, config, animationAliases);
        const tokenizedSxAnimationProps = tokenizeAnimationPropsFromConfig(sx, config, animationAliases);
        const mergedAnimatedProps = (0, _utils.deepMerge)(tokenizedAnimatedProps, tokenizedSxAnimationProps);

        // @ts-ignore
        const [resolvedAnimatedStyledWithStyledObject,,,] = this.inputMiddleWare(mergedAnimatedProps, false, false, Component);
        let isState = false;
        Object.keys((restProps === null || restProps === void 0 ? void 0 : restProps.states) ?? {}).forEach(state => {
          isState = restProps.states[state] ? true : false;
        });
        const animatedProps = !isState ? // @ts-ignore
        resolvedAnimatedStyledWithStyledObject === null || resolvedAnimatedStyledWithStyledObject === void 0 ? void 0 : resolvedAnimatedStyledWithStyledObject.props : {};
        const propsTobeApplied = (0, _utils.deepMerge)(animatedProps, rest);
        return /*#__PURE__*/_react.default.createElement(Component, _extends({}, propsTobeApplied, {
          ref: ref
        }));
      });
      if (NewComponent) {
        var _Component, _Component2, _Component3, _Component4;
        //@ts-ignore
        NewComponent.styled = {};
        //@ts-ignore
        NewComponent.styled.config = {};

        //@ts-ignore
        NewComponent.styled.config = {
          ...((_Component = Component) === null || _Component === void 0 || (_Component = _Component.styled) === null || _Component === void 0 ? void 0 : _Component.config),
          ...styledConfig
        };
        //@ts-ignore
        NewComponent.isStyledComponent = (_Component2 = Component) === null || _Component2 === void 0 ? void 0 : _Component2.isStyledComponent;
        //@ts-ignore
        NewComponent.isComposedComponent = (_Component3 = Component) === null || _Component3 === void 0 ? void 0 : _Component3.isComposedComponent;
        NewComponent.displayName = (_Component4 = Component) === null || _Component4 === void 0 ? void 0 : _Component4.displayName;

        // this.#childrenExitPropsMap = {};

        return NewComponent;
      }
    }
    return Component;
  }
}
exports.AnimationResolver = AnimationResolver;
//# sourceMappingURL=index.js.map