# Gatsby Pagination Plugin
Just plug and play.

Check an example of how I am using it on my [personal website](https://github.com/kbariotis/kostasbariotis.com).

## Installation

`npm i --save gatsby-plugin-paginate`

## Configuration

### Plugin
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
            template: `${__dirname}/src/templates/page.js`,
            serialize: (results) => results.data.allMarkdownRemark.edges,
            query: `{
              allMarkdownRemark {
                edges {
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

Configuration Options:

| Name  | Purpose |
| ------------- | ------------- |
| path  | The prefix for each page. E.g.: `/path` will become `/path/1`, `/path/2`, etc..  |
| template  | Path to the template to be used for each page  |
| query  | The GraphQL query to fetch the data to paginate  |
| serialize  | If the GraphQL query doesn't return a list, convert it here  |
| pageSize  | The number of items per page  |

### Template
The template component will receive a `pageContext` (`pathContext` if you are in Gatsby v1) with the following properties:


| Name  | Purpose |
| ------------- | ------------- |
| posts  | The collection of items for that page  |
| page  | The current page number  |
| pagesSum  | Total pages number  |
| prevPath  | The path to the previous page  |
| nextPath  | The path to the next page |


## Contribute
Please open an issue with your specific use case or bug or help me resolve other's issues. :)
