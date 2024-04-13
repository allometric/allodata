// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
  const defined_params = Object.keys(query)
  console.log(query)
  
  const descriptor_params = ['country', 'region']
  
  let docs;
  
  let find_obj = {}

  for(let param of defined_params) {
    
    //if(!Array.isArray(query[param])) {
    //  query[param] = [query[param]]
    //}
    
    if(query[param].includes(",")) {
      query[param] = query[param].split(",")
    } else {
      query[param] = [query[param]]
    }
    
    if(descriptor_params.includes(param)) {
      var descriptor_key = `descriptors.${param}` 
      var descriptor_value = {"$in": query[param]}
      find_obj[descriptor_key] = descriptor_value
    } else {
      find_obj[param] = {"$in": query[param]}
    }
  }
  
  console.log(JSON.stringify(find_obj, null, 4))
  
  const queried_documents = context.services
      .get("mongodb-atlas")
      .db("allodata")
      .collection("models")
      .find(find_obj)
  
  return queried_documents
};
