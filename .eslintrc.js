module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      0,
      {
        "extensions": [
          ".jsx"
        ]
      }
    ],
    "import/extensions": [
      "warn",
      "never",
      {
        "svg": "always",
        "jpg": "always",
        "png": "always"
      }
    ],
    "prettier/prettier": [
      "warn",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 120
      }
    ],
    "import/no-unresolved": "off",
    "no-shadow": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/label-has-for": "off"
  },
  "env": {
    "browser": true,
    "jest": true
  },
  "plugins": [
    "prettier"
  ]
}
