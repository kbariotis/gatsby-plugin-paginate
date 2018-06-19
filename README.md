# Gatsby Pagination Plugin
Just plug and play

## Installation

## Configuration

In your `gatsby-config.js`:

```Javascript
module.exports = {
  plugins: [
    ...
    {
      resolve: `gatsby-plugin-paginate`,
      options: {
        sources: [
          {
            path: `/page`,
            pageSize: 5,
            serialize: (results) => results.data.allMarkdownRemark.edges,
            query: `{
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
                filter: { frontmatter: { draft: { ne: true } } }
              ) {
                edges {
                  next {
                    frontmatter {
                      path
                    }
                  }
                  node {
                    excerpt(pruneLength: 250)
                    html
                    id
                    timeToRead
                    frontmatter {
                      date
                      path
                      tags
                      title
                      draft
                    }
                  }
                }
              }
            }`
          }
        ]
      }
    }
    ...
  ]
}

Configuration Options:

| Name  | Purpose |
| ------------- | ------------- |
| path  | The prefix for each page. E.g.: `/path` will become `/path/1`, `/path/2`, etc..  |
| query  | The GraphQL query to fetch the data to paginate  |
| serialize  | If the GraphQL query doesn't return a list, convert it here  |
| pageSize  | The number of items per page  |

```
