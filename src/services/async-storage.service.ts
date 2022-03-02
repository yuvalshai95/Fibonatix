
export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  saveToStorage,
  loadFromStorage,
};

function query(entityType:string, delay = 1) {
  var entities = localStorage.getItem(entityType)
  entities = entities ? JSON.parse(entities) : null
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entities);
    }, delay);
  });
}

 function get(entityType:string, entityId:string){
  return query(entityType).then((entities:any) => entities.find((entity:any) => entity.id === entityId));
}

function post(entityType:string, newEntity:any) {
  newEntity.id = _makeId();
  return query(entityType).then((entities:any) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType:string, updatedEntity:any) {
  return query(entityType).then((entities:any) => {
    const idx = entities.findIndex((entity:any) => entity.id === updatedEntity.id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType:string, entityId:string) {
  return query(entityType).then((entities:any) => {
    const idx = entities.findIndex((entity:any) => entity.id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType:string, entities:any) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key:string, val:any) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key:string) {
  var val = localStorage.getItem(key);
  return (val) ? JSON.parse(val) : null;
}
