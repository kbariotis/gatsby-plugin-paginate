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
```
