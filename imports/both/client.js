import {Meteor} from "meteor/meteor";
import {ApolloClient, InMemoryCache, HttpLink, createHttpLink} from "@apollo/client";
import fetch from "cross-fetch";
import {Accounts} from "meteor/accounts-base";
import {onPageLoad} from "meteor/server-render";

const cache = Meteor.isClient
    ? new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache();

let param = 'abc';
onPageLoad(sink => {
    console.log('onPageLoad: ', sink.request?.headers?.host);
    param = sink.request?.headers?.host;
});

// http
const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('/graphql'),
    headers: {
        authorization: Meteor.isClient ? Accounts._storedLoginToken() : '',
        clientHostname: Meteor.isServer ? param : window.location.hostname
    },
    credentials: 'same-origin',
    fetch,
})

const client = new ApolloClient({
    ssrMode: Meteor.isServer,
    link: httpLink,
    cache,
    ssrForceFetchDelay: 100,
});

export default client
