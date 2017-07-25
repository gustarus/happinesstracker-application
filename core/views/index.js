'use strict';

// bricks can implement large functional like whole screen
import TrendsBrick from './bricks/trends';
import RecordCausesBrick from './bricks/record-causes';
import RecordParamBrick from './bricks/record-param';

// ui element only can present data
import Button from './ui/button';
import ButtonGroup from './ui/button-group';
import Header from './ui/header';
import NavigationButton from './ui/navigation-button';
import Tumbler from './ui/tumbler';

export {
  TrendsBrick, RecordCausesBrick, RecordParamBrick,
  Button, ButtonGroup, Header, NavigationButton, Tumbler
};
