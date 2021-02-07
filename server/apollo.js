import {ApolloServer} from "apollo-server-express";
import {WebApp} from "meteor/webapp";
import {getUser} from "meteor/apollo";
import {LinksCollection} from "/imports/api/links";
import typeDefs from "/imports/apollo/schema.graphql";

const resolvers = {
    Query: {
        getLink: (obj, {id}) => {
            return LinksCollection.findOne(id);
        },
        getLinks: () => {
            return LinksCollection.find().fetch();
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        console.log(req.headers);
        return {
            user: await getUser(req.headers.authorization),
        }
    },
});

server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
});
