const path = require('path');

async function createPages({ actions, graphql }, options) {
  const { createPage } = actions;

  const promises = options.sources
    .map((source) => validateSource(source))
    .map((source) => preparePage(graphql, createPage, source));

  await Promise.all(promises)

}

function validateSource(source) {
  if (!source.path) {
    source.path = '/'
  }

  if (source.template) {
    source.template = path.resolve(source.template);
  } else {
    throw new Error('`template` option is required');
  }

  if (source.pageSize) {
    source.pageSize = parseInt(source.pageSize);
  } else {
    source.pageSize = 5;
  }

  if (!source.serialize || !source.serialize instanceof Function) {
    throw new Error('`serialize` method must be a function and return an array');
  }

  return source;
}

async function preparePage(graphql, createPage, source) {
  const results = await graphql(source.query)

  if (results.errors) {
    throw new Error(results.errors);
  }

  Object.keys(results).map(prop => {
    const feed = source.serialize.call(null, results[prop]);

    createPagination(
      createPage,
      feed,
      source.path,
      source.pageSize,
      source.template
    );
  })
}

function createPagination(createPage, edges, pathPrefix, pageSize, pageTemplate) {

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

module.exports = { createPages };
