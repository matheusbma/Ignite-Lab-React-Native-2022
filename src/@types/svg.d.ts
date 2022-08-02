declare module "*.svg" {
  import React = require('react');
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}