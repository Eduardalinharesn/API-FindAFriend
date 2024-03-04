//?search=Diego

export function extractQueryParams(query: any) {
  return query
    .substr(1)
    .split('&')
    .reduce((queryParams: any, param: any) => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

      const [key, value] = param.split('=');

      //console.log(queryParams);

      queryParams[key] = value;

      return queryParams;
    }, {});
}
