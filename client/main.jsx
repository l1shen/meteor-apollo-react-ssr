import React from "react";
import App from "../imports/both/App";
import {onPageLoad} from "meteor/server-render";
import {hydrate} from "react-dom";
import client from "../imports/both/client";

onPageLoad(async (sink) => {
        hydrate(<App client={client}/>, document.getElementById("app"))
    }
);
