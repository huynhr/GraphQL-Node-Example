const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      const updateLink = links[linkIndex];
      if (args.url) {
        updateLink.url = args.url;
      }
      if (args.description) {
        updateLink.description = args.description;
      }
      return updateLink;
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      const deletedLink = links.splice(linkIndex, 1);
      return deletedLink[0];
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));