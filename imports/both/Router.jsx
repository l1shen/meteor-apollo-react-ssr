import {Meteor} from "meteor/meteor";
import {StaticRouter, BrowserRouter} from 'react-router-dom';

export default Meteor.isServer ? StaticRouter : BrowserRouter;
