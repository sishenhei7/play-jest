module.exports = {
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "vue"
  ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    // "^vue$": "src/dist/vue.js",
    "^vue": "<rootDir>/vue/platforms/web/entry-runtime-with-compiler",
    "^compiler/(.*)$": "<rootDir>/vue/compiler/$1",
    "^core/(.*)$": "<rootDir>/vue/core/$1",
    "^shared/(.*)$": "<rootDir>/vue/shared/$1",
    "^web/(.*)$": "<rootDir>/vue/platforms/web/$1",
    "^weex/(.*)$": "<rootDir>/vue/platforms/weex/$1",
    "^server/(.*)$": "<rootDir>/vue/server/$1",
    "^sfc/(.*)$": "<rootDir>/vue/sfc/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: [
    "jest-serializer-vue"
  ],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  // testURL: "http://localhost/",
  collectCoverageFrom: [
    // "<rootDir>/src/vuedraggable.js",
    // "<rootDir>/src/util/helper.js",
    // "src/dist/vue.js",
    "<rootDir>/vue/**"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(babel-jest|jest-vue-preprocessor)/)"
  ],
};
