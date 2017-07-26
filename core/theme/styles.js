'use strict';

import Dimensions from 'Dimensions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import colors from './colors';
import resolveStyle from './resolveStyle';

const base = {
  header: {
    backgroundColor: '#F26B63',
    height: 65
  },

  headerTitle: {
    fontSize: 16,
    fontFamily: 'Avenir-Light',
    fontWeight: '400'
  },

  headerButton: {
    color: '#ffffff'
  }
};

export default {
  layout: {
    width,
    height
  },

  screen: {
    width,
    height,
    position: 'relative',
    backgroundColor: '#ffffff'
  },

  scene: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#ffffff'
  },

  sceneFullScreen: {
    paddingTop: 20
  },

  middle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },

  middleVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  content: {
    width: '100%',
    padding: 15
  },

  contentHorizontal: {
    width: '100%',
    paddingHorizontal: 15
  },

  contentVertical: {
    width: '100%',
    paddingVertical: 15
  },

  header: resolveStyle(base.header, {
    backgroundColor: '#F26B63',
    height: 65
  }),

  headerTitle: resolveStyle(base.headerTitle, {
    color: '#ffffff',
    // Хак для ситуации, когда stack navigator инициализируется в modal:
    // при закрытии modal все заголовки и кнопки накладываются друг на друга,
    // поэтому я решил их просто перекрывать фоном текста таким же как и у шапки.
    // TODO исправить хак с фоном шапки stack navigator
    backgroundColor: '#F26B63'
  }),

  headerButton: resolveStyle(base.headerButton, {
    color: '#ffffff'
  }),

  headerBlank: resolveStyle(base.header, {
    backgroundColor: '#ffffff'
  }),

  headerBlankTitle: resolveStyle(base.headerTitle, {
    color: '#333333',
    backgroundColor: '#ffffff'
  }),

  headerBlankButton: resolveStyle(base.headerButton, {
    color: '#333333'
  }),

  headerGreen: resolveStyle(base.header, {
    backgroundColor: '#33CC66',
  }),

  headerGreenTitle: resolveStyle(base.headerTitle, {
    color: '#333333',
    backgroundColor: '#33CC66'
  }),

  headerGreenButton: resolveStyle(base.headerButton, {
    color: '#ffffff'
  }),

  menuItem: {
    color: '#333333',
    backgroundColor: '#ffffff'
  },

  menuItemActive: {
    color: '#F26B63',
    backgroundColor: 'rgba(27, 31, 35, 0.05)'
  },

  menuItemLabel: {
    fontFamily: 'Avenir-Light',
    fontSize: 16,
    fontWeight: '400'
  },

  menuItemLabelIcon: {
    fontSize: 28
  },

  bottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },

  button: {
    paddingVertical: 10,
    overflow: 'hidden',
    height: 36,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#ffffff',
    borderColor: '#666666',
    borderWidth: 1
  },

  buttonActive: {
    backgroundColor: '#ffffff',
    borderColor: '#c5c4c4'
  },

  buttonActiveFocus: {
    backgroundColor: '#cccccc'
  },

  buttonActiveLabel: {
    color: '#333333'
  },

  buttonFocus: {
    backgroundColor: '#efefef'
  },

  buttonLabel: {
    fontFamily: 'Avenir-Light',
    fontWeight: '400',
    fontSize: 12,
    color: '#222222',
    textAlign: 'center'
  },

  buttonDefault: {
    backgroundColor: '#F26B63',
    borderColor: '#de615a'
  },

  buttonDefaultFocus: {
    backgroundColor: '#de615a'
  },

  buttonDefaultLabel: {
    color: '#ffffff'
  },

  buttonGreen: {
    backgroundColor: colors.green,
    borderColor: colors.greenBorder
  },

  buttonGreenFocus: {
    backgroundColor: colors.greenBorder
  },

  buttonGreenLabel: {
    color: '#ffffff'
  },

  buttonBrilliantGreen: {
    backgroundColor: colors.brilliantGreen,
    borderColor: colors.brilliantGreenBorder
  },

  buttonBrilliantGreenFocus: {
    backgroundColor: colors.brilliantGreenBorder
  },

  buttonBrilliantGreenLabel: {
    color: '#ffffff'
  },

  buttonYellow: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellowBorder
  },

  buttonYellowFocus: {
    backgroundColor: colors.yellowBorder
  },

  buttonYellowLabel: {
    color: '#ffffff'
  },

  buttonGray: {
    backgroundColor: colors.gray,
    borderColor: colors.grayBorder
  },

  buttonGrayFocus: {
    backgroundColor: colors.grayFocus
  },

  buttonGrayLabel: {
    color: '#333333'
  },

  buttonOrange: {
    backgroundColor: colors.orange,
    borderColor: colors.orangeBorder
  },

  buttonOrangeFocus: {
    backgroundColor: colors.orangeBorder
  },

  buttonOrangeLabel: {
    color: '#ffffff'
  },

  buttonRed: {
    backgroundColor: colors.red,
    borderColor: colors.redBorder
  },

  buttonRedFocus: {
    backgroundColor: colors.redBorder
  },

  buttonRedLabel: {
    color: '#ffffff'
  },

  textMedium: {
    fontSize: 18,
    fontFamily: 'Avenir-Light'
  },

  textCenter: {
    textAlign: 'center'
  }
};
