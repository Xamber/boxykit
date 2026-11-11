/** Strict CSS: boxy- names only, values from the tokens, no !important outside the reset. */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    "selector-class-pattern": ["^boxy(-[a-z0-9]+)+$", { message: "Classes are boxy-<block>[-<part|variant>]" }],
    "custom-property-pattern": ["^boxy(-[a-z0-9]+)+$", { message: "Custom properties are --boxy-<name>" }],
    "keyframes-name-pattern": ["^boxy(-[a-z0-9]+)+$", { message: "Keyframes are boxy-<block>-<name>" }],
    "layer-name-pattern": null,
    // lightningcss bundles plain string imports.
    "import-notation": "string",
    // Tokens and declarations are grouped under comments, not separated by blank lines.
    "custom-property-empty-line-before": null,
    "comment-empty-line-before": null,
    // Each component sits in its own layer block, so order-by-specificity is noise here.
    "no-descending-specificity": null,
    "selector-max-id": 0,
    "selector-max-specificity": "0,4,0",
    "declaration-no-important": true,
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "fill", "stroke", "background", "z-index", "font-size", "font-family", "font-weight", "border-radius", "transition-duration"],
      {
        ignoreValues: ["inherit", "currentcolor", "transparent", "none", "0", "1em", "initial", "unset"],
        ignoreFunctions: true,
        expandShorthand: false,
        disableFix: true,
      },
    ],
  },
  overrides: [
    {
      // The reset sets base values and must beat the hidden attribute everywhere; the tokens define the values.
      files: ["**/reset.css", "**/tokens.css"],
      rules: {
        "declaration-no-important": null,
        "scale-unlimited/declaration-strict-value": null,
      },
    },
    {
      // The docs site's own styles: any class name, still using the tokens.
      files: ["apps/docs/**/*.css"],
      rules: {
        "selector-class-pattern": null,
        "custom-property-pattern": null,
      },
    },
  ],
};
