const path = require('path');

exports.createPages = async ({ actions, graphql }, options) => {
  const { createPage } = actions;

  const promises = options.sources.map(async (option) => {
    const results = await graphql(option.query)
    if (results.errors) {
      return Promise.reject(results.errors);
    }

    Object.keys(results).map(prop => {
      let feed = results[prop];
      if (option.serialize && option.serialize instanceof Function) {
        feed = option.serialize.call(null, results);
      }
      createPagination(
        createPage,
        feed,
        option.path,
        option.pageSize,
        option.template
      );
    })
  })

  await Promise.all(promises)

}

/**
 * Create pagination for posts
 */
function createPagination(createPage, edges, pathPrefix, size, template) {
  const pageTemplate = path.resolve(template);

  const pageSize = size || 5;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({ node }) => node),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}
